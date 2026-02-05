import React, { useState, useRef, useEffect } from 'react';
import { ArtPiece, ChatMessage } from '../types';
import { generateCuratorResponse } from '../services/geminiService';
import { Send, X, MessageCircle, Sparkles } from 'lucide-react';

interface AiCuratorProps {
  currentPiece?: ArtPiece | null;
  isOpen: boolean;
  onToggle: () => void;
}

const AiCurator: React.FC<AiCuratorProps> = ({ currentPiece, isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: "Welcome to The Eight Space. I am the AI Curator. Ask me about our mission, the current exhibition, or the artists." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const history = [...messages, userMsg].map(m => ({ role: m.role, text: m.text }));
    
    // Simulate thinking delay for realism
    const responseText = await generateCuratorResponse(history, currentPiece);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-40 bg-gallery-900 text-white p-4 rounded-full shadow-xl hover:scale-105 transition-transform duration-300 flex items-center gap-2"
      >
        <Sparkles size={20} />
        <span className="font-serif italic pr-1">Ask Curator</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px]">
      {/* Header */}
      <div className="bg-gallery-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-yellow-400" />
          <h3 className="font-serif italic text-lg">AI Curator</h3>
        </div>
        <button onClick={onToggle} className="hover:text-gray-300 transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Context Indicator */}
      {currentPiece && (
        <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 border-b border-gray-100 truncate">
          Viewing: <span className="font-bold text-gray-700">{currentPiece.title}</span> by {currentPiece.artist}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-gallery-900 text-white rounded-br-none' 
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about the art..."
            className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-full text-sm border-transparent focus:border-gray-300 focus:bg-white focus:ring-0 transition-all outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gallery-900 hover:bg-gray-200 rounded-full disabled:opacity-30 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiCurator;