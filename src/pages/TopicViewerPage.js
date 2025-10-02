import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExplorationPath from '../components/ExplorationPath';
import LensPanel from '../components/LensPanel';
import ContentArea from '../components/ContentArea';
import { getTopic, getContent, getAllLenses, getLensesForContent } from '../core/domain/contentService';

const TopicViewerPage = () => {
  const { topicName } = useParams();
  const navigate = useNavigate();
  const [activeLensIds, setActiveLensIds] = useState([]);
  const [currentContent, setCurrentContent] = useState(null);
  const [availableLenses, setAvailableLenses] = useState([]);
  const [explorationPath, setExplorationPath] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update current content and available lenses when topic name or active lenses change
  useEffect(() => {
    if (topicName) {
      // Normalize incoming route param to canonical id form
      const normalizedId = decodeURIComponent(topicName).trim().toLowerCase().replace(/\s+/g, '_');
      setLoading(true);
      setError(null);
      
      try {
        const content = getContent(normalizedId, activeLensIds);
        
        if (!content) {
          setError(`Topic "${decodeURIComponent(topicName)}" not found`);
          setCurrentContent(null);
          setAvailableLenses([]);
          setExplorationPath([]);
        } else {
          setCurrentContent(content);
          
          // Update available lenses to only those with rules for this content id
          const applicableLenses = getLensesForContent(content.id);
          setAvailableLenses(applicableLenses);
          
          // Build exploration path
          buildExplorationPath(content);
        }
      } catch (err) {
        setError('Error loading topic');
        console.error('Error loading topic:', err);
      } finally {
        setLoading(false);
      }
    }
  }, [topicName, activeLensIds]);

  const buildExplorationPath = (content) => {
    if (!content) return;
    
    const path = [];
    
    // Recursively build the full hierarchy
    const buildPathRecursively = (currentContent) => {
      if (!currentContent) return;
      
      // If this content has a parent, build the parent's path first
      if (currentContent.parentTopic) {
        const parentContent = getContent(currentContent.parentTopic);
        if (parentContent) {
          buildPathRecursively(parentContent);
        }
      }
      
      // Add current content to path
      const contentType = currentContent.type === 'topic' ? 'Root Topic' : 'Subtopic';
      path.push({
        id: currentContent.id,
        title: currentContent.title,
        type: contentType,
        isActive: false // Will be set to true for the final item
      });
    };
    
    // Build the complete path
    buildPathRecursively(content);
    
    // Mark the last item as active
    if (path.length > 0) {
      path[path.length - 1].isActive = true;
    }
    
    setExplorationPath(path);
  };

  const handleLensToggle = (lensId) => {
    setActiveLensIds(prev => {
      if (prev.includes(lensId)) {
        return prev.filter(id => id !== lensId);
      } else {
        return [...prev, lensId];
      }
    });
  };

  const handleContentNavigation = (contentId) => {
    // Navigate to the new topic
    window.location.href = `/search/${encodeURIComponent(contentId)}`;
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading topic...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Topic Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <div className="w-full h-48 md:w-80 md:min-w-80 lg:w-64 lg:min-w-64 md:h-full bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <ExplorationPath 
            explorationPath={explorationPath}
            onNavigate={handleContentNavigation}
          />
        </div>
        <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
          <button
            onClick={handleBackToHome}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-white overflow-y-auto p-5 min-h-96 md:min-h-0">
        <ContentArea 
          currentContent={currentContent}
          activeLensIds={activeLensIds}
          onNavigate={handleContentNavigation}
        />
      </div>
      
      <div className="w-full h-48 md:w-80 md:min-w-80 lg:w-64 lg:min-w-64 md:h-full bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 overflow-y-auto">
        <LensPanel 
          availableLenses={availableLenses}
          activeLensIds={activeLensIds}
          onLensToggle={handleLensToggle}
        />
      </div>
    </div>
  );
};

export default TopicViewerPage;
