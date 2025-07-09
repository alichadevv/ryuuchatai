import React, { useState, useEffect } from 'react';
import { Terminal, Code, Cpu, HardDrive, Wifi } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Initializing system...',
    'Loading kernel modules...',
    'Mounting file systems...',
    'Starting network services...',
    'Configuring security protocols...',
    'Establishing encrypted connections...',
    'Loading PlankXploit framework...',
    'System ready!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 375);

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-y-auto">
      {/* Matrix Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-black"></div>
        <div className="matrix-rain absolute inset-0 opacity-30"></div>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-8">
        {/* Logo */}
        <div className="mb-8">
          <div className="text-4xl font-mono font-bold text-green-400 mb-4 glitch-text">
            PlankXploit
          </div>
          <div className="text-green-300 text-sm font-mono">
            Hacker Community Platform
          </div>
        </div>

        {/* Terminal Window */}
        <div className="bg-black/90 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm">
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4 text-green-400 font-mono text-sm">
              root@plankxploit:~#
            </div>
          </div>

          <div className="text-left font-mono text-sm space-y-2">
            {steps.slice(0, currentStep + 1).map((step, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-2 ${
                  index === currentStep ? 'text-green-400' : 'text-green-600'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>{step}</span>
                {index === currentStep && (
                  <span className="animate-pulse">_</span>
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-green-400 text-sm font-mono mb-2">
              <span>Loading...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-600 to-green-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* System Info */}
          <div className="mt-4 grid grid-cols-2 gap-4 text-xs font-mono text-green-300">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4" />
              <span>CPU: Intel i7-12700K</span>
            </div>
            <div className="flex items-center space-x-2">
              <HardDrive className="w-4 h-4" />
              <span>Memory: 32GB DDR4</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4" />
              <span>Network: Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>OS: PlankOS v2.1</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .matrix-rain {
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" font-family="monospace" font-size="14" fill="%2300ff00">0101010101</text></svg>');
          background-size: 20px 20px;
          animation: matrix-fall 20s linear infinite;
        }

        @keyframes matrix-fall {
          0% { background-position: 0 -100px; }
          100% { background-position: 0 100vh; }
        }

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

export default LoadingScreen;