import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import seedData from '@/data/seed.json';
import { useLowDataMode } from '@/context/LowDataModeContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIMentorWidget() {
  const { isLowDataMode } = useLowDataMode();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI Mentor. I can help you with:\n• Reviewing your emails\n• Suggesting portfolio items\n• Scoring mock interview answers\n\nHow can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Find matching response from seed data
    const matchedResponse = seedData.aiMentorResponses.find((response) =>
      lowerMessage.includes(response.trigger.toLowerCase())
    );

    if (matchedResponse) {
      return matchedResponse.response;
    }

    // Default responses
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return "I can help you with:\n\n1. **Email Review** - Share your email and I'll provide feedback\n2. **Portfolio Suggestions** - Get personalized portfolio recommendations\n3. **Mock Interview** - Practice answers and get scored\n4. **Resume Tips** - Improve your resume\n5. **Career Guidance** - Get advice on your career path\n\nJust ask me anything!";
    }

    if (lowerMessage.includes('resume')) {
      return "📄 **Resume Tips:**\n\n✓ Keep it to 1-2 pages\n✓ Use action verbs (Led, Developed, Achieved)\n✓ Quantify your achievements\n✓ Tailor it for each application\n✓ Include relevant keywords\n✓ Proofread carefully\n\nWould you like me to review your resume?";
    }

    if (lowerMessage.includes('interview')) {
      return "🎯 **Interview Preparation:**\n\n1. Research the company thoroughly\n2. Practice STAR method for behavioral questions\n3. Prepare questions to ask the interviewer\n4. Review your resume and projects\n5. Dress professionally\n6. Follow up with a thank-you email\n\nWant to practice a mock interview question?";
    }

    return "I understand you're asking about: \"" + userMessage + "\"\n\nCould you provide more details? Or try asking about:\n• Email review\n• Portfolio suggestions\n• Interview preparation\n• Resume tips";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    { label: 'Review my email', icon: '📧' },
    { label: 'Portfolio tips', icon: '💼' },
    { label: 'Mock interview', icon: '🎤' },
  ];

  if (isLowDataMode) {
    return (
      <div className="fixed bottom-6 right-6 z-40 w-72 bg-slate-900/95 border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">AI Mentor (Lite)</p>
            <p className="text-xs text-slate-400">Enter a question and get an instant tip.</p>
          </div>
        </div>
        <textarea
          className="mt-3 w-full h-20 rounded-lg bg-slate-950 border border-white/10 text-slate-100 text-sm p-2"
          placeholder="Ask for resume tips, interview prep, etc."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
          className="mt-3 w-full py-2 rounded-lg bg-slate-800 text-sm font-semibold text-slate-100 disabled:opacity-50"
        >
          Get Quick Tip
        </button>
        <div className="mt-3 max-h-48 overflow-y-auto space-y-2 text-xs text-slate-200">
          {messages.map((message) => (
            <div key={message.id} className={`p-2 rounded-lg ${message.sender === 'ai' ? 'bg-slate-800/80' : 'bg-slate-900/80 text-right'}`}>
              <p className="whitespace-pre-line">{message.text}</p>
              <span className="block mt-1 text-[10px] text-slate-500">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 0.9, 0.35, 1] }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple shadow-neon hover:shadow-neon-hover transition-all duration-300 flex items-center justify-center group"
        aria-label="Open AI Mentor"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.div
              key="ai"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl"
            >
              🤖
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse animation */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-neon-blue animate-ping opacity-20" />
        )}
      </motion.button>

      {/* Chat widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 0.9, 0.35, 1] }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[600px] glass rounded-2xl shadow-glass flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-neon-green rounded-full border-2 border-slate-950" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white">AI Mentor</h3>
                  <p className="text-xs text-slate-400">Always here to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-neon-blue to-primary-500 text-white'
                        : 'bg-white/10 text-slate-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-slate-400 mb-2">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => {
                        setInputValue(action.label);
                        handleSendMessage();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors flex items-center space-x-1"
                    >
                      <span>{action.icon}</span>
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 placeholder:text-slate-500 focus:bg-white/10 focus:border-neon-blue/50 focus:ring-2 focus:ring-neon-blue/20 transition-all outline-none text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-neon-blue to-primary-500 hover:shadow-neon-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
