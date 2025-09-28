import { topics, subtopics, factsheets, questions, lenses, combinedLenses } from './collection';
import { applyLenses } from './lensEngine';

// Get a topic by ID and apply selected lenses
export function getTopic(topicId, lensIds = []) {
  const topic = topics.find(t => t.id === topicId);
  if (!topic) return null;

  const activeLenses = lenses.filter(l => lensIds.includes(l.id));
  return applyLenses({ ...topic }, activeLenses);
}

// Get a subtopic by ID and apply selected lenses
export function getSubtopic(subtopicId, lensIds = []) {
  const subtopic = subtopics.find(s => s.id === subtopicId);
  if (!subtopic) return null;

  const activeLenses = lenses.filter(l => lensIds.includes(l.id));
  return { ...applyLenses({ ...subtopic }, activeLenses), type: 'subtopic' };
}

// Get content (topic or subtopic) by ID
export function getContent(contentId, lensIds = []) {
  // Try to find as topic first
  let content = topics.find(t => t.id === contentId);
  if (content) {
    const activeLenses = lenses.filter(l => lensIds.includes(l.id));
    return { ...applyLenses({ ...content }, activeLenses), type: 'topic' };
  }
  
  // Try to find as subtopic
  content = subtopics.find(s => s.id === contentId);
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
    title: formatLensTitle(lens.id),
    description: getDescriptionForLens(lens.id),
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
    .map(lens => ({
      ...lens,
      title: formatLensTitle(lens.id),
      description: getDescriptionForLens(lens.id),
      lensType: lens.type || 'perspective'
    }));
}

// Format lens title for display
function formatLensTitle(lensId) {
  const titleMap = {
    'medical_doctor': 'Medical Doctor',
    '8_year_old': '8 Year Old',
    'chemistry': 'Chemistry',
    'engineering': 'Engineering',
    'agriculture': 'Agriculture'
  };
  return titleMap[lensId] || lensId.charAt(0).toUpperCase() + lensId.slice(1);
}

// Get description for a lens (this could be enhanced with actual descriptions from data)
function getDescriptionForLens(lensId) {
  const descriptions = {
    chemistry: 'Focus on chemical composition and reactions.',
    engineering: 'Focus on architecture, construction, and infrastructure systems.',
    agriculture: 'Focus on farming practices, crop cultivation, and livestock management.',
    medical_doctor: 'Study ants as a medical professional seeking to learn from their healthcare innovations.',
    '8_year_old': 'Discover through the eyes of a curious and excited 8-year-old child.',
    biology: 'Focus on biological systems and organisms.',
    'systems-theory': 'Focus on system-level behaviors and patterns.'
  };
  return descriptions[lensId] || `Explore through the ${lensId} perspective.`;
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
