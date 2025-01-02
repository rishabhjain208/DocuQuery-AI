import React, { useState } from "react";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

const Openai = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setLoading(true); // Start loading spinner

    try {
      const response = await axios.post(
        "http://localhost:3000/api/questions/ask",
        {
          question: input,
        }
      );

      const aiResponse = response.data?.saved_Ques?.answer || "No response.";
      setMessages([...newMessages, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      console.error("Error sending question:", error);
      setMessages([
        ...newMessages,
        { sender: "ai", text: "Failed to get a response." },
      ]);
    }

    setInput("");
    setLoading(false); // Stop loading spinner
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-xl px-4 py-2 rounded-lg ${
              message.sender === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-gray-900 self-start"
            }`}
          >
            {message.text}
          </div>
        ))}

        {/* Display loading spinner */}
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <ClipLoader
              color="#3b82f6"
              loading={loading}
              cssOverride={override}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-300">
        <div className="relative w-full max-w-3xl mx-auto">
          <input
            type="text"
            className="w-full p-3 pr-12 border rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading} // Disable input during loading
          />
          <button
            className="absolute inset-y-0 right-3 flex items-center justify-center text-blue-500 hover:text-blue-600 focus:outline-none"
            onClick={handleSend}
            disabled={loading} // Disable button during loading
          >
            <IoMdSend size={24} className="text-gray-500 opacity-55" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Openai;
