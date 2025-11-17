
import React from 'react';

export const HeaderIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-indigo-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z" />
    <path d="M12 15l-4 4" />
    <path d="M12 3v4" />
    <path d="M12 12h-4" />
  </svg>
);

export const UploadIcon: React.FC = () => (
  <svg className="w-10 h-10 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
  </svg>
);

export const SpeakerIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.683 3.92 11 4.158 11 4.707V19.293c0 .55-.317.787-.707.397L5.586 15z" />
  </svg>
);

export const LoadingSpinner: React.FC = () => (
    <svg className="w-10 h-10 text-indigo-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const SpeakingIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <g>
        <rect x="4" y="8" width="4" height="8" className="animate-wave opacity-75" style={{ animationDelay: '0s' }} />
        <rect x="10" y="5" width="4" height="14" className="animate-wave opacity-75" style={{ animationDelay: '0.2s' }}/>
        <rect x="16" y="8" width="4" height="8" className="animate-wave opacity-75" style={{ animationDelay: '0.4s' }} />
      </g>
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
        .animate-wave {
          animation: wave 1.2s ease-in-out infinite;
          transform-origin: bottom;
        }
      `}</style>
    </svg>
);
