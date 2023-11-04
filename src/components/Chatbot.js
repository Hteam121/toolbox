import React, { useState, useEffect, useRef } from 'react';
import { sendMessage, listenForMessages, clearChat } from '../services/ChatService';
import '../static/ChatBot.css';
import { onChildAdded, off } from "firebase/database";
import { getDatabase, ref } from "firebase/database";


const chatId = 'your_chat_id';

function Chatbot({ completedStartup }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentUser, setCurrentUser] = useState('user1');
  const chatAreaRef = useRef(null);
  

  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, `chats/${chatId}`);
    
    const handleNewMessage = snapshot => {
        setMessages(prevMessages => [...prevMessages, { ...snapshot.val(), sender: snapshot.val().sender }]);
    };
    
    onChildAdded(messagesRef, handleNewMessage);
    
    // Return a cleanup function to detach the listener
    return () => {
        off(messagesRef, 'child_added', handleNewMessage);
    };
}, []);

const handleClearChat = () => {
  clearChat(chatId);  // Call clearChat with chatId
  setMessages([]);  // This will clear the messages on the client-side as well
};

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleNewMessage = snapshot => {
    console.log('handleNewMessage called', snapshot.val());
    setMessages(prevMessages => [...prevMessages, { ...snapshot.val(), sender: snapshot.val().sender }]);
};

const handleSendMessage = () => {
    console.log('handleSendMessage called', userInput);
    if (userInput.trim()) {
        sendMessage(chatId, currentUser, userInput);
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
      <button style={{position: 'absolute', left: 0, opacity: 0}} onClick={() => setCurrentUser('user2')}>Switch to User 2</button>
      <button style={{position: 'absolute', right: 0, opacity: 0}} onClick={() => setCurrentUser('user1')}>Switch to User 1</button>
      <button onClick={handleClearChat}>Clear Chat</button>  
      <div className="chat-area" ref={chatAreaRef}>
      {messages.map((message, index) => (
        <div 
            key={message.id || index}
            className={`message ${message.sender === currentUser ? 'user' : 'other'}`}
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
