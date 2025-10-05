import { topics, subtopics, factsheets, questions, lenses, combinedLenses } from './collection';
import { applyLenses } from './lensEngine';

// Normalize any user-provided content key (URL param, search input) to canonical id
function normalizeContentId(input) {
  if (typeof input !== 'string') return input;
  try {
    return decodeURIComponent(input).trim().toLowerCase().replace(/\s+/g, '_');
  } catch (_) {
    return input.trim().toLowerCase().replace(/\s+/g, '_');
  }
}

// Get a topic by ID and apply selected lenses
export function getTopic(topicId, lensIds = []) {
  const id = normalizeContentId(topicId);
  const topic = topics.find(t => t.id === id);
  if (!topic) return null;

  const activeLenses = lenses.filter(l => lensIds.includes(l.id));
  return applyLenses({ ...topic }, activeLenses);
}

// Get a subtopic by ID and apply selected lenses
export function getSubtopic(subtopicId, lensIds = []) {
  const id = normalizeContentId(subtopicId);
  const subtopic = subtopics.find(s => s.id === id);
  if (!subtopic) return null;

  const activeLenses = lenses.filter(l => lensIds.includes(l.id));
  return { ...applyLenses({ ...subtopic }, activeLenses), type: 'subtopic' };
}

// Get content (topic or subtopic) by ID
export function getContent(contentId, lensIds = []) {
  const id = normalizeContentId(contentId);
  // Try to find as topic first
  let content = topics.find(t => t.id === id);
  if (content) {
    const activeLenses = lenses.filter(l => lensIds.includes(l.id));
    return { ...applyLenses({ ...content }, activeLenses), type: 'topic' };
  }
  
  // Try to find as subtopic
  content = subtopics.find(s => s.id === id);
  if (content) {
    const activeLenses = lenses.filter(l => lensIds.includes(l.id));
    return { ...applyLenses({ ...content }, activeLenses), type: 'subtopic' };
  }
  
  return null;
}

// Get all available lenses
export function getAllLenses() {
  return lenses.map(lens => ({
    ...lens,
    title: lens.name,
    description: getLensDescription(lens),
    lensType: lens.type || 'perspective'
  }));
}

// Get lenses that have rules for the current content id
export function getLensesForContent(contentId) {
  return lenses
    .filter(lens => {
      // Exclude combination lenses from the available lenses list
      if (lens.type === 'combination' || lens.requiresSequence) {
        return false;
      }
      
      // Must have rules for the current content id
      if (!lens.rules || !lens.rules[contentId]) {
        return false;
      }

      return true;
    })
    .map(lens => {
      // Check if the lens has empty rules for this content
      const contentRules = lens.rules[contentId];
      const isComingSoon = contentRules && 
        Object.keys(contentRules).length === 0 && 
        contentRules.constructor === Object;
      
      return {
        ...lens,
        title: lens.name,
        description: getLensDescription(lens),
        lensType: lens.type || 'perspective',
        isComingSoon
      };
    });
}

// Helpers for lens presentation
function getLensDescription(lens) {
  if (lens && lens.description) return lens.description;
  return `Explore through the ${lens.name} perspective.`;
}

// Get subtopic details by IDs
export function getSubtopicsByIds(subtopicIds) {
  return subtopicIds
    .map(item => {
      const subtopic = subtopics.find(s => s.id === (typeof item === 'string' ? item : item.id));
      return subtopic ? {
        ...subtopic,
        order: typeof item === 'object' ? item.order : 0
      } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
}

// Get factsheet details by IDs
export function getFactsheetsByIds(factsheetIds) {
  return factsheetIds
    .map(item => {
      const factsheet = factsheets.find(f => f.id === (typeof item === 'string' ? item : item.id));
      return factsheet ? {
        ...factsheet,
        order: typeof item === 'object' ? item.order : 0
      } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
}

// Get question details by IDs  
export function getQuestionsByIds(questionIds) {
  return questionIds
    .map(item => {
      const question = questions.find(q => q.id === (typeof item === 'string' ? item : item.id));
      return question ? {
        ...question,
        order: typeof item === 'object' ? item.order : 0
      } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
}
