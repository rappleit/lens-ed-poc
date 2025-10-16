import React from 'react';

const ExplorationPath = ({ explorationPath, onNavigate }) => {
  const handleItemClick = (itemId) => {
    if (onNavigate) {
      onNavigate(itemId);
    }
  };

  return (
    <div className="space-y-3">
      {explorationPath.map((item) => (
        <div 
          key={item.id} 
          className={`rounded-lg p-4 cursor-pointer transition-all duration-200 ${
            item.isActive 
              ? 'bg-blue-500 border border-blue-500 text-white' 
              : 'bg-white border border-gray-200 opacity-70 hover:opacity-100 hover:border-blue-500 hover:shadow-md'
          }`}
          onClick={() => handleItemClick(item.id)}
        >
          <div className={`text-lg font-semibold mb-1 ${
            item.isActive ? 'text-white' : 'text-gray-800'
          }`}>
            {item.title}
          </div>
          <div className={`text-sm ${
            item.isActive ? 'text-white text-opacity-90' : 'text-gray-600 opacity-80'
          }`}>
            {item.type}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExplorationPath;
