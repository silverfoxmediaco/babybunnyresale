// File: frontend/src/contexts/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext({});

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Connect to socket server
    const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001', {
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
      setConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnected(false);
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  // Join an auction room
  const joinAuction = (auctionId) => {
    if (socket) {
      socket.emit('join_auction', auctionId);
    }
  };

  // Leave an auction room
  const leaveAuction = (auctionId) => {
    if (socket) {
      socket.emit('leave_auction', auctionId);
    }
  };

  // Listen for new bids
  const onNewBid = (callback) => {
    if (socket) {
      socket.on('new_bid', callback);
      return () => socket.off('new_bid', callback);
    }
  };

  // Listen for auction updates
  const onAuctionUpdate = (callback) => {
    if (socket) {
      socket.on('auction_update', callback);
      return () => socket.off('auction_update', callback);
    }
  };

  const value = {
    socket,
    connected,
    joinAuction,
    leaveAuction,
    onNewBid,
    onAuctionUpdate,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};