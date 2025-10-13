import React from 'react';
import QuestionCard from './QuestionCard';
import { getQuestionsByIds } from '../core/domain/contentService';
import { HiQuestionMarkCircle } from 'react-icons/hi2';

const QuestionsSection = ({ questions, lensIds = [], onNavigate }) => {
  const questionData = getQuestionsByIds(questions, lensIds);

  if (!questionData || questionData.length === 0) {
    return (
      <div className="bg-transparent pb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-xl"><HiQuestionMarkCircle /></div>
          <h2 className="m-0 text-xl font-semibold text-gray-600">Questions</h2>
        </div>
        <div className="p-0 flex flex-col gap-4">
          <div className="text-center py-10 text-gray-500">
            <p className="m-0 text-lg">No questions available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent pb-10">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-xl"><HiQuestionMarkCircle /></div>
        <h2 className="m-0 text-xl font-semibold text-gray-600">Questions</h2>
      </div>
      
      <div className="p-0 flex flex-col gap-4">
        {questionData.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionsSection;
