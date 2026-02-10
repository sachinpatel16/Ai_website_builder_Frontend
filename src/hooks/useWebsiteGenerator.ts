import { useState, useCallback } from 'react';
import { generateWebsiteStream, GenerateWebsiteRequest, ProgressEvent, ConversationMessage } from '../lib/api';

// ===========================
// TypeScript Interfaces
// ===========================

export interface GenerationState {
    // Generation status
    isGenerating: boolean;
    progress: number;
    currentStep: string;
    message: string;
    error: string | null;

    // Conversational AI state
    needsInput: boolean;
    questions: string[];
    businessPlan: string | null;
    conversationHistory: ConversationMessage[];
    threadId: string | null;

    // Result
    result: ProgressEvent['data'] | null;
}

// ===========================
// Custom Hook
// ===========================

/**
 * Custom React hook for managing website generation state
 * 
 * Handles:
 * - SSE stream consumption
 * - Conversation state management
 * - Progress tracking
 * - Error handling
 * 
 * @example
 * ```typescript
 * const { state, generate, reset } = useWebsiteGenerator();
 * 
 * // Start generation
 * await generate("Create a portfolio website");
 * 
 * // If AI asks questions (state.needsInput === true)
 * await generate("", "My answers to the questions");
 * 
 * // Reset state
 * reset();
 * ```
 */
export function useWebsiteGenerator() {
    const [state, setState] = useState<GenerationState>({
        isGenerating: false,
        progress: 0,
        currentStep: '',
        message: '',
        error: null,
        needsInput: false,
        questions: [],
        businessPlan: null,
        conversationHistory: [],
        threadId: null,
        result: null,
    });

    /**
     * Start or continue website generation
     * 
     * @param description - Initial website description (for first request)
     * @param answers - User's answers to AI questions (for follow-up requests)
     */
    const generate = useCallback(async (description: string, answers?: string) => {
        // Reset error state and start generation
        setState(prev => ({
            ...prev,
            isGenerating: true,
            progress: 0,
            error: null,
            needsInput: false,
            questions: [],
        }));

        try {
            // Build conversation history
            let messages = [...state.conversationHistory];

            // If this is a follow-up with answers, add to history
            if (answers && state.threadId) {
                messages.push({
                    role: 'human',
                    content: answers
                });
            } else if (!state.threadId) {
                // Initial request - add user's description
                messages.push({
                    role: 'human',
                    content: description
                });
            }

            // Prepare API request
            const request: GenerateWebsiteRequest = {
                description: answers || description,
                thread_id: state.threadId || undefined,
                messages: messages.length > 0 ? messages : undefined,
            };

            console.log('🚀 Starting generation:', request);

            // Stream SSE events
            for await (const event of generateWebsiteStream(request)) {
                console.log('📨 SSE Event:', event);

                // ===============================
                // Handle: AI needs more information
                // ===============================
                if (event.status === 'awaiting_input' && !event.ready) {
                    console.log('❓ AI is asking questions');

                    setState(prev => ({
                        ...prev,
                        isGenerating: false,
                        needsInput: true,
                        questions: event.questions || [],
                        businessPlan: event.business_plan || prev.businessPlan,
                        threadId: event.thread_id || prev.threadId,
                        conversationHistory: event.messages?.map(m => ({
                            role: (m.role === 'ai' || m.role === 'assistant') ? 'ai' : 'human',
                            content: m.content
                        })) || messages,
                        message: event.message,
                        progress: event.progress || 5,
                    }));
                    return;
                }

                // ===============================
                // Handle: Generation complete
                // ===============================
                if (event.status === 'completed' && event.data) {
                    console.log('✅ Generation complete!', event.data);

                    setState(prev => ({
                        ...prev,
                        isGenerating: false,
                        progress: 100,
                        currentStep: 'complete',
                        message: event.message,
                        result: event.data,
                        threadId: event.thread_id || prev.threadId,
                    }));
                    return;
                }

                // ===============================
                // Handle: Progress update
                // ===============================
                setState(prev => ({
                    ...prev,
                    progress: event.progress || prev.progress,
                    currentStep: event.step || prev.currentStep,
                    message: event.message || prev.message,
                    error: event.error || null,
                }));

                // ===============================
                // Handle: Error/failure
                // ===============================
                if (event.status === 'failed') {
                    console.error('❌ Generation failed:', event.error);

                    setState(prev => ({
                        ...prev,
                        isGenerating: false,
                        error: event.error || 'Generation failed',
                    }));
                    return;
                }
            }

            console.log('🏁 SSE stream ended');

        } catch (error) {
            console.error('💥 Generation error:', error);

            setState(prev => ({
                ...prev,
                isGenerating: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            }));
        }
    }, [state.conversationHistory, state.threadId]);

    /**
     * Reset the generator state to initial values
     * Use this to start a fresh generation
     */
    const reset = useCallback(() => {
        console.log('🔄 Resetting generator state');

        setState({
            isGenerating: false,
            progress: 0,
            currentStep: '',
            message: '',
            error: null,
            needsInput: false,
            questions: [],
            businessPlan: null,
            conversationHistory: [],
            threadId: null,
            result: null,
        });
    }, []);

    return {
        state,
        generate,
        reset,
    };
}
