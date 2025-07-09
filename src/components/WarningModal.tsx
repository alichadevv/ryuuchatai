import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Warning } from '../types';

interface WarningModalProps {
  warning: Warning;
  onClose: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ warning, onClose }) => {
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-red-900/20">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-orange-600/10 animate-pulse"></div>
      </div>

      {/* Warning Content */}
      <div className="relative z-10 max-w-2xl mx-auto p-8">
        <div className="bg-black/95 border-2 border-red-500 rounded-xl p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-mono font-bold text-red-400 mb-2 glitch-text">
              ⚠️ WARNING ⚠️
            </h1>
            <p className="text-red-300 font-mono text-lg">
              SYSTEM VIOLATION DETECTED
            </p>
          </div>

          {/* Warning Message */}
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-6 mb-6">
            <div className="text-center">
              <h2 className="text-red-400 font-mono text-xl font-bold mb-4">
                ADMINISTRATIVE WARNING
              </h2>
              <div className="text-red-300 font-mono text-lg leading-relaxed whitespace-pre-wrap">
                {warning.message}
              </div>
            </div>
          </div>

          {/* Warning Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-black/50 border border-red-500/30 rounded-lg p-4">
              <h3 className="text-red-400 font-mono font-bold mb-2">Issued By:</h3>
              <p className="text-red-300 font-mono">{warning.sentBy}</p>
            </div>
            <div className="bg-black/50 border border-red-500/30 rounded-lg p-4">
              <h3 className="text-red-400 font-mono font-bold mb-2">Date & Time:</h3>
              <p className="text-red-300 font-mono">{new Date(warning.sentAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Countdown */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-2 bg-red-900/50 border border-red-500/50 rounded-lg px-6 py-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-mono font-bold">
                Auto-close in: {countdown}s
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-red-600 font-mono text-sm mb-4">
              This warning will remain on your record. Repeated violations may result in account suspension.
            </p>
            <div className="text-red-700 font-mono text-xs">
              <p>PlankXploit Security System</p>
              <p>Violation ID: {warning.id}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glitch-text {
          position: relative;
          animation: glitch 1s infinite;
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

export default WarningModal;