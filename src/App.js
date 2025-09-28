import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchPage from './pages/SearchPage';
import TopicViewerPage from './pages/TopicViewerPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/search/:topicName" element={<TopicViewerPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
