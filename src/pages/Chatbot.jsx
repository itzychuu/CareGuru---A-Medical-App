import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/chatbot.css";
import { getAIResponse } from "../services/aiService";

function Chatbot() {
  // ================= STATE =================
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // ================= STATIC DATA =================
  const recommendations = [
    "Prepare me a diet",
    "Healthy daily routine",
    "Tips to improve immunity",
  ];

  // ================= FUNCTIONS =================

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    // User message
    const userMessage = {
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Save chat history only once per conversation
    if (messages.length === 0) {
      setChatHistory((prev) => [
        ...prev,
        `Chat ${prev.length + 1}`,
      ]);
    }

    // AI typing placeholder
    const typingMessage = {
      sender: "ai",
      text: "AI is typing...",
    };

    setMessages((prev) => [...prev, typingMessage]);

    // Get AI response (real or demo)
    const aiReply = await getAIResponse(userText);

    // Replace typing with real AI message
    setMessages((prev) => [
      ...prev.slice(0, -1),
      {
        sender: "ai",
        text: aiReply,
      },
    ]);
  };

  // ================= UI =================
  return (
    <div className="chatbot-container">
      {/* ================= LEFT PANEL ================= */}
      <div className="chat-left">
        <h3>AI Recommendation</h3>

        {recommendations.map((rec, index) => (
          <button
            key={index}
            className="recommend-btn"
            onClick={() => setInput(rec)}
          >
            {rec}
          </button>
        ))}

        <h4>Chat History</h4>

        <ul className="chat-history">
          {chatHistory.length === 0 ? (
            <li className="empty">No chats yet</li>
          ) : (
            chatHistory.map((chat, index) => (
              <li key={index}>{chat}</li>
            ))
          )}
        </ul>
      </div>

      {/* ================= CENTER CHAT ================= */}
      <div className="chat-center">
        <div className="chat-area">
          {messages.length === 0 && (
            <p className="empty-chat">
              Start a conversation with the AI assistant
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${msg.sender}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* INPUT BAR */}
        <div className="chat-input">
          <input
            type="text"
            placeholder="Ask anything you want"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSendMessage()
            }
          />

          <button className="icon-btn" title="Voice (demo)">
            🎤
          </button>

          <button className="icon-btn" title="Attach file (demo)">
            ➕
          </button>

          <button
            className="send-btn"
            title="Send"
            onClick={handleSendMessage}
          >
            ➤
          </button>
        </div>
      </div>

      {/* ================= RIGHT SLIDE MENU ================= */}
      <div className={`chat-right ${menuOpen ? "open" : ""}`}>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav className="side-nav">
          <Link to="/">Home →</Link>
          <Link to="/hospitals">Book OP →</Link>
          <Link to="/about">About →</Link>
          <a href="#contact">Contact Us →</a>

          <button className="share-btn">🔗 Share</button>
        </nav>
      </div>
    </div>
  );
}

export default Chatbot;
