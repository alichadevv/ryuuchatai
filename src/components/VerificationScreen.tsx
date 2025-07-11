import React, { useState, useEffect } from 'react';
import { Check, ExternalLink, Key, Shield } from 'lucide-react';
import { VerificationState } from '../types';

interface VerificationScreenProps {
  onVerified: () => void;
  onKeyValid: () => void;
  verified: boolean;
  keyValid: boolean;
}

const VerificationScreen: React.FC<VerificationScreenProps> = ({
  onVerified,
  onKeyValid,
  verified,
  keyValid
}) => {
  const [verificationState, setVerificationState] = useState<VerificationState>({
    whatsapp1: false,
    youtube: false
  });

  const [showKey, setShowKey] = useState(false);
  const [keyCountdown, setKeyCountdown] = useState(20);
  const [inputKey, setInputKey] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');

  const socialLinks = [
    {
      name: 'WhatsApp Channel 1',
      key: 'whatsapp1' as keyof VerificationState,
      url: 'https://whatsapp.com/channel/0029VaxdW8SL2ATwTdA6Ty1d',
      color: 'bg-green-600 hover:bg-green-700',
      icon: '📱'
    },
    {
      name: 'Subscribe Channel YouTube 2',
      key: 'youtube' as keyof VerificationState,
      url: 'https://youtube.com/@alichaicha_id',
      color: 'bg-green-600 hover:bg-green-700',
      icon: '📱'
    }
  ];

  const handleSocialClick = (key: keyof VerificationState, url: string) => {
    window.open(url, '_blank');
    setVerificationState(prev => ({ ...prev, [key]: true }));
  };

  const generateKey = () => {
    const keys = [
      'RYU-X7K9-M4R2-N8Q1',
      'RYUUIZUMI-3R2Z-B9X7-K5M1',
      'RYUGANTENG-W8J4-P6L3-V9R2',
      'RYUAJA-Q2K8-H7N4-X1B9',
      'RYUUU-R6M3-Z9K7-P4L1',
      'RYUUUU-T8X2-J5Q9-N3M7'
    ];
    return keys[Math.floor(Math.random() * keys.length)];
  };

  useEffect(() => {
    const allVerified = Object.values(verificationState).every(Boolean);
    if (allVerified && !showKey) {
      onVerified();
      const key = generateKey();
      setGeneratedKey(key);
      setShowKey(true);
      setKeyCountdown(60);
    }
  }, [verificationState, showKey, onVerified]);

  useEffect(() => {
    if (showKey && keyCountdown > 0) {
      const timer = setTimeout(() => {
        setKeyCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (keyCountdown === 0) {
      setShowKey(false);
    }
  }, [showKey, keyCountdown]);

  const handleExecute = () => {
    if (inputKey === generatedKey) {
      onKeyValid();
    } else {
      alert('Key salah! Silakan ulangi verifikasi.');
      setVerificationState({
        whatsapp1: false,
        youtube: false
      });
      setInputKey('');
      setShowKey(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-y-auto">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src="https://files.catbox.moe/0zrf92.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl font-mono font-bold text-green-400 mb-4 glitch-text">
            RyuuIzumi
          </div>
          <div className="text-green-300 text-xl font-mono">
            Security Verification Required
          </div>
        </div>

        {/* Verification Panel */}
        <div className="bg-black/90 border border-green-500/30 rounded-lg p-8 backdrop-blur-sm">
          <div className="flex items-center mb-8">
            <Shield className="w-8 h-8 text-green-400 mr-3" />
            <h2 className="text-2xl font-mono text-green-400">
              Follow All Social Media Accounts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {socialLinks.map((social) => (
              <button
                key={social.key}
                onClick={() => handleSocialClick(social.key, social.url)}
                className={`${social.color} text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-between`}
              >
                <span className="flex items-center">
                  <span className="mr-3 text-xl">{social.icon}</span>
                  {social.name}
                </span>
                <div className="flex items-center space-x-2">
                  {verificationState[social.key] && (
                    <Check className="w-5 h-5 text-green-400" />
                  )}
                  <ExternalLink className="w-5 h-5" />
                </div>
              </button>
            ))}
          </div>

          {/* Key Display */}
          {showKey && (
            <div className="mb-6 p-6 bg-green-900/20 border border-green-500/50 rounded-lg">
              <div className="text-center">
                <div className="text-green-400 font-mono text-lg mb-2">
                  🔑 Your Access Key:
                </div>
                <div className="text-2xl font-mono font-bold text-green-300 mb-4 bubble-animation">
                  {generatedKey}
                </div>
                <div className="text-red-400 font-mono">
                  Key expires in: {keyCountdown}s
                </div>
              </div>
            </div>
          )}

          {/* Key Input */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Key className="w-6 h-6 text-green-400 mr-3" />
              <label className="text-green-400 font-mono text-lg">
                Enter Access Key:
              </label>
            </div>
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full bg-black/50 border border-green-500/50 rounded-lg px-4 py-3 text-green-300 font-mono focus:outline-none focus:border-green-400"
              placeholder="XXXX-XXXX-XXXX-XXXX"
            />
            <button
              onClick={handleExecute}
              disabled={!inputKey}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-mono text-lg px-6 py-3 rounded-lg transition-colors duration-300"
            >
              EXECUTE
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glitch-text {
          position: relative;
          animation: glitch 2s infinite;
        }

        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-2px, 2px); }
          20% { transform: translate(2px, -2px); }
          30% { transform: translate(-2px, -2px); }
          40% { transform: translate(2px, 2px); }
          50% { transform: translate(-2px, 2px); }
          60% { transform: translate(2px, -2px); }
          70% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
          90% { transform: translate(-2px, 2px); }
        }

        .bubble-animation {
          animation: bubble 2s infinite;
        }

        @keyframes bubble {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default VerificationScreen;