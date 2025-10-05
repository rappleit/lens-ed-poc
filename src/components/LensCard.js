import React from 'react';

const LensCard = ({ lens, onToggle }) => {
  const handleClick = () => {
    if (!lens.isDisabled) {
      onToggle(lens.id);
    }
  };

  return (
    <div 
      className={`bg-white border rounded-lg p-4 transition-all duration-200 ${
        lens.isDisabled 
          ? 'opacity-40 cursor-not-allowed border-gray-200' 
          : lens.isActive 
            ? 'border-green-500 bg-green-50 cursor-pointer hover:border-green-600 hover:shadow-md' 
            : 'border-gray-200 cursor-pointer hover:border-blue-500 hover:shadow-md'
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`m-0 text-base font-semibold flex-1 ${
          lens.isDisabled ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {lens.title}
          {lens.isComingSoon && <span className="ml-1 text-orange-400">*</span>}
        </h3>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
          lens.isDisabled
            ? 'bg-gray-100 text-gray-300'
            : lens.isActive 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 text-gray-500'
        }`}>
          {lens.isActive ? '✓' : '+'}
        </div>
      </div>
      
      <p className={`m-0 mb-3 text-sm leading-snug ${
        lens.isDisabled ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {lens.description}
      </p>
      
      <div className="flex justify-between items-center">
        <div className={`text-xs capitalize italic ${
          lens.isDisabled ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {lens.lensType} lens
        </div>
        {lens.isComingSoon && (
          <div className="text-xs text-orange-500 font-medium">
            Coming Soon
          </div>
        )}
      </div>
    </div>
  );
};

export default LensCard;
