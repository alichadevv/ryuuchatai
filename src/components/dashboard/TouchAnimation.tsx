import React, { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

const TouchAnimation: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newParticles: Particle[] = [];
      
      // Create multiple particles at click position
      for (let i = 0; i < 5; i++) {
        const particle: Particle = {
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          scale: 1
        };
        newParticles.push(particle);
      }
      
      setParticles(prev => [...prev, ...newParticles]);
      
      // Remove particles after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      }, 2000);
    };

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        const newParticles: Particle[] = [];
        
        for (let i = 0; i < 5; i++) {
          const particle: Particle = {
            id: Date.now() + i,
            x: touch.clientX,
            y: touch.clientY,
            opacity: 1,
            scale: 1
          };
          newParticles.push(particle);
        }
        
        setParticles(prev => [...prev, ...newParticles]);
        
        setTimeout(() => {
          setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
        }, 2000);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('touchstart', handleTouch);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle, index) => (
        <div
          key={particle.id}
          className="absolute text-green-400 font-mono font-bold text-lg select-none animate-ping"
          style={{
            left: particle.x - 50 + (index * 20),
            top: particle.y - 25 + (index * 15),
            animation: `sparkle 2s ease-out forwards`,
            animationDelay: `${index * 0.1}s`
          }}
        >
          PLANK DEV
        </div>
      ))}
      
      <style jsx>{`
        @keyframes sparkle {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2) translateY(-20px);
          }
          100% {
            opacity: 0;
            transform: scale(0.5) translateY(-50px);
          }
        }
      `}</style>
    </div>
  );
};

export default TouchAnimation;