import React, { useState } from 'react';
import { AiFillSound } from "react-icons/ai";
import { FaStop } from "react-icons/fa";
const TTSButton = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const stripMarkdown = (text) => {
    return text
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove markdown links
      .replace(/([*_~`>#+-])/g, ''); // Remove markdown formatting characters
  };

  const handleSpeak = () => {
    const processedText = stripMarkdown(text);
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(processedText);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <button onClick={handleSpeak} aria-label={isSpeaking ? "Stop reading" : "Read text aloud"} className="bg-white p-1 rounded-full shadow-md hover:bg-blue-100">
      {isSpeaking ? <FaStop className="text-red-500" /> : <AiFillSound className="text-blue-500" />}
    </button>
  );
};

export default TTSButton;
