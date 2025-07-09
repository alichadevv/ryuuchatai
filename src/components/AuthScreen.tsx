import React, { useState } from 'react';
import { User, Lock, Mail, UserPlus, LogIn, Eye, EyeOff } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthScreenProps {
  onLogin: (user: UserType) => void;
  onRegister: (user: UserType) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simulate login
      const user: UserType = {
        id: Date.now().toString(),
        username: formData.username,
        email: formData.email,
        isAdmin: formData.username === 'admin' || formData.username === 'PlankDev',
        isSuperAdmin: formData.username === 'PlankDev',
        isBanned: false,
        joinedAt: new Date(),
        lastSeen: new Date(),
        status: 'online',
        blockedUsers: [],
        warnings: []
      };
      onLogin(user);
    } else {
      // Simulate registration
      if (formData.password !== formData.confirmPassword) {
        alert('Password tidak cocok!');
        return;
      }
      
      const user: UserType = {
        id: Date.now().toString(),
        username: formData.username,
        email: formData.email,
        isAdmin: false,
        isSuperAdmin: false,
        isBanned: false,
        joinedAt: new Date(),
        lastSeen: new Date(),
        status: 'online',
        blockedUsers: [],
        warnings: []
      };
      onRegister(user);
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
        <source src="https://files.catbox.moe/p02695.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-md mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl font-mono font-bold text-green-400 mb-4 glitch-text">
            PlankXploit
          </div>
          <div className="text-green-300 text-lg font-mono">
            {isLogin ? 'Access Terminal' : 'Create Account'}
          </div>
        </div>

        {/* Auth Form */}
        <div className="bg-black/90 border border-green-500/30 rounded-lg p-8 backdrop-blur-sm">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 font-mono text-sm rounded-l-lg transition-colors ${
                isLogin 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-800 text-green-400 hover:bg-gray-700'
              }`}
            >
              <LogIn className="w-4 h-4 inline mr-2" />
              LOGIN
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 font-mono text-sm rounded-r-lg transition-colors ${
                !isLogin 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-800 text-green-400 hover:bg-gray-700'
              }`}
            >
              <UserPlus className="w-4 h-4 inline mr-2" />
              REGISTER
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-green-400 font-mono text-sm flex items-center">
                <User className="w-4 h-4 mr-2" />
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full bg-black/50 border border-green-500/50 rounded-lg px-4 py-3 text-green-300 font-mono focus:outline-none focus:border-green-400"
                placeholder="Enter username"
                required
              />
            </div>

            {/* Email (for registration) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-green-400 font-mono text-sm flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/50 border border-green-500/50 rounded-lg px-4 py-3 text-green-300 font-mono focus:outline-none focus:border-green-400"
                  placeholder="Enter email"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Password */}
            <div className="space-y-2">
              <label className="text-green-400 font-mono text-sm flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-black/50 border border-green-500/50 rounded-lg px-4 py-3 text-green-300 font-mono focus:outline-none focus:border-green-400 pr-12"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (for registration) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-green-400 font-mono text-sm flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full bg-black/50 border border-green-500/50 rounded-lg px-4 py-3 text-green-300 font-mono focus:outline-none focus:border-green-400"
                  placeholder="Confirm password"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-mono text-lg px-6 py-3 rounded-lg transition-colors duration-300 transform hover:scale-105"
            >
              {isLogin ? 'ACCESS GRANTED' : 'CREATE ACCOUNT'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-green-400 font-mono text-sm">
            <p>Welcome to the PlankXploit Network</p>
            <p className="text-xs mt-2 text-green-600">
              Secure • Encrypted • Anonymous
            </p>
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
      `}</style>
    </div>
  );
};

export default AuthScreen;