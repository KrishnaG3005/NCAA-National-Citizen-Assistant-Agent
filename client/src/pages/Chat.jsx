import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", text: input }]);
      setInput("");
      // TODO: Add API call to send message to backend
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="page-shell stack">
        <div className="section-title">
          <p className="eyebrow">Chat Assistant</p>
          <h1>Ask Questions</h1>
          <p>
            Get personalized assistance with eligibility questions and scheme
            recommendations.
          </p>
        </div>

        <div className="chat-container">
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="empty-state">
                <p className="muted">No messages yet. Start a conversation!</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`message message-${msg.role}`}>
                  <p>{msg.text}</p>
                </div>
              ))
            )}
          </div>

          <div className="chat-input-box">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question about schemes or eligibility..."
              className="chat-input"
            />
            <button onClick={handleSendMessage} className="primary-link">
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chat;
