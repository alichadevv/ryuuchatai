import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, X } from 'lucide-react';

const Content: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [backgroundMusicPaused, setBackgroundMusicPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videos = [
    {
      id: '1',
      url: 'https://files.catbox.moe/73h8it.mp4',
      title: 'PlankXploit Demo 1',
      description: 'Advanced penetration testing demonstration'
    },
    {
      id: '2',
      url: 'https://files.catbox.moe/pzsila.mp4',
      title: 'PlankXploit Demo 2',
      description: 'Network security analysis tools'
    },
    {
      id: '3',
      url: 'https://files.catbox.moe/u63jlv.mp4',
      title: 'PlankXploit Demo 3',
      description: 'Vulnerability assessment showcase'
    },
    {
      id: '4',
      url: 'https://files.catbox.moe/kwqkt2.mp4',
      title: 'PlankXploit Demo 4',
      description: 'Exploitation framework tutorial'
    },
    {
      id: '5',
      url: 'https://files.catbox.moe/u4q8mf.mp4',
      title: 'PlankXploit Demo 5',
      description: 'Security testing methodologies'
    }
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('play', () => {
        setIsPlaying(true);
        setBackgroundMusicPaused(true);
        // Pause background music when video plays
        const backgroundAudio = document.getElementById('backgroundMusic') as HTMLAudioElement;
        if (backgroundAudio) {
          backgroundAudio.pause();
        }
      });

      video.addEventListener('pause', () => {
        setIsPlaying(false);
        setBackgroundMusicPaused(false);
        // Resume background music when video pauses
        const backgroundAudio = document.getElementById('backgroundMusic') as HTMLAudioElement;
        if (backgroundAudio) {
          backgroundAudio.play();
        }
      });

      video.addEventListener('ended', () => {
        setIsPlaying(false);
        setBackgroundMusicPaused(false);
        // Resume background music when video ends
        const backgroundAudio = document.getElementById('backgroundMusic') as HTMLAudioElement;
        if (backgroundAudio) {
          backgroundAudio.play();
        }
      });
    }
  }, [currentVideo]);

  const handleVideoClick = (videoUrl: string) => {
    setCurrentVideo(videoUrl);
  };

  const closeVideo = () => {
    setCurrentVideo(null);
    setIsPlaying(false);
    setBackgroundMusicPaused(false);
    // Resume background music when video is closed
    const backgroundAudio = document.getElementById('backgroundMusic') as HTMLAudioElement;
    if (backgroundAudio) {
      backgroundAudio.play();
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto overflow-y-auto max-h-[calc(100vh-100px)]">
      <div className="bg-black/90 border border-green-500/30 rounded-xl p-8 backdrop-blur-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <Play className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-mono font-bold text-green-400 mb-2">
            Content Gallery
          </h2>
          <p className="text-green-600 font-mono">
            PlankXploit Demo Videos & Content
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-black/50 border border-green-500/30 rounded-lg overflow-hidden hover:border-green-400 transition-colors cursor-pointer"
              onClick={() => handleVideoClick(video.url)}
            >
              <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                <Play className="w-12 h-12 text-green-400 hover:text-green-300 transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-4">
                <h3 className="text-green-400 font-mono font-bold mb-2">{video.title}</h3>
                <p className="text-green-600 text-sm">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {currentVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="relative max-w-4xl w-full mx-4">
              <button
                onClick={closeVideo}
                className="absolute -top-12 right-0 text-white hover:text-green-400 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="relative">
                <video
                  ref={videoRef}
                  src={currentVideo}
                  className="w-full aspect-video bg-black"
                  controls={false}
                  autoPlay
                />
                
                {/* Custom Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-green-400 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-green-400 transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                    
                    <div className="flex-1"></div>
                    
                    <button
                      onClick={() => videoRef.current?.requestFullscreen()}
                      className="text-white hover:text-green-400 transition-colors"
                    >
                      <Maximize className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-green-600 font-mono text-sm">
            Click on any video to watch. Background music will automatically pause during playback.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;