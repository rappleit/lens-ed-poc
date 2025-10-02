import { getAllLenses } from './contentService';
import { detectLensCombination } from './lensUtils';

// Applies a single lens to a topic object
export function applyLens(topic, lens) {
    // Get the rules for this specific topic
    const topicRules = lens.rules[topic.id];
    if (!topicRules) return topic;
  
    // Apply overrides
    if (topicRules.overrides) {
      if (topicRules.overrides.summary) topic.summary = topicRules.overrides.summary;
      if (topicRules.overrides.factsheets) {
        topic.factsheets = topicRules.overrides.factsheets.map((id, index) => ({ id, order: index + 1 }));
      }
      if (topicRules.overrides.questions) {
        topic.questions = topicRules.overrides.questions.map((id, index) => ({ id, order: index + 1 }));
      }
      if (topicRules.overrides.title) topic.title = topicRules.overrides.title;
    }
  
    // Apply filtering (remove excluded subtopics and questions)
    if (topicRules.filter?.excludeSubtopics) {
      topic.subtopics = topic.subtopics.filter(
        st => !topicRules.filter.excludeSubtopics.includes(st.id)
      );
    }
    
    if (topicRules.filter?.excludeQuestions) {
      topic.questions = topic.questions.filter(
        q => !topicRules.filter.excludeQuestions.includes(q.id)
      );
    }
  
    // Apply reordering of subtopics
    if (topicRules.order?.subtopics) {
      // Replace subtopics with the ordered list from the lens
      topic.subtopics = topicRules.order.subtopics.map((id, index) => ({ 
        id, 
        order: index + 1 
      }));
    }
  
    // Apply augmentation
    if (topicRules.augment) {
      // Augment subtopics (add additional ones)
      if (topicRules.augment.subtopics) {
        const currentSubtopics = topic.subtopics || [];
        const augmentSubtopics = topicRules.augment.subtopics.map((id, index) => ({ 
          id, 
          order: currentSubtopics.length + index + 1 
        }));
        topic.subtopics = [...currentSubtopics, ...augmentSubtopics];
      }

      // Augment factsheets (add additional ones)
      if (topicRules.augment.factsheets) {
        const currentFactsheets = topic.factsheets || [];
        const augmentFactsheets = topicRules.augment.factsheets.map((id, index) => ({ 
          id, 
          order: currentFactsheets.length + index + 1 
        }));
        topic.factsheets = [...currentFactsheets, ...augmentFactsheets];
      }

      // Augment questions (add additional ones)
      if (topicRules.augment.questions) {
        const currentQuestions = topic.questions || [];
        const augmentQuestions = topicRules.augment.questions.map((id, index) => ({ 
          id, 
          order: currentQuestions.length + index + 1 
        }));
        topic.questions = [...currentQuestions, ...augmentQuestions];
      }
    }
  
    return topic;
  }
  
  // Applies multiple lenses sequentially
  export function applyLenses(topic, lensesToApply) {
    let transformed = { ...topic };
    
    // Extract lens IDs for combination detection
    const lensIds = lensesToApply.map(lens => lens.id);
    
    // Check for special lens combinations first
    const combinedLens = detectLensCombination(lensIds, topic.id);
    
    if (combinedLens) {
      // Apply the combined lens instead of individual ones
      transformed = applyLens(transformed, combinedLens);
    } else {
      // Apply lenses sequentially as before
      lensesToApply.forEach(lens => {
        transformed = applyLens(transformed, lens);
      });
    }
    
    return transformed;
  }

  