import React from 'react';
import ExplorationPath from '../../ExplorationPath';

const LeftSidebar = ({ explorationPath, onNavigate }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-5 border-b border-gray-200 bg-white">
        <h2 className="m-0 text-xl font-semibold text-gray-600">Exploration Path</h2>
      </div>
      
      <div className="flex-1 p-5">
        <ExplorationPath 
          explorationPath={explorationPath}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};

export default LeftSidebar;
