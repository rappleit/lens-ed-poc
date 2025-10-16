import React, { useState } from 'react';
import { HiChevronDown, HiChevronRight } from 'react-icons/hi2';

const QuestionCard = ({ question }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-blue-500 hover:shadow-md hover:shadow-blue-100">
      <div 
        className="flex items-center gap-3 p-4 cursor-pointer transition-colors duration-200 hover:bg-gray-50" 
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-center w-6 h-6 text-blue-500 text-xl flex-shrink-0">
          {isExpanded ? <HiChevronDown /> : <HiChevronRight />}
        </div>
        <h3 className="m-0 lg:text-base text-sm font-semibold text-gray-800 flex-1">{question.question}</h3>
      </div>
      
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {question.answers.map((answer, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <p className="m-0 text-sm leading-relaxed text-gray-600 pl-4 relative before:content-['•'] before:text-blue-500 before:font-bold before:absolute before:left-0">
                {answer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
