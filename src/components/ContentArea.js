import React from "react";
import Factsheet from "./Factsheet";
import SubtopicsSection from "./SubtopicsSection";
import QuestionsSection from "./QuestionsSection";
import PartnershipBanner from "./PartnershipBanner";
import TitleCard from "./TitleCard";

const ContentArea = ({ currentContent, onNavigate }) => {
  if (!currentContent) {
    return (
      <div className="h-full max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-2xl font-bold text-gray-800 mb-3">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      {(currentContent.partner) && <PartnershipBanner partner={currentContent.partner} />}
      <div className="mb-8">
        {currentContent.titleBgUrl ? (
          <TitleCard
            title={currentContent.title}
            bgUrl={currentContent.titleBgUrl}
          />
        ) : (
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {currentContent.title}
          </h1>
        )}
        {currentContent.summary && (
          <div className="my-4 mx-1">
            <p className=" leading-relaxed text-gray-600">
              {currentContent.summary}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-10 md:gap-6 pb-10 mx-1">
        {currentContent.factsheets && currentContent.factsheets.length > 0 && (
          <Factsheet factsheets={currentContent.factsheets} />
        )}
        {currentContent.subtopics && currentContent.subtopics.length > 0 && (
          <SubtopicsSection
            subtopics={currentContent.subtopics}
            onNavigate={onNavigate}
          />
        )}
        {currentContent.questions && currentContent.questions.length > 0 && (
          <QuestionsSection
            questions={currentContent.questions}
            onNavigate={onNavigate}
          />
        )}
      </div>
    </div>
  );
};

export default ContentArea;
