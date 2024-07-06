// File: Chatbot.jsx

import React, { useState, useEffect, useRef } from 'react';
import './chatbot.css'; // Import your updated CSS file

const Chatbot = () => {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => {
    setExpanded(!expanded);
  };

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Effect to scroll down whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    try {
      // Simulating message response (replace with actual fetch logic)
      const response = await fetch('http://localhost:5000/api/13', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botResponse = data.response;

      // Update messages state with user input and bot response
      setMessages([...messages, `You: ${inputMessage}`, `Bot: ${botResponse}`]);
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className={`chatbot ${expanded ? 'expanded' : ''}`}>
      {!expanded && (
        <div className="chatbot-icon" onClick={toggleChatbot}>
          {/* <img src='/logo192.png' alt = "not showing" /> */}
          <img src="/chatbot-icon.svg" alt="Icon1" />
        </div>
      )}
      {expanded && (
        <>
          <div className="chatbot-header" onClick={toggleChatbot}>
            Chatbot
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className="message">
                {message}
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* This empty div ensures scrolling to bottom */}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
            />
            <button onClick={sendMessage}>Send</button>
            <div className="chatbot-icon" onClick={toggleChatbot}>
          <img src="/chatbot-icon.svg" alt="Icon2" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
