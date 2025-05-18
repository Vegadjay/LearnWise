import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Play, Pause, Volume2, VolumeX, MessageSquare, ThumbsUp, Share2 } from 'lucide-react';

// Declare the YT global variable for TypeScript
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface Comment {
  id: string;
  timestamp: number;
  text: string;
  user: string;
  likes: number;
}

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description?: string;
}

export function VideoPlayer({ videoId, title, description = "An interactive video with timestamped comments" }: VideoPlayerProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const timeIntervalRef = useRef<number | null>(null);
  const [username, setUsername] = useState('Guest User');
  const [isMuted, setIsMuted] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
      setPlayerReady(false);
      
      // Clear the interval if it exists
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
        timeIntervalRef.current = null;
      }
    }
    
    try {
      const userId = localStorage.getItem('userProfile');
      if (userId) {
        const parsedProfile = JSON.parse(userId);
        setUsername(parsedProfile.name || 'Guest User');
      }
    } catch (error) {
      console.error("Error parsing user profile:", error);
    }

    // Only load the API if it hasn't been loaded already
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Initialize YouTube player when API is ready
    const initializePlayer = () => {
      if (window.YT && window.YT.Player && document.getElementById('youtube-player')) {
        playerRef.current = new window.YT.Player('youtube-player', {
          height: '360',
          width: '640',
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            modestbranding: 1,
            controls: 0, // Hide default controls
            showinfo: 0,
            rel: 0,
          },
          events: {
            onStateChange: (event: any) => {
              setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
            },
            onReady: (event: any) => {
              setPlayerReady(true);
              setVideoDuration(playerRef.current.getDuration());
              
              // Set up time tracking interval
              if (timeIntervalRef.current) {
                clearInterval(timeIntervalRef.current);
              }
              
              timeIntervalRef.current = window.setInterval(() => {
                if (playerRef.current && playerRef.current.getCurrentTime) {
                  try {
                    const time = playerRef.current.getCurrentTime();
                    setCurrentTime(time);
                  } catch (error) {
                    console.error("Error getting current time:", error);
                  }
                }
              }, 1000) as unknown as number;
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      // Set up global callback for when YouTube API is ready
      window.onYouTubeIframeAPIReady = initializePlayer;
    }

    // Clean up on unmount
    return () => {
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const togglePlay = () => {
    if (!playerReady) return;
    
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (error) {
      console.error("Error toggling play state:", error);
    }
  };

  const toggleMute = () => {
    if (!playerReady) return;
    
    try {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    } catch (error) {
      console.error("Error toggling mute state:", error);
    }
  };

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      timestamp: currentTime,
      text: newComment,
      user: username,
      likes: 0
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const likeComment = (id: string) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const jumpToTimestamp = (timestamp: number) => {
    if (playerRef.current && playerReady) {
      try {
        playerRef.current.seekTo(timestamp);
        playerRef.current.playVideo();
      } catch (error) {
        console.error("Error jumping to timestamp:", error);
      }
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerReady || !videoDuration) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const seekTime = videoDuration * clickPosition;
    
    jumpToTimestamp(seekTime);
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    
    if (!isFullscreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-2"
      >
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </motion.div>

      <motion.div 
        ref={videoContainerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="rounded-lg overflow-hidden shadow-xl bg-black"
      >
        {/* Video Container */}
        <div className="relative">
          <div className="w-full aspect-video">
            <div id="youtube-player" className="w-full h-full"></div>
          </div>

          {/* Custom Controls Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
            {/* Progress bar */}
            <div 
              className="h-1 bg-gray-700 mx-4 mb-2 cursor-pointer rounded-full overflow-hidden"
              onClick={handleProgressBarClick}
            >
              <motion.div 
                className="h-full bg-red-500"
                style={{ 
                  width: videoDuration ? `${(currentTime / videoDuration) * 100}%` : '0%'
                }}
              />
            </div>
            
            {/* Controls */}
            <div className="px-4 pb-4 flex justify-between items-center">
              <div className="flex space-x-4 items-center">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="text-white bg-red-500 hover:bg-red-600 rounded-full p-2 transition-colors"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  className="text-white hover:text-red-400 transition-colors"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </motion.button>
                
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(videoDuration)}
                </span>
              </div>
              
              <div className="flex space-x-4 items-center">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowComments(!showComments)}
                  className={`text-white transition-colors ${showComments ? 'text-red-400' : ''}`}
                >
                  <MessageSquare size={20} />
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleFullscreen}
                  className="text-white hover:text-red-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
                    <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
                    <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
                    <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 shadow-lg border-t-4 border-red-500">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment at current timestamp..."
                  className="flex-1 border-gray-300"
                />
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={addComment}
                    className="bg-red-500 hover:bg-red-600 text-white w-full md:w-auto transition-colors"
                  >
                    Comment at {formatTime(currentTime)}
                  </Button>
                </motion.div>
              </div>

              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-red-500" />
                Comments
              </h3>

              <ScrollArea className="h-80 pr-4">
                <div className="space-y-4">
                  {comments.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No comments yet</p>
                      <p className="text-sm text-gray-400 mt-2">Be the first to add a timestamp comment!</p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white font-bold">
                              {comment.user.charAt(0).toUpperCase()}
                            </div>
                            <span>{comment.user}</span>
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => jumpToTimestamp(comment.timestamp)}
                            className="text-sm bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 px-2 py-1 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                          >
                            {formatTime(comment.timestamp)}
                          </motion.button>
                        </div>
                        <p className="text-sm my-2">{comment.text}</p>
                        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <motion.button 
                              whileTap={{ scale: 0.9 }}
                              onClick={() => likeComment(comment.id)}
                              className="flex items-center gap-1 hover:text-red-500 transition-colors"
                            >
                              <ThumbsUp size={14} />
                              <span>{comment.likes}</span>
                            </motion.button>
                          </div>
                          <motion.button 
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                          >
                            <Share2 size={14} />
                            <span>Share</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}