import React from 'react';
import SubtopicCard from './SubtopicCard';
import { getSubtopicsByIds } from '../core/domain/contentService';
import { HiFolderOpen } from 'react-icons/hi2';

const SubtopicsSection = ({ subtopics, onNavigate }) => {
  const subtopicData = getSubtopicsByIds(subtopics);

  const handleSubtopicClick = (subtopicId) => {
    if (onNavigate) {
      onNavigate(subtopicId);
    }
  };

  if (!subtopicData || subtopicData.length === 0) {
    return (
      <div className="bg-transparent">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-xl"><HiFolderOpen /></div>
          <h2 className="m-0 text-xl font-semibold text-gray-600">Subtopics</h2>
        </div>
        <div className="p-0 grid grid-cols-1 gap-5 auto-fit-[280px]">
          <div className="col-span-full text-center py-10 text-gray-500">
            <p className="m-0 text-lg">No subtopics available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-xl"><HiFolderOpen /></div>
        <h2 className="m-0 text-xl font-semibold text-gray-600">Subtopics</h2>
      </div>
      
      <div className="p-0 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-5 auto-fit-[280px]">
        {subtopicData.map((subtopic) => (
          <SubtopicCard
            key={subtopic.id}
            subtopic={{
              ...subtopic,
              description: subtopic.summary || 'Click to explore this subtopic'
            }}
            onClick={handleSubtopicClick}
          />
        ))}
      </div>
    </div>
  );
};

export default SubtopicsSection;
