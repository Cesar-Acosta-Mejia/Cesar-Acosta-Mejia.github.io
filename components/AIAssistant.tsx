
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Message } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '¡Hola! Soy el asistente de César. ¿Tienes alguna pregunta sobre el proyecto?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await geminiService.getAssistantResponse(input);
    const assistantMsg: Message = { role: 'model', text: response };
    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`size-14 rounded-full flex items-center justify-center transition-all shadow-xl ${
          isOpen ? 'bg-background-dark border border-border-dark' : 'bg-primary hover:scale-110 active:scale-95'
        }`}
      >
        <span className="material-symbols-outlined text-3xl">
          {isOpen ? 'close' : 'smart_toy'}
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] max-w-[calc(100vw-40px)] h-[500px] bg-surface-dark border border-border-dark rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-4 border-b border-border-dark flex items-center gap-3 bg-background-dark/50">
            <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">smart_toy</span>
            </div>
            <div>
              <p className="text-sm font-bold">Asistente Virtual</p>
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-[10px] text-text-muted uppercase">En línea</p>
              </div>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-hide"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-background-dark border border-border-dark text-white rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-background-dark border border-border-dark p-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="size-1.5 rounded-full bg-text-muted animate-bounce"></div>
                    <div className="size-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:0.2s]"></div>
                    <div className="size-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-background-dark/50 border-t border-border-dark">
            <div className="relative flex items-center">
              <input
                type="text"
                className="w-full bg-surface-dark border border-border-dark rounded-xl pl-4 pr-12 py-3 text-sm focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-text-muted/50"
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 size-8 bg-primary rounded-lg flex items-center justify-center text-white disabled:opacity-50 transition-transform active:scale-90"
              >
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
