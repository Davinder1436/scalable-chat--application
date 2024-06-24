"use client"

import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

import { useState } from 'react';


const ChatPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2>Chat Rooms</h2>
        <ul>
          <li>General</li>
          <li>Tech</li>
          <li>Random</li>
        </ul>
      </aside>
      <main className={styles.main}>
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div key={index} className={styles.message}>
              {msg}
            </div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button className={styles.sendButton} onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;