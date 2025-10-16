import React from 'react';
import { IoClose } from 'react-icons/io5';

const MobileMenuOverlay = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <IoClose className="text-gray-600 text-xl" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileMenuOverlay;
