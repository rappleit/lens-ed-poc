import { 
  topics, subtopics, factsheets, questions, lenses, combinedLenses, summaries,
  topics_zh, subtopics_zh, factsheets_zh, questions_zh, summaries_zh
} from './collection';
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

// Get the appropriate collections based on active lenses
function getCollections(lensIds = []) {
  // Check if Mandarin lens is active
  const hasMandarin = lensIds.includes('mandarin');
  
  if (hasMandarin) {
    return {
      topics: topics_zh,
      subtopics: subtopics_zh,
      factsheets: factsheets_zh,
      questions: questions_zh,
      lenses,
      summaries: summaries_zh,
      combinedLenses // Use original English combined lenses for now
    };
  }
  
  return {
    topics,
    subtopics,
    factsheets,
    questions,
    lenses,
    summaries,
    combinedLenses
  };
}

// Get a topic by ID and apply selected lenses
export function getTopic(topicId, lensIds = []) {
  const id = normalizeContentId(topicId);
  const collections = getCollections(lensIds);
  const topic = collections.topics.find(t => t.id === id);
  if (!topic) return null;

  const activeLenses = lenses.filter(l => lensIds.includes(l.id));
  return applyLenses({ ...topic }, activeLenses, collections.summaries);
}

// Get a subtopic by ID and apply selected lenses
export function getSubtopic(subtopicId, lensIds = []) {
  const id = normalizeContentId(subtopicId);
  const collections = getCollections(lensIds);
  const subtopic = collections.subtopics.find(s => s.id === id);
  if (!subtopic) return null;

  const activeLenses = lenses.filter(l => lensIds.includes(l.id));
  return { ...applyLenses({ ...subtopic }, activeLenses, collections.summaries), type: 'subtopic' };
}

// Get content (topic or subtopic) by ID
export function getContent(contentId, lensIds = []) {
  const id = normalizeContentId(contentId);
  const collections = getCollections(lensIds);
  
  // Try to find as topic first
  let content = collections.topics.find(t => t.id === id);
  if (content) {
    const activeLenses = lenses.filter(l => lensIds.includes(l.id));
    return { ...applyLenses({ ...content }, activeLenses, collections.summaries), type: 'topic' };
  }
  
  // Try to find as subtopic
  content = collections.subtopics.find(s => s.id === id);
  if (content) {
    const activeLenses = lenses.filter(l => lensIds.includes(l.id));
    return { ...applyLenses({ ...content }, activeLenses, collections.summaries), type: 'subtopic' };
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
      
      // Language lenses (like Mandarin) should always be available
      if (lens.type === 'language') {
        return true;
      }
      
      // Must have rules for the current content id
      if (!lens.rules || !lens.rules[contentId]) {
        return false;
      }

      return true;
    })
    .map(lens => {
      // Check if the lens has empty rules for this content
      const contentRules = lens.rules && lens.rules[contentId];
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
export function getSubtopicsByIds(subtopicIds, lensIds = []) {
  const collections = getCollections(lensIds);
  return subtopicIds
    .map(item => {
      const subtopic = collections.subtopics.find(s => s.id === (typeof item === 'string' ? item : item.id));
      return subtopic ? {
        ...subtopic,
        order: typeof item === 'object' ? item.order : 0
      } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
}

// Get factsheet details by IDs
export function getFactsheetsByIds(factsheetIds, lensIds = []) {
  const collections = getCollections(lensIds);
  return factsheetIds
    .map(item => {
      const factsheet = collections.factsheets.find(f => f.id === (typeof item === 'string' ? item : item.id));
      return factsheet ? {
        ...factsheet,
        order: typeof item === 'object' ? item.order : 0
      } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
}

// Get question details by IDs  
export function getQuestionsByIds(questionIds, lensIds = []) {
  const collections = getCollections(lensIds);
  return questionIds
    .map(item => {
      const question = collections.questions.find(q => q.id === (typeof item === 'string' ? item : item.id));
      return question ? {
        ...question,
        order: typeof item === 'object' ? item.order : 0
      } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
}
