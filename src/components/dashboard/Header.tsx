import React from 'react';
import { Menu, LogOut, User as UserIcon, Settings, Bell } from 'lucide-react';
import { User } from '../../types';

interface HeaderProps {
  user: User;
  onMenuClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onMenuClick, onLogout }) => {
  return (
    <header className="bg-black/90 border-b border-green-500/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="ml-4">
              <h1 className="text-xl font-mono font-bold text-green-400 glitch-text">
                PlankXploit
              </h1>
              <p className="text-xs text-green-600">Community Platform</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-green-400 font-mono text-sm">{user.username}</p>
                <p className="text-green-600 text-xs">{user.status}</p>
              </div>
              
              <div className="relative">
                <img
                  src={user.avatar || "https://files.catbox.moe/hf13r2.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-green-500/50"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
              </div>

              <button
                onClick={onLogout}
                className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
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
      `}</style>
    </header>
  );
};

export default Header;