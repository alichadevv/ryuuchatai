import { useState, useEffect } from 'react';
import { User, AuthState } from '../types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('plankxploit_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          loading: false,
          error: null
        });
      } catch (error) {
        localStorage.removeItem('plankxploit_user');
        setAuthState({
          user: null,
          loading: false,
          error: null
        });
      }
    } else {
      setAuthState({
        user: null,
        loading: false,
        error: null
      });
    }
  }, []);

  const login = (user: User) => {
    // Send Telegram notification for new login
    sendTelegramNotification(
      `🔐 <b>User Login</b>\n` +
      `Username: ${user.username}\n` +
      `Email: ${user.email}\n` +
      `Time: ${new Date().toLocaleString()}`
    );

    localStorage.setItem('plankxploit_user', JSON.stringify(user));
    setAuthState({
      user,
      loading: false,
      error: null
    });
  };

  const register = (user: User) => {
    // Send Telegram notification for new registration
    sendTelegramNotification(
      `👤 <b>New User Registration</b>\n` +
      `Username: ${user.username}\n` +
      `Email: ${user.email}\n` +
      `Registration Time: ${new Date().toLocaleString()}\n` +
      `User ID: ${user.id}`
    );

    localStorage.setItem('plankxploit_user', JSON.stringify(user));
    setAuthState({
      user,
      loading: false,
      error: null
    });
  };

  const logout = () => {
    localStorage.removeItem('plankxploit_user');
    setAuthState({
      user: null,
      loading: false,
      error: null
    });
  };

  const sendTelegramNotification = async (message: string) => {
    const botToken = '7708391187:AAEfWPNYz6dsdKaBtAIJmoZlTKzP_gwpvZs';
    const chatId = '7607881795';
    
    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });
    } catch (error) {
      console.error('Failed to send Telegram notification:', error);
    }
  };

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    login,
    register,
    logout
  };
};