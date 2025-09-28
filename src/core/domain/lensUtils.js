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
