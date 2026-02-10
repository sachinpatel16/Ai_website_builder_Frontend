import { ThemeToggle } from '../components/ThemeToggle';
import React from 'react';
import { Globe, Settings, Plus, Menu } from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
    onNewChat?: () => void;
    projectName?: string;
}

export function DashboardLayout({ children, onNewChat, projectName = "Untitled Project" }: DashboardLayoutProps) {
    return (
        <div className="flex flex-col h-screen w-full bg-white dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-200">
            {/* Top Navigation Bar */}
            <header className="h-14 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 bg-white dark:bg-gray-900 z-30 shadow-sm transition-colors duration-200">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                            <Globe size={18} className="sm:size-20" />
                        </div>
                        <span className="font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden xs:block">
                            WebAI
                        </span>
                    </div>

                    <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block" />

                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300 truncate max-w-[120px] sm:max-w-xs">{projectName}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        onClick={onNewChat}
                        className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg text-sm font-bold"
                    >
                        <Plus size={16} />
                        <span className="hidden sm:inline">New Website</span>
                    </button>

                    <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1" />

                    <ThemeToggle />

                    <button className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
                        <Settings size={20} />
                    </button>

                    <button className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all sm:hidden">
                        <Menu size={20} />
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex overflow-hidden relative">
                {children}
            </main>
        </div>
    );
}
