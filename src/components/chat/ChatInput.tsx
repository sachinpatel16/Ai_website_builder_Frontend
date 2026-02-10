import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
}

export function ChatInput({ onSend, disabled, placeholder = "Describe your website idea..." }: ChatInputProps) {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input.trim());
            setInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    return (
        <form
            onSubmit={handleSubmit}
            className="relative flex items-end gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all"
        >
            <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className="w-full max-h-32 px-3 py-2 bg-transparent border-none focus:ring-0 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none scrollbar-hide disabled:opacity-50 outline-none"
            />

            <button
                type="submit"
                disabled={!input.trim() || disabled}
                className="flex-shrink-0 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 transition-all shadow-sm"
                title="Send message"
            >
                {disabled ? (
                    <Sparkles className="w-5 h-5 animate-pulse" />
                ) : (
                    <Send className="w-5 h-5" />
                )}
            </button>
        </form>
    );
}
