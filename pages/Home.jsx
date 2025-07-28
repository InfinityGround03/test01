import React from 'react';

function Home() {
  const Chat = window.Chat;

  return (
    <div className="min-h-screen bg-[#141616] text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#bb00ff]/20 blur-[100px]"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#90B5FF]/20 blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#3d107a]/20 blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#bb00ff] to-[#90B5FF] bg-clip-text text-transparent mb-4">
            111111
          </h1>
          <p className="text-xl text-gray-300">
            Your intelligent conversation companion
          </p>
        </div>

        <div className="glass-morphism rounded-xl animate-pulse-glow" style={{ height: '70vh' }}>
          <Chat />
        </div>

        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>Powered by advanced AI • Start typing to begin your conversation</p>
        </div>
      </div>
    </div>
  );
}

window.Home = Home;