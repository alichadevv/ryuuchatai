import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { MessageSquare, Users, Phone, Camera, Shield } from 'lucide-react';

interface MainContentProps {
  user: User;
  onSectionChange: (section: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ user, onSectionChange }) => {
  const [typingText, setTypingText] = useState('');
  const fullText = 'CUKUP DAN GAUSAH ANEH²';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypingText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        currentIndex = 0;
        setTypingText('');
      }
    }, 200);

    return () => clearInterval(typingInterval);
  }, []);

  const features = [
    {
      id: 'chat',
      icon: MessageSquare,
      title: 'Chat Group',
      description: 'Join live group conversations',
      color: 'from-blue-600 to-blue-800',
      hoverColor: 'hover:from-blue-700 hover:to-blue-900'
    },
    {
      id: 'private-chat',
      icon: Users,
      title: 'Private Message',
      description: 'Send direct messages',
      color: 'from-purple-600 to-purple-800',
      hoverColor: 'hover:from-purple-700 hover:to-purple-900'
    },
    {
      id: 'voice-call',
      icon: Phone,
      title: 'Voice Call',
      description: 'Make voice calls',
      color: 'from-green-600 to-green-800',
      hoverColor: 'hover:from-green-700 hover:to-green-900'
    },
    {
      id: 'video-call',
      icon: Camera,
      title: 'Video Call',
      description: 'Start video conversations',
      color: 'from-red-600 to-red-800',
      hoverColor: 'hover:from-red-700 hover:to-red-900'
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto overflow-y-auto max-h-[calc(100vh-100px)]">
      {/* Profile Section */}
      <div className="text-center mb-12">
        <div className="mb-6">
          <img
            src="https://files.catbox.moe/hla7hv.jpg"
            alt="RyuuIzumi"
            className="w-32 h-32 rounded-full mx-auto border-4 border-green-500/50 shadow-lg"
          />
        </div>
        
        <div className="mb-4">
          <h1 className="text-3xl font-mono font-bold text-green-400 glitch-text mb-2">
            RyuuIzumi Chat
          </h1>
          <div className="text-green-300 font-mono text-lg h-8">
            <span className="typing-animation">{typingText}</span>
            <span className="animate-pulse">|</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => onSectionChange(feature.id)}
            className={`bg-gradient-to-r ${feature.color} ${feature.hoverColor} p-6 rounded-xl border border-green-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
          >
            <div className="flex items-center space-x-4">
              <feature.icon className="w-8 h-8 text-white" />
              <div className="text-left">
                <h3 className="text-white font-mono text-lg font-bold">{feature.title}</h3>
                <p className="text-gray-200 text-sm">{feature.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Contact Support */}
      <div className="bg-black/90 border border-green-500/30 rounded-xl p-8 mb-8">
        <h3 className="text-green-400 font-mono text-xl font-bold mb-6 text-center">
          Contact Support
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://wa.me/6281387796894"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors flex items-center space-x-3"
          >
            <span className="text-xl">📱</span>
            <span className="font-mono">WhatsApp</span>
          </a>
          
          <a
            href="https://whatsapp.com/channel/0029VaxdW8SL2ATwTdA6Ty1d"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors flex items-center space-x-3"
          >
            <span className="text-xl">📢</span>
            <span className="font-mono">Channel</span>
          </a>
          
          <a
            href="https://www.instagram.com/xydlanlux?igsh=OHlhcWo5YnZiNTgz"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-lg transition-colors flex items-center space-x-3"
          >
            <span className="text-xl">📷</span>
            <span className="font-mono">Instagram</span>
          </a>
          
          <a
            href="https://www.tiktok.com/@xarenarenata?_t=ZS-8tytCC9w0U3&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:bg-gray-800 text-white p-4 rounded-lg transition-colors flex items-center space-x-3"
          >
            <span className="text-xl">🎵</span>
            <span className="font-mono">TikTok</span>
          </a>
          
          <a
            href="https://xydlanlux.biz.id"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors flex items-center space-x-3"
          >
            <span className="text-xl">🌐</span>
            <span className="font-mono">Website</span>
          </a>
        </div>
      </div>

      {/* Developer Info */}
      <div className="text-center text-green-400 font-mono">
        <h4 className="text-lg font-bold mb-2">Pengembang</h4>
        <p className="text-green-300">• RyuuIzumi (Creator)</p>
      </div>

      <style jsx>{`
        .glitch-text {
          position: relative;
          animation: glitch 3s infinite;
        }

        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-1px, 1px); }
          20% { transform: translate(1px, -1px); }
          30% { transform: translate(-1px, -1px); }
          40% { transform: translate(1px, 1px); }
          50% { transform: translate(-1px, 1px); }
          60% { transform: translate(1px, -1px); }
          70% { transform: translate(-1px, -1px); }
          80% { transform: translate(1px, 1px); }
          90% { transform: translate(-1px, 1px); }
        }

        .typing-animation {
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default MainContent;