import { useCallback } from 'react';

export const useSound = () => {
  const playWelcomeSound = useCallback(() => {
    // Create welcome message audio
    const welcomeMessages = [
      "Hallo bro gua RyuuIzumi",
      "Saya adalah AI, siap bantu anda dengan benae",
      "ini adalah chat ai, jangan sembarangan!",
      "inget bro saat lu make fitur ini di website gua, itu bakal terdetecksi, dan terpantau di server gua!",
      "jadi gunakan dengan bijak!",
      "Dan jaga nama harga diri gua, jangan persebarkan key nya!",
      "kalo lu ketauan nyebar, lu bakal kena sanksi dari gua",
      "Thanks!"
    ];

    let currentIndex = 0;
    
    const playNext = () => {
      if (currentIndex < welcomeMessages.length) {
        const utterance = new SpeechSynthesisUtterance(welcomeMessages[currentIndex]);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;
        
        // Try to use a male voice
        const voices = speechSynthesis.getVoices();
        const maleVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('male') || 
          voice.name.toLowerCase().includes('david') ||
          voice.name.toLowerCase().includes('alex')
        );
        
        if (maleVoice) {
          utterance.voice = maleVoice;
        }
        
        utterance.onend = () => {
          currentIndex++;
          if (currentIndex < welcomeMessages.length) {
            setTimeout(playNext, 500); // Short pause between messages
          }
        };
        
        speechSynthesis.speak(utterance);
      }
    };

    // Start playing messages
    playNext();
  }, []);

  const playBackgroundMusic = useCallback(() => {
    // Create background music audio element
    const audio = document.createElement('audio');
    audio.src = 'https://qu.ax/wVytQ.mp3';
    audio.loop = true;
    audio.volume = 0.3;
    audio.id = 'backgroundMusic';
    
    // Remove existing background music if any
    const existingAudio = document.getElementById('backgroundMusic');
    if (existingAudio) {
      existingAudio.remove();
    }
    
    document.body.appendChild(audio);
    
    // Play the audio
    audio.play().catch(error => {
      console.log('Could not play background music:', error);
    });
  }, []);

  return {
    playWelcomeSound,
    playBackgroundMusic
  };
};