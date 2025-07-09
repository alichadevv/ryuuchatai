import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import VerificationScreen from './components/VerificationScreen';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import { User, AuthState } from './types';
import { useAuth } from './hooks/useAuth';
import { useSound } from './hooks/useSound';

function App() {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [keyValid, setKeyValid] = useState(false);
  const { user, login, register, logout } = useAuth();
  const { playWelcomeSound, playBackgroundMusic } = useSound();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
      if (!verified) {
        playWelcomeSound();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [verified, playWelcomeSound]);

  useEffect(() => {
    if (verified && keyValid && !user) {
      playBackgroundMusic();
    }
  }, [verified, keyValid, user, playBackgroundMusic]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!verified || !keyValid) {
    return (
      <VerificationScreen 
        onVerified={() => setVerified(true)}
        onKeyValid={() => setKeyValid(true)}
        verified={verified}
        keyValid={keyValid}
      />
    );
  }

  if (!user) {
    return <AuthScreen onLogin={login} onRegister={register} />;
  }

  return <Dashboard user={user} onLogout={logout} />;
}

export default App;