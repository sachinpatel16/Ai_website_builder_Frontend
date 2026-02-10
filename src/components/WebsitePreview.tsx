import { useEffect, useRef } from 'react';
import { Website } from '../lib/supabase';

interface WebsitePreviewProps {
  website: Website;
}

export function WebsitePreview({ website }: WebsitePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument;
      if (iframeDoc) {
        const fullHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { margin: 0; padding: 0; }
                ${website.css_content}
              </style>
            </head>
            <body>
              ${website.html_content}
            </body>
          </html>
        `;
        iframeDoc.open();
        iframeDoc.write(fullHtml);
        iframeDoc.close();
      }
    }
  }, [website]);

  return (
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title={website.title}
        sandbox="allow-same-origin"
      />
    </div>
  );
}
