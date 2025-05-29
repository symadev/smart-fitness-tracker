import { useState, useEffect, useRef } from "react";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom on new chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) return;

    const userMessage = { type: "user", message: question.trim() };
    setChat((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ai", {
        prompt: question.trim(),
      });

      const aiResponse = {
        type: "ai",
        message: res.data.message || "Sorry, I couldn't generate a response.",
      };

      setChat((prev) => [...prev, aiResponse]);
    } catch (err) {
      console.error("Failed to get AI response:", err);
      setChat((prev) => [
        ...prev,
        {
          type: "ai",
          message: "Something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1f60] px-4">
      <div className="w-full max-w-md bg-[#0e1c4b] text-white rounded-xl shadow-lg p-6 flex flex-col justify-between h-[80vh]">
        <h2 className="text-2xl font-bold text-center mb-4">
          AI COACH <span className="ml-1">🤖</span>
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
          <div ref={chatEndRef} />
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
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md font-semibold text-white shadow-lg ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800"
            }`}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiCoach;
