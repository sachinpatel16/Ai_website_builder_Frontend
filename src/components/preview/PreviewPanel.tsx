import { useState } from 'react';
import { Monitor, Smartphone, Tablet, ExternalLink, History, Code, Eye } from 'lucide-react';
import { WebsiteGallery, BackendWebsite } from '../WebsiteGallery';

interface PreviewPanelProps {
    url: string | null;
    history: BackendWebsite[];
    isLoadingHistory: boolean;
    pages: string[];
}

type TabType = 'preview' | 'history' | 'code';
type DeviceType = 'desktop' | 'tablet' | 'mobile';

export function PreviewPanel({ url, history, isLoadingHistory, pages }: PreviewPanelProps) {
    const [activeTab, setActiveTab] = useState<TabType>('preview');
    const [device, setDevice] = useState<DeviceType>('desktop');

    const deviceWidths: Record<DeviceType, string> = {
        desktop: '100%',
        tablet: '768px',
        mobile: '375px',
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-200">
            {/* Panel Header/Tabs */}
            <div className="flex items-center justify-between px-6 py-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200">
                <div className="flex gap-1">
                    {(['preview', 'history', 'code'] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 text-sm font-bold capitalize transition-all border-b-2 ${activeTab === tab
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === 'preview' && url && (
                    <div className="flex items-center gap-2">
                        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 mr-2 transition-colors">
                            {(['desktop', 'tablet', 'mobile'] as DeviceType[]).map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setDevice(d)}
                                    className={`p-1.5 rounded-md transition-all ${device === d
                                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                        : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                                        }`}
                                    title={d.charAt(0).toUpperCase() + d.slice(1)}
                                >
                                    {d === 'desktop' && <Monitor size={16} />}
                                    {d === 'tablet' && <Tablet size={16} />}
                                    {d === 'mobile' && <Smartphone size={16} />}
                                </button>
                            ))}
                        </div>

                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                        >
                            <ExternalLink size={14} />
                            Open Live
                        </a>
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-gray-100 dark:bg-gray-950 overflow-hidden relative transition-colors duration-200">
                {activeTab === 'preview' && (
                    <div className={`h-full flex flex-col items-center justify-center ${url ? 'p-0' : 'p-8'} transition-all duration-500`}>
                        {!url ? (
                            <div className="flex flex-col items-center text-center max-w-sm">
                                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex items-center justify-center mb-6 text-gray-400 dark:text-gray-600 transition-colors">
                                    <Eye size={40} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">No preview available</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Start generating a website to see a live preview appear here in real-time.
                                </p>
                            </div>
                        ) : (
                            <div
                                className="bg-white shadow-2xl overflow-hidden border border-gray-100 transition-all duration-500 ease-in-out h-full"
                                style={{ width: deviceWidths[device] }}
                            >
                                <iframe
                                    src={url}
                                    className="w-full h-full border-none"
                                    title="Website Preview"
                                />
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="h-full overflow-y-auto p-8">
                        <div className="max-w-5xl mx-auto">
                            <div className="flex items-center gap-3 mb-8">
                                <History className="text-indigo-600 dark:text-indigo-400" size={24} />
                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Recent Projects</h2>
                            </div>

                            {isLoadingHistory ? (
                                <div className="flex justify-center items-center py-24">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
                                </div>
                            ) : (
                                <WebsiteGallery websites={history} />
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'code' && (
                    <div className="h-full bg-gray-900 overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Code size={16} />
                                <span className="text-xs font-mono font-bold uppercase tracking-wider">Source Code</span>
                            </div>
                            {pages.length > 0 && (
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-gray-800 text-gray-300 text-[10px] font-bold rounded border border-gray-700 hover:bg-gray-700 transition-all">
                                        Copy HTML
                                    </button>
                                    <button className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded hover:bg-indigo-700 transition-all shadow-sm">
                                        Download ZIP
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 overflow-auto p-6 font-mono text-sm text-gray-300 leading-relaxed">
                            {!url ? (
                                <div className="h-full flex items-center justify-center text-gray-600 italic">
                                    No code generated yet...
                                </div>
                            ) : (
                                <pre className="text-xs">
                                    {`<!-- AI Generated Website Code -->\n<!DOCTYPE html>\n<html lang="en">\n<head>...\n`}
                                    {/* Real code content would be passed in or fetched */}
                                    <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700 text-gray-400">
                                        Source code view will be fully implemented in Phase 3.
                                    </div>
                                </pre>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
