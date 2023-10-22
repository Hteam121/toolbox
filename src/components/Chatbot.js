// src/components/Chatbot.js
import React, { useState, useEffect } from 'react';
import { sendMessage, listenForMessages } from '../services/ChatService';

const chatId = 'your_chat_id';  // Replace with your chat ID

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    listenForMessages(chatId, message => {
      setMessages(prevMessages => [...prevMessages, { ...message, sender: message.sender }]);
    });
  }, []);

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
      <div className="chat-area">
        {messages.map((message, index) => (
          <div key={index} className={message.sender}>
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
