
import React from 'react';
import { SpeakerIcon, LoadingSpinner, SpeakingIcon } from './icons';

interface StoryDisplayProps {
  story: string | null;
  isLoading: boolean;
  isSpeaking: boolean;
  onReadAloud: () => void;
  genre: string;
  onGenreChange: (genre: string) => void;
  style: string;
  onStyleChange: (style: string) => void;
}

const GENRES = ['Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Horror', 'Thriller'];
const STYLES = ['Descriptive', 'Poetic', 'Minimalist', 'Suspenseful', 'Whimsical'];

const Selector: React.FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  disabled: boolean;
}> = ({ label, value, options, onChange, disabled }) => (
  <div className="flex-1">
    <label htmlFor={label.toLowerCase()} className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
    <select
      id={label.toLowerCase()}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-2 transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, isLoading, isSpeaking, onReadAloud, genre, onGenreChange, style, onStyleChange }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6 flex flex-col h-full shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-indigo-300">Your Story's Opening</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Selector label="Genre" value={genre} options={GENRES} onChange={onGenreChange} disabled={isLoading} />
        <Selector label="Style" value={style} options={STYLES} onChange={onStyleChange} disabled={isLoading} />
      </div>

      <div className="flex-grow prose prose-invert prose-lg min-h-[200px] font-serif text-gray-300 bg-gray-900/50 p-4 rounded-md">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <LoadingSpinner />
            <p className="mt-4 text-gray-400">Crafting your narrative...</p>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{story}</p>
        )}
      </div>
      <div className="mt-6">
        <button
          onClick={onReadAloud}
          disabled={!story || isLoading || isSpeaking}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 font-bold text-white bg-indigo-600 rounded-lg shadow-lg
                     hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500
                     transition-all duration-300 ease-in-out transform hover:scale-105
                     disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSpeaking ? <SpeakingIcon /> : <SpeakerIcon />}
          {isSpeaking ? 'Narrating...' : 'Read Aloud'}
        </button>
      </div>
    </div>
  );
};

export default StoryDisplay;
