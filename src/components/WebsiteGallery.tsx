import { Eye, Globe } from 'lucide-react';
import { getWebsiteUrl } from '../lib/api';

export interface BackendWebsite {
  folder_name: string;
  created_at: string | null;
  description: string;
  pages: string[];
}

interface WebsiteGalleryProps {
  websites: BackendWebsite[];
}

export function WebsiteGallery({ websites }: WebsiteGalleryProps) {
  if (websites.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
        <p className="text-lg">No websites generated yet.</p>
        <p className="text-sm mt-1">Describe your website above to get started!</p>
      </div>
    );
  }

  const handleView = (folderPath: string) => {
    const url = getWebsiteUrl(folderPath);
    window.open(url, '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {websites.map((website) => (
        <div
          key={website.folder_name}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all group"
        >
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Globe size={18} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 truncate flex-1">
                {website.description.length > 50
                  ? website.description.substring(0, 50) + "..."
                  : website.description}
              </h3>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 min-h-[2.5rem] mb-4">
              {website.description}
            </p>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-2.5 py-1 rounded-full border border-indigo-100 dark:border-indigo-800">
                {website.pages.length} Pages
              </span>
              {website.created_at && (
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">
                  {new Date(website.created_at).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              )}
            </div>
          </div>

          <div className="px-5 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <button
              onClick={() => handleView(website.folder_name)}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold text-sm transition-colors"
            >
              <Eye size={16} />
              View Site
            </button>
            <div className="text-[10px] font-mono text-gray-300 dark:text-gray-600">
              #{website.folder_name.split('_').pop()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
