import React, { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: `AI says: ${input}` },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl bg-white shadow-2xl rounded-xl p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Chat with AI
      </h2>

      <div className="flex-1 overflow-y-auto mb-4 space-y-3 max-h-96 p-2 bg-gray-50 rounded-lg">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <span
              className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {loading && (
          <div className="text-gray-500 italic text-sm">AI is typing...</div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="flex gap-3">
        <input
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-500 text-white px-6 text-sm py-2 rounded-full font-semibold hover:bg-blue-600 transition disabled:opacity-50"
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
