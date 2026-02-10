/**
 * API Client for LangGraph Website Builder Backend
 * Handles Server-Sent Events (SSE) streaming for real-time progress updates
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// ===========================
// TypeScript Interfaces
// ===========================

export interface GenerateWebsiteRequest {
    description: string;
    template?: string;
    thread_id?: string;
    messages?: ConversationMessage[];
}

export interface ConversationMessage {
    role: 'human' | 'ai' | 'user' | 'assistant';
    content: string;
}

export interface ProgressEvent {
    step: string;
    status: string;
    progress: number;
    message: string;
    error?: string;

    // For awaiting_input status (when AI asks questions)
    ready?: boolean;
    questions?: string[];
    business_plan?: string;
    thread_id?: string;
    messages?: ConversationMessage[];

    // For completed status (when generation finishes)
    data?: {
        pages: Record<string, { html: string; css: string }>;
        image_urls: Record<string, string>;
        plan: any;
        business_plan?: string;
        folder_path: string;
        saved_files: Record<string, string>;
    };
}

// ===========================
// Main API Functions
// ===========================

/**
 * Stream website generation progress using Server-Sent Events (SSE)
 * 
 * @param request - Generation request with description and optional conversation context
 * @yields ProgressEvent - Real-time progress updates
 * 
 * @example
 * ```typescript
 * for await (const event of generateWebsiteStream({ description: "Create a portfolio" })) {
 *   if (event.status === 'awaiting_input') {
 *     // Show questions to user
 *   } else if (event.status === 'completed') {
 *     // Show results
 *   }
 * }
 * ```
 */
export async function* generateWebsiteStream(
    request: GenerateWebsiteRequest
): AsyncGenerator<ProgressEvent, void, unknown> {
    const response = await fetch(`${API_BASE_URL}/api/generate-website`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
        throw new Error('Response body is not readable');
    }

    let buffer = '';

    try {
        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            // Decode the chunk and add to buffer
            buffer += decoder.decode(value, { stream: true });

            // Split by newlines to process SSE messages
            const lines = buffer.split('\n');

            // Keep the last potentially incomplete line in the buffer
            buffer = lines.pop() || '';

            for (const line of lines) {
                // SSE format: "data: {JSON}\n"
                if (line.startsWith('data: ')) {
                    const data = line.slice(6).trim();
                    if (data) {
                        try {
                            const event: ProgressEvent = JSON.parse(data);
                            yield event;
                        } catch (e) {
                            console.error('Failed to parse SSE data:', data, e);
                        }
                    }
                }
            }
        }
    } finally {
        reader.releaseLock();
    }
}

/**
 * Get the full URL to access a generated website
 * 
 * @param folderPath - Full path to the website folder (e.g., "C:\AIML\webtemplates\website_123")
 * @returns URL to serve the website (e.g., "http://localhost:8000/api/serve-website/website_123/")
 */
export function getWebsiteUrl(folderPath: string): string {
    // Extract folder name from path
    // Handle both Windows (backslash) and Unix (forward slash) paths
    const parts = folderPath.split(/[\\/]/);
    const folderName = parts[parts.length - 1] || parts[parts.length - 2];

    return `${API_BASE_URL}/api/serve-website/${folderName}/index.html`;
}

/**
 * Health check for the backend API
 * 
 * @returns true if backend is reachable, false otherwise
 */
export async function healthCheck(): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/health`, {
            method: 'GET',
        });
        return response.ok;
    } catch (error) {
        console.error('Health check failed:', error);
        return false;
    }
}

/**
 * Fetch the list of all generated websites from the backend
 */
export async function listWebsites(): Promise<any[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/websites`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.websites || [];
    } catch (error) {
        console.error('Failed to fetch websites:', error);
        return [];
    }
}
