import React from 'react';

const LensCard = ({ lens, onToggle }) => {
  const handleClick = () => {
    onToggle(lens.id);
  };

  return (
    <div 
      className={`bg-white border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-blue-500 hover:shadow-md ${
        lens.isActive 
          ? 'border-green-500 bg-green-50' 
          : 'border-gray-200'
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="m-0 text-base font-semibold text-gray-600 flex-1">{lens.title}</h3>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
          lens.isActive 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-200 text-gray-500'
        }`}>
          {lens.isActive ? '✓' : '+'}
        </div>
      </div>
      
      <p className="m-0 mb-3 text-sm text-gray-500 leading-snug">{lens.description}</p>
      
      <div className="text-xs text-gray-500 capitalize italic">
        {lens.lensType} lens
      </div>
    </div>
  );
};

export default LensCard;
