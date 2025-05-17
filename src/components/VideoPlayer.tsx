import React, { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

interface Comment {
  id: string;
  timestamp: number;
  text: string;
  user: string;
}

interface VideoPlayerProps {
  videoId: string;
  title: string;
}

export function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize YouTube player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '360',
        width: '640',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: (event: any) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          },
          onReady: () => {
            // Start time update interval
            setInterval(() => {
              if (playerRef.current && isPlaying) {
                setCurrentTime(playerRef.current.getCurrentTime());
              }
            }, 1000);
          },
        },
      });
    };
  }, [videoId]);

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      timestamp: currentTime,
      text: newComment,
      user: 'Current User', // Replace with actual user name
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const jumpToTimestamp = (timestamp: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(timestamp);
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div id="youtube-player" className="w-full aspect-video"></div>
      </Card>

      <Card className="p-4">
        <div className="flex gap-2 mb-4">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1"
          />
          <Button onClick={addComment}>Add Comment</Button>
        </div>

        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => jumpToTimestamp(comment.timestamp)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{comment.user}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatTime(comment.timestamp)}
                  </span>
                </div>
                <p className="text-sm">{comment.text}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
} 