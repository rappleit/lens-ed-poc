import React, { useEffect, useRef } from "react";
import { getFactsheetsByIds } from "../core/domain/contentService";
import ReactMarkdown from "react-markdown";
import TTSButton from "./TTSButton";

const Factsheet = ({ factsheets, lensIds = [] }) => {
  const factsheetData = getFactsheetsByIds(factsheets, lensIds);

  if (!factsheetData || factsheetData.length === 0) {
    return (
      <div className="bg-transparent">
        <div className="p-0">
          <div className="mb-3">
            <p className="m-0 text-base leading-relaxed text-gray-600">
              No factsheets available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent">
      <div className="p-0">
        {factsheetData.map((factsheet) => (
          <div key={factsheet.id} className="mb-6 last:mb-0">
            <div className="flex items-center pb-3 border-b-2 border-gray-200 mb-3">
              <h3 className="m-0 text-xl font-semibold text-gray-800 mr-4">
                {factsheet.title}
              </h3>
              <TTSButton
                text={factsheet.content.map(contentBlock => {
                  if (contentBlock.type === 'text' || contentBlock.type === 'markdown') {
                    return contentBlock.data;
                  }
                  return '';
                }).join(' ')}
              />
            </div>
            {factsheet.content.map((contentBlock) => (
              <div key={contentBlock.id} className="mb-3 last:mb-0">
                {contentBlock.type === "text" && (
                  <p className="m-0 text-base leading-relaxed text-gray-600">
                    {contentBlock.data}
                  </p>
                )}
                {contentBlock.type === "markdown" && (
                  <div className="prose max-w-none">
                    <ReactMarkdown>{contentBlock.data}</ReactMarkdown>
                  </div>
                )}
                {contentBlock.type === "image" && (
                  <div className="my-4">
                    <img
                      src={contentBlock.data.url}
                      alt={contentBlock.data.alt}
                      className="max-w-[50%] h-auto rounded"
                    />
                    {contentBlock.data.caption && (
                      <p className="text-sm text-gray-500 mt-2 italic">
                        {contentBlock.data.caption}
                      </p>
                    )}
                  </div>
                )}
                {contentBlock.type === "instagram" && (
                  <InstagramEmbed url={contentBlock.data.url} />
                )}
                {contentBlock.type === "video" && (
                  <div className="my-4">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        {contentBlock.data.title}
                      </h4>
                      <div
                        className="relative w-full"
                        style={{ paddingBottom: "56.25%" }}
                      >
                        <iframe
                          className="absolute top-0 left-0 w-full h-full rounded"
                          src={contentBlock.data.url.replace(
                            "watch?v=",
                            "embed/"
                          )}
                          title={contentBlock.data.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Factsheet;

// Lightweight Instagram embed that shows caption, no comment box, no background
function InstagramEmbed({ url }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Ensure script is loaded once
    const ensureScript = () =>
      new Promise((resolve) => {
        if (window.instgrm && window.instgrm.Embeds) {
          resolve();
          return;
        }
        let script = document.getElementById("ig-embed-script");
        if (!script) {
          script = document.createElement("script");
          script.id = "ig-embed-script";
          script.src = "https://www.instagram.com/embed.js";
          script.async = true;
          script.onload = () => resolve();
          document.body.appendChild(script);
        } else {
          script.onload = () => resolve();
        }
      });

    const renderEmbed = async () => {
      if (!containerRef.current) return;
      // Clear previous content (if any re-renders)
      containerRef.current.innerHTML = "";
      const blockquote = document.createElement("blockquote");
      blockquote.className = "instagram-media";
      blockquote.setAttribute("data-instgrm-permalink", url);
      blockquote.setAttribute("data-instgrm-captioned", "");
      blockquote.style.margin = "0";
      blockquote.style.maxWidth = "100%";
      containerRef.current.appendChild(blockquote);

      await ensureScript();
      if (window.instgrm && window.instgrm.Embeds) {
        try {
          window.instgrm.Embeds.process();
        } catch (_) {}
      }
    };

    renderEmbed();
  }, [url]);

  return (
    <div className="my-4">
      <div className="max-w-[66%]" ref={containerRef} />
    </div>
  );
}
