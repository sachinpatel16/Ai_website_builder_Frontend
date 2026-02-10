import { Bot, User, Loader2, CheckCircle2, AlertCircle, Info, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export type MessageRole = 'human' | 'ai' | 'system';

export interface ChatMessageProps {
    role: MessageRole;
    content: string;
    businessPlan?: string;
    status?: 'pending' | 'success' | 'error';
    timestamp?: Date;
}

export function ChatMessage({ role, content, businessPlan, status, timestamp = new Date() }: ChatMessageProps) {
    const isAI = role === 'ai';
    const isSystem = role === 'system';
    const [showPlan, setShowPlan] = useState(false);

    if (isSystem) {
        return (
            <div className="flex justify-center my-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 transition-colors">
                    {status === 'pending' && <Loader2 className="w-3 h-3 animate-spin text-blue-600 dark:text-blue-400" />}
                    {status === 'success' && <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-500" />}
                    {status === 'error' && <AlertCircle className="w-3 h-3 text-red-600 dark:text-red-500" />}
                    {!status && <Info className="w-3 h-3 text-gray-500 dark:text-gray-400" />}
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-tight">
                        {content}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex w-full mb-6 gap-3 ${isAI ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-3 duration-500`}>
            {isAI && (
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm border border-blue-700">
                    <Bot size={18} />
                </div>
            )}

            <div className={`flex flex-col max-w-[85%] ${isAI ? 'items-start' : 'items-end'}`}>
                <div
                    className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed transition-colors ${isAI
                        ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
                        : 'bg-blue-600 text-white rounded-tr-none'
                        }`}
                >
                    <div className="whitespace-pre-wrap">{content}</div>

                    {isAI && businessPlan && (
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                            <button
                                onClick={() => setShowPlan(!showPlan)}
                                className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors uppercase tracking-wider"
                            >
                                <FileText size={14} />
                                {showPlan ? 'Hide Draft Plan' : 'View Draft Plan'}
                                {showPlan ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>

                            {showPlan && (
                                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="font-bold text-[10px] text-gray-400 uppercase mb-1 tracking-widest">Current Business Understanding</div>
                                    <div className="whitespace-pre-wrap italic line-height-relaxed">{businessPlan}</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 uppercase font-medium tracking-wider px-1">
                    {timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>

            {!isAI && (
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 shadow-sm border border-gray-300 dark:border-gray-600 transition-colors">
                    <User size={18} />
                </div>
            )}
        </div>
    );
}
