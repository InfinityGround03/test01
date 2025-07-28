import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkDependencies = () => {
      if (window.Chat && window.Home) {
        setIsReady(true);
      }
    };

    checkDependencies();
    const interval = setInterval(checkDependencies, 100);
    return () => clearInterval(interval);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#141616]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#ae75fb]"></div>
        <p className="mt-4 text-gray-400 text-lg">Loading AI Chatbot...</p>
      </div>
    );
  }

  return <window.Home />;
}

createRoot(document.getElementById('renderDiv')).render(<App />);