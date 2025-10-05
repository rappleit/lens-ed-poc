import { combinedLenses } from './collection';

// Detects if the active lens sequence matches any special combinations
export function detectLensCombination(activeLensIds, contentId) {
  let bestMatch = null;
  let bestLength = -1;

  for (const combinationLens of combinedLenses) {
    const requiredSequence = combinationLens.requiresSequence || [];

    if (
      requiredSequence.length > 0 &&
      arraysMatchSequence(activeLensIds, requiredSequence) &&
      combinationLens.rules[contentId]
    ) {
      if (requiredSequence.length > bestLength) {
        bestMatch = combinationLens;
        bestLength = requiredSequence.length;
      }
    }
  }

  return bestMatch;
}

// Checks if the active lens IDs contain the required sequence
function arraysMatchSequence(activeIds, requiredSequence) {
  if (activeIds.length < requiredSequence.length) return false;
  
  // Check if the required sequence appears in the active lenses
  for (let i = 0; i <= activeIds.length - requiredSequence.length; i++) {
    const slice = activeIds.slice(i, i + requiredSequence.length);
    if (JSON.stringify(slice) === JSON.stringify(requiredSequence)) {
      return true;
    }
  }
  
  return false;
}

// Determines which lenses can be selected given the currently active lenses
// Returns a Set of lens IDs that are compatible with the current selection
export function getCompatibleLenses(activeLensIds, contentId) {
  if (activeLensIds.length === 0) {
    return null; 
  }

  const compatibleLensIds = new Set();

  // Already selected lenses are always compatible (so they can be unselected)
  activeLensIds.forEach(lensId => compatibleLensIds.add(lensId));

  // Check all combined lenses to see which additional lenses could be added
  for (const combinationLens of combinedLenses) {
    const requiredSequence = combinationLens.requiresSequence || [];

    // Skip if this combination doesn't apply to the current content
    if (!combinationLens.rules[contentId]) {
      continue;
    }

    // Check if the current active lenses are a subset of this combination's required sequence
    const allActiveInSequence = activeLensIds.every(lensId => 
      requiredSequence.includes(lensId)
    );

    if (allActiveInSequence && requiredSequence.length > activeLensIds.length) {
      // This combination includes all active lenses and has room for more
      // Add all lenses from this sequence as compatible
      requiredSequence.forEach(lensId => compatibleLensIds.add(lensId));
    }
  }

  return compatibleLensIds;
}
