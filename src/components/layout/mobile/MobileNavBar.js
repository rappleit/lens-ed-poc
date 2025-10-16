import React from "react";
import { PiPathBold } from "react-icons/pi";
import { FaGlasses } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MobileNavBar = ({ onPathToggle, onLensToggle, activeLensIds = [] }) => {
  const hasActiveLenses = activeLensIds.length > 0;
  const navigate = useNavigate();

  return (
    <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <h1 className="text-lg md:text-xl font-semibold text-gray-900">LensEd</h1>
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onPathToggle}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <PiPathBold className="text-gray-900 text-2xl" />
        </button>
        <button
          onClick={onLensToggle}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FaGlasses
            className={`text-2xl transition-colors ${
              hasActiveLenses ? "text-blue-500" : "text-gray-900"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default MobileNavBar;
