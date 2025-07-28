import React, { useState, useEffect, useRef } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatManagerRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    chatManagerRef.current = new window.ChatManager(
      'You are a helpful AI assistant. Be friendly, informative, and engaging in your responses.'
    );
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

    setIsLoading(true);
    chatManagerRef.current.addMessage('user', userMessage);

    try {
      const response = await chatManagerRef.current.getCharacterResponse();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response },
      ]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    }

    setIsLoading(false);
  };

  const clearChat = () => {
    setMessages([]);
    chatManagerRef.current?.cleanChatHistory();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-[#4e4e4e]">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ae75fb] to-[#90B5FF]">
          AI Chatbot
        </h2>
        <button
          onClick={clearChat}
          className="px-3 py-1 text-sm bg-[#343434] hover:bg-[#444444] text-white rounded border border-[#4e4e4e] transition-all duration-300"
        >
          Clear Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-[#ae75fb] to-[#90B5FF] flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-semibold text-white">
                Start a Conversation
              </h2>
              <p className="text-gray-400 max-w-md">
                Ask me anything! I'm here to help with information, answer questions, or just have a chat.
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-[#be0eff]/30 to-[#8fb4ff]/30 border border-[#be0eff]/40'
                    : 'glass-morphism'
                }`}
              >
                <div className="flex items-center mb-2">
                  <div
                    className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center text-xs font-bold ${
                      message.role === 'user'
                        ? 'bg-[#be0eff] text-white'
                        : 'bg-[#90B5FF] text-white'
                    }`}
                  >
                    {message.role === 'user' ? 'U' : 'AI'}
                  </div>
                  <p className="text-sm font-medium text-gray-300">
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </p>
                </div>
                <p className="text-gray-100 whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-4 glass-morphism">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 rounded-full mr-2 bg-[#90B5FF] flex items-center justify-center text-xs font-bold text-white">
                    AI
                  </div>
                  <p className="text-sm font-medium text-gray-300">AI Assistant</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#be0eff] rounded-full mr-1 animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-[#9b64fb] rounded-full mr-1 animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#8fb4ff] rounded-full animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-[#4e4e4e]">
        <div className="flex gap-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-[#343434]/80 backdrop-blur-sm border border-[#4e4e4e] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ae75fb]/50 focus:border-transparent transition-all duration-300 placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="px-6 py-3 bg-gradient-to-r from-[#be0eff] to-[#8fb4ff] rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'go'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

window.Chat = Chat;
