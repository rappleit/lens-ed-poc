import React from "react";
import LensContent from "../../LensContent";

const RightSidebar = ({ availableLenses, activeLensIds, onLensToggle, currentContentId }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-5 border-b border-gray-200 bg-white">
        <h2 className="m-0 text-xl font-semibold text-gray-600">Apply Lens</h2>
        
        {activeLensIds.length > 0 && (
          <div className="mt-3 text-sm text-gray-500">
            <span className="font-medium">Active lenses: </span>
            <div className="mt-2 flex flex-wrap gap-1">
              {activeLensIds.map((lensId) => (
                <span
                  key={lensId}
                  className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {lensId.charAt(0).toUpperCase() + lensId.slice(1)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-5">
        <LensContent 
          availableLenses={availableLenses}
          activeLensIds={activeLensIds}
          onLensToggle={onLensToggle}
          currentContentId={currentContentId}
        />
      </div>
    </div>
  );
};

export default RightSidebar;
