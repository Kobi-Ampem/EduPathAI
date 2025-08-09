import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, MoreHorizontal } from 'lucide-react';
import { Screen, ChatMessage } from '../types';
import { getBotResponse } from '../utils/chatBot';
import { getRandomQuote } from '../data/quotes';

interface ChatScreenProps {
  onNavigate: (screen: Screen) => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const todayQuote = getRandomQuote();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = getBotResponse(text.trim());
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    sendMessage(action);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('welcome')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        
        <h1 className="text-lg font-semibold text-gray-800">EduBot Chat</h1>
        
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <MoreHorizontal className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1">
                <div className="text-white text-sm">🤖</div>
              </div>
            )}
            
            <div
              className={`max-w-xs rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1">
              <div className="text-white text-sm">🤖</div>
            </div>
            <div className="bg-gray-100 rounded-2xl px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-gray-50">
        <div className="flex gap-2 mb-4 overflow-x-auto">
          <button
            onClick={() => handleQuickAction('I need help with mental health')}
            className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
          >
            Mental Health
          </button>
          <button
            onClick={() => handleQuickAction('I need academic advice')}
            className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
          >
            Academic Life
          </button>
          <button
            onClick={() => handleQuickAction('Tell me about career choices')}
            className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
          >
            Career Choices
          </button>
        </div>

        {/* Quote of the Day */}
        <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">Quote of the Day</h4>
          <blockquote className="text-gray-600 text-sm italic leading-relaxed">
            "{todayQuote.quote}"
          </blockquote>
          <cite className="text-gray-500 text-xs block mt-2">– {todayQuote.author}</cite>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          <button
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim()}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              inputText.trim()
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;