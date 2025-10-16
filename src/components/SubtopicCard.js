import React from 'react';
import { HiArrowRight } from 'react-icons/hi2';
import { HiDocumentDuplicate } from 'react-icons/hi2';

const SubtopicCard = ({ subtopic, onClick }) => {
  const handleClick = () => {
    onClick(subtopic.id);
  };

  return (
    <div 
      className="group flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-blue-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-100" 
      onClick={handleClick}
    >
      <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl text-blue-600 text-2xl flex-shrink-0">
        <HiDocumentDuplicate />
      </div>
      
      <div className="flex-1">
        <h3 className="m-0 mb-1 lg:text-lg text-base font-semibold text-gray-800">{subtopic.title}</h3>
        <p className="m-0 lg:text-sm text-xs text-gray-500 leading-snug line-clamp-2">{subtopic.description}</p>
      </div>
      
      <div className="text-gray-500 text-xl opacity-60 transition-all duration-200 flex-shrink-0 group-hover:opacity-100 group-hover:text-blue-500 group-hover:translate-x-0.5">
        <HiArrowRight />
      </div>
    </div>
  );
};

export default SubtopicCard;
