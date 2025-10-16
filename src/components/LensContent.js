import React from "react";
import LensCard from "./LensCard";
import { detectLensCombination, getCompatibleLenses } from "../core/domain/lensUtils";

const LensContent = ({ availableLenses, activeLensIds, onLensToggle, currentContentId }) => {
  const activeCombination = detectLensCombination(activeLensIds);
  const compatibleLensIds = getCompatibleLenses(activeLensIds, currentContentId);

  return (
    <div className="space-y-3">
      {availableLenses.map((lens) => {
        const isActive = activeLensIds.includes(lens.id);
        const isDisabled = lens.isComingSoon || (compatibleLensIds !== null && !compatibleLensIds.has(lens.id));
        
        return (
          <LensCard
            key={lens.id}
            lens={{
              ...lens,
              isActive,
              isDisabled,
            }}
            onToggle={onLensToggle}
          />
        );
      })}
    </div>
  );
};

export default LensContent;
