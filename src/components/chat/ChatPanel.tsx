import { useRef, useEffect, useState } from 'react';
import { ChatMessage, MessageRole } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Bot, RefreshCcw, FileText, X } from 'lucide-react';

export interface Message {
    id: string;
    role: MessageRole;
    content: string;
    businessPlan?: string;
    status?: 'pending' | 'success' | 'error';
    timestamp: Date;
}

interface ChatPanelProps {
    messages: Message[];
    onSendMessage: (content: string) => void;
    onReset: () => void;
    isGenerating: boolean;
    businessPlan?: string | null;
    placeholder?: string;
}

export function ChatPanel({
    messages,
    onSendMessage,
    onReset,
    isGenerating,
    businessPlan,
    placeholder
}: ChatPanelProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showPlanModal, setShowPlanModal] = useState(false);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-inner transition-colors duration-200">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">AI Assistant</h2>
                        <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${isGenerating ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`} />
                            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-tight">
                                {isGenerating ? 'Generating...' : 'Online'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {businessPlan && (
                        <button
                            onClick={() => setShowPlanModal(true)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-all text-xs font-bold uppercase tracking-wider"
                            title="View Business Plan"
                        >
                            <FileText size={16} />
                            <span>Plan</span>
                        </button>
                    )}

                    <button
                        onClick={onReset}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                        title="Reset conversation"
                    >
                        <RefreshCcw size={18} />
                    </button>
                </div>
            </div>

            {/* Plan Modal */}
            {showPlanModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <FileText size={20} />
                                <h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight text-sm">Targeted Business Plan</h3>
                            </div>
                            <button
                                onClick={() => setShowPlanModal(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            <div className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 border-dashed">
                                {businessPlan}
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                            <button
                                onClick={() => setShowPlanModal(false)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 scroll-smooth"
            >
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center px-8">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 animate-bounce-slow">
                            <Bot size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">How can I help you today?</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
                            Describe the website you want to create, and I'll build it for you in real-time.
                        </p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <ChatMessage
                            key={msg.id}
                            role={msg.role}
                            content={msg.content}
                            status={msg.status}
                            timestamp={msg.timestamp}
                        />
                    ))
                )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <ChatInput
                    onSend={onSendMessage}
                    disabled={isGenerating}
                    placeholder={placeholder}
                />
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-3 text-center font-medium">
                    Website Builder AI can make mistakes. Check important info.
                </p>
            </div>

            <style>{`
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
}
