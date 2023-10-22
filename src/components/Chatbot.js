// src/components/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import { sendMessage, listenForMessages } from '../services/ChatService';
import '../static/ChatBot.css';  // Updated to match the actual file name

const chatId = 'your_chat_id';  // Replace with your chat ID

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const chatAreaRef = useRef(null);


  useEffect(() => {
    listenForMessages(chatId, message => {
      console.log("Received message:", message);
      setMessages(prevMessages => [...prevMessages, { ...message, sender: message.sender }]);
    });
  }, []);
  
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  

  const handleSendMessage = () => {
    if (userInput.trim()) {
      sendMessage(chatId, 'user', userInput);
      setUserInput('');
    }
  };

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-area" ref={chatAreaRef}>
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.sender === 'user' ? 'user' : 'other'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
