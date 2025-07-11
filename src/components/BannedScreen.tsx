import React, { useState } from 'react';
import { Ban, Send, AlertTriangle } from 'lucide-react';
import { User, UnbanRequest } from '../types';

interface BannedScreenProps {
  user: User;
}

const BannedScreen: React.FC<BannedScreenProps> = ({ user }) => {
  const [unbanMessage, setUnbanMessage] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  const sendTelegramNotification = async (message: string) => {
    const botToken = '7798008427:AAG0MVYk_RVjTDnTmVkYrKVN88B8e_UCZ3U';
    const chatId = '7277892050';
    
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

  const handleUnbanRequest = async () => {
    if (!unbanMessage.trim()) return;

    const request: UnbanRequest = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      message: unbanMessage,
      violation: user.banReason || 'Unknown violation',
      requestedAt: new Date(),
      status: 'pending'
    };

    // Save to localStorage
    const existingRequests = JSON.parse(localStorage.getItem('ryuuizumi_unban_requests') || '[]');
    existingRequests.push(request);
    localStorage.setItem('ryuuizumi_unban_requests', JSON.stringify(existingRequests));

    // Send Telegram notification
    await sendTelegramNotification(
      `📝 <b>New Unban Request</b>\n` +
      `Username: ${user.username}\n` +
      `Email: ${user.email}\n` +
      `Original Violation: ${user.banReason}\n` +
      `Banned At: ${user.bannedAt ? new Date(user.bannedAt).toLocaleString() : 'Unknown'}\n` +
      `Banned By: ${user.bannedBy || 'System'}\n` +
      `Request Message: ${unbanMessage}\n` +
      `Requested At: ${new Date().toLocaleString()}`
    );

    setRequestSent(true);
    setUnbanMessage('');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-y-auto">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      >
        <source src="https://files.catbox.moe/0zrf92.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-8">
        <div className="bg-black/90 border-2 border-red-500 rounded-xl p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ban className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-mono font-bold text-red-400 mb-2 glitch-text">
              ACCOUNT BANNED
            </h1>
            <p className="text-red-300 font-mono text-lg">
              Your access has been restricted
            </p>
          </div>

          {/* Ban Details */}
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-red-400 font-mono font-bold mb-2">Username:</h3>
                <p className="text-red-300 font-mono">{user.username}</p>
              </div>
              <div>
                <h3 className="text-red-400 font-mono font-bold mb-2">Email:</h3>
                <p className="text-red-300 font-mono">{user.email}</p>
              </div>
              <div>
                <h3 className="text-red-400 font-mono font-bold mb-2">Ban Reason:</h3>
                <p className="text-red-300 font-mono">{user.banReason || 'Violation of terms'}</p>
              </div>
              <div>
                <h3 className="text-red-400 font-mono font-bold mb-2">Banned By:</h3>
                <p className="text-red-300 font-mono">{user.bannedBy || 'System'}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-red-400 font-mono font-bold mb-2">Ban Date:</h3>
                <p className="text-red-300 font-mono">
                  {user.bannedAt ? new Date(user.bannedAt).toLocaleString() : 'Unknown'}
                </p>
              </div>
            </div>
          </div>

          {/* Unban Request */}
          {!requestSent ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <h2 className="text-yellow-400 font-mono font-bold text-lg">
                  Request Account Unban
                </h2>
              </div>
              
              <textarea
                value={unbanMessage}
                onChange={(e) => setUnbanMessage(e.target.value)}
                className="w-full h-32 px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400 resize-none"
                placeholder="Explain why you should be unbanned and acknowledge your violation..."
              />
              
              <button
                onClick={handleUnbanRequest}
                disabled={!unbanMessage.trim()}
                className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white font-mono text-lg px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Submit Unban Request</span>
              </button>
            </div>
          ) : (
            <div className="text-center p-6 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-green-400 font-mono font-bold text-xl mb-2">
                Request Submitted
              </h3>
              <p className="text-green-300 font-mono">
                Your unban request has been sent to the administrators. 
                You will be notified of the decision via email.
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-red-600 font-mono text-sm">
            <p>For immediate assistance, contact support:</p>
            <p className="mt-1">WhatsApp: +62 0813-8779-6894</p>
            <p>Email: fadlanmods@gmail.com</p>
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

export default BannedScreen;