import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const normalized = searchTerm.trim().toLowerCase().replace(/\s+/g, '_');
      navigate(`/search/${encodeURIComponent(normalized)}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl w-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">LensEd</h1>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search for a topic..."
              className="w-full px-6 py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <FaSearch className="h-6 w-6 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            className="text-base w-full bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Explore Topic
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Try searching for topics like "ants", "biology", or "chemistry"
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Trending Topics</h2>
          <div className="grid grid-cols-3 gap-4">
            <div 
              onClick={() => navigate('/search/ants')}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🐜</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Ants</h3>
              </div>
              <p className="text-sm text-gray-600">
                Discover the fascinating world of social insects, their complex colonies, and chemical communication systems.
              </p>
            </div>

            <div 
              onClick={() => navigate('/search/painting')}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Painting</h3>
              </div>
              <p className="text-sm text-gray-600">
                Explore the art of creating images through colors, techniques, and creative expression across cultures.
              </p>
            </div>

            <div 
              onClick={() => navigate('/search/malayan_tiger')}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🐯</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Malayan Tiger</h3>
              </div>
              <p className="text-sm text-gray-600">
                Learn about the critically endangered Malayan tiger
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
