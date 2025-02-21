'use client'
import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

export const useWebSockets = () => {
  const [ws, setWs] = useState(null);
  const [address1, setAddress] = useState(null); // Fetch user address (modify based on your needs)
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const connect = () => {
    if (!ws) {
      const newWs = new WebSocket('ws://localhost:3000/api/websocket'); // Replace with your WebSocket server URL
      setWs(newWs);

      newWs.on('open', () => {
        console.log('WebSocket connection established');
        // Send initial message to server (if needed)
      });

      newWs.on('message', (data) => {
        setMessage(data);
        // Handle incoming messages and update state accordingly
      });

      newWs.onerror = (error) => {
        setError(error);
        console.error('WebSocket error:', error);
      };

      newWs.onclose = () => {
        setWs(null);
        console.log('WebSocket connection closed');
      };
    }
  };

  const subscribe = (channel, callback) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      // Implement subscription logic based on your WebSocket server
      ws.send(JSON.stringify({ type: 'subscribe', channel }));
      // ... other subscription logic ...
    } else {
      console.warn('WebSocket not connected or not open');
    }
  };

  return {
    ws,
    address1,
    setAddress,
    message,
    error,
    connect,
    subscribe,
  };
};
