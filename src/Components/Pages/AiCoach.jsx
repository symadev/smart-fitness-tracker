import { useState } from "react";

const AiCoach = () => {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([
    {
      type: "user",
      message: "What are some tips for building muscle?"
    },
    {
      type: "ai",
      message: "Focus on compound exercises, progressively increase weights, eat a high-protein diet, and ensure rest days."
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userMessage = { type: "user", message: question };

    // Mock AI response (replace this with real API call later)
    const aiResponse = {
      type: "ai",
      message: "That's a great question! Here's a tip: Stay consistent and track your progress every week."
    };

    setChat((prev) => [...prev, userMessage, aiResponse]);
    setQuestion("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1f60] px-4">
      <div className="w-full max-w-md bg-[#0e1c4b] text-white rounded-xl shadow-lg p-6 flex flex-col justify-between h-[80vh]">
        <h2 className="text-2xl font-bold text-center mb-4">
          AI COACH <span className="ml-1">🏋️‍♂️</span>
        </h2>

        <div className="flex-1 space-y-4 overflow-y-auto mb-4 pr-2">
          {chat.map((entry, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-sm ${
                entry.type === "user"
                  ? "bg-[#2c2c54] self-end text-right"
                  : "bg-[#132766] self-start text-left"
              }`}
            >
              {entry.message}
            </div>
          ))}
        </div>

        {/* Ask a Question */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Ask a question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md bg-[#2c2c54] text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 font-semibold text-white shadow-lg"
          >
            Ask
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiCoach;
