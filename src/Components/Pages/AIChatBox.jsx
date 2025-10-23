import { useState } from "react";

const AIChatBox = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!prompt.trim()) return;
    const userMessage = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const response = await fetch("https://fitness-server-lilac.vercel.app/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: prompt }),
      });
      
      const data = await response.json();
      const aiMessage = { role: "ai", content: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ AI response failed!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-950 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Main container */}
        <div className="bg-blue-600 rounded-2xl shadow-lg border border-blue-800 overflow-hidden">
          
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-xl mb-3 shadow-sm">
                <span className="text-2xl">🤖</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-1">
                AI Fitness Coach
              </h2>
              <p className="text-blue-100 text-sm">Your personal guide to health and wellness</p>
            </div>

            {/* Messages Container */}
            <div className="mb-6 bg-blue-800 rounded-xl border border-blue-800 overflow-hidden">
              <div className="p-5 space-y-4 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
                {messages.length === 0 && (
                  <div className="text-center text-blue-200 py-16">
                    <div className="text-5xl mb-4">💬</div>
                    <p className="text-base font-medium mb-1 text-white">Ready to transform your fitness journey?</p>
                    <p className="text-sm text-blue-300">Ask me anything about workouts, nutrition, or wellness!</p>
                  </div>
                )}

                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    } animate-slide-in`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="flex items-end gap-2 max-w-[80%]">
                      {msg.role === "ai" && (
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                          <span className="text-xs">🤖</span>
                        </div>
                      )}
                      <div
                        className={`p-4 rounded-xl shadow-sm ${
                          msg.role === "user"
                            ? "bg-blue-500 text-white rounded-br-sm"
                            : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                        }`}
                      >
                        <div className="text-sm leading-relaxed whitespace-pre-line">
                          {msg.content}
                        </div>
                      </div>
                      {msg.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <span className="text-xs">👤</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start animate-slide-in">
                    <div className="flex items-end gap-2">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <span className="text-xs">🤖</span>
                      </div>
                      <div className="bg-white border border-gray-100 p-4 rounded-xl rounded-bl-sm shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-gray-600 font-medium">
                            Thinking...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Section */}
            <div className="space-y-3">
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your fitness question here..."
                    className="w-full bg-blue-700 border border-blue-800 text-white placeholder-blue-300 p-3.5 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all text-sm"
                    disabled={loading}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 text-sm">
                    ⏎
                  </div>
                </div>

                <button
                  onClick={sendMessage}
                  disabled={loading || !prompt.trim()}
                  className="bg-white text-blue-600 p-3.5 rounded-xl hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <div className="flex items-center justify-center w-5 h-5">
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>

              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-2">
                {[
                  { emoji: "💪", text: "Workout tips" },
                  { emoji: "🥗", text: "Meal planning" },
                  { emoji: "😴", text: "Better sleep" },
                  { emoji: "🏃", text: "Cardio advice" }
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(suggestion.text)}
                    className="text-sm bg-blue-700 text-blue-100 px-3.5 py-2 rounded-lg border border-blue-800 hover:bg-blue-800 hover:text-white transition-colors"
                    disabled={loading}
                  >
                    <span className="mr-1.5">{suggestion.emoji}</span>
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thumb-blue-500::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 3px;
        }

        .scrollbar-thumb-blue-500::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }

        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default AIChatBox;