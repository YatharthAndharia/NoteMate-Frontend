import { useState } from "react";
import { PaperAirplaneIcon, ChatBubbleLeftEllipsisIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate bot response (replace with API call)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "This is a demo response. You can connect it to AI." },
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-gray-700 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <ChatBubbleLeftEllipsisIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden z-40">
          <div className="bg-gray-700 text-white p-3 font-semibold">
            NoteMate-Bot
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50 max-h-96 scrollbar-thin scrollbar-thumb-gray-300">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-gray-100 self-end text-right ml-auto"
                    : "bg-gray-200 self-start text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex items-center border-t p-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-gray-700 hover:bg-gray-700 text-white p-2 rounded-md"
            >
              <PaperAirplaneIcon className="w-5 h-5 transform rotate-45" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
