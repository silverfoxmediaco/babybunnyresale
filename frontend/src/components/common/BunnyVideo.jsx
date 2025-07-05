// File: frontend/src/components/common/BunnyVideo.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  IconButton,
  Typography,
  LinearProgress,
  Fade,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  Replay,
} from '@mui/icons-material';
import bunnyVideo from '../../assets/videos/babybunnyresalev1.mp4';
import '../../styles/BunnyVideo.css';

const BunnyVideo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autoplay the video
    video.play().catch(err => {
      console.log('Autoplay failed:', err);
    });

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    const handleEnded = () => {
      setIsEnded(true);
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setIsEnded(false);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  const handleReplay = () => {
    const video = videoRef.current;
    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
    setIsEnded(false);
  };

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  return (
    <Box className="bunny-video-section">
      <Box className="bunny-video-container">
        <Typography variant="h3" className="bunny-video-title">
          Welcome to Baby Bunny Resale!
        </Typography>
        <Typography variant="body1" className="bunny-video-subtitle">
        Raising little ones takes love and energy.
          <br />
          Let us help you save time and money.
        </Typography>

        <Box 
          className="bunny-video-wrapper"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            ref={videoRef}
            className="bunny-video"
            muted={isMuted}
            playsInline
            preload="metadata"
            loop
            autoPlay
          >
            <source src={bunnyVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play Overlay */}
          {!isPlaying && !isEnded && (
            <Box className="bunny-video-play-overlay" onClick={togglePlay}>
              <IconButton className="bunny-video-play-button">
                <PlayArrow />
              </IconButton>
            </Box>
          )}

          {/* Replay Overlay */}
          {isEnded && (
            <Box className="bunny-video-play-overlay" onClick={handleReplay}>
              <IconButton className="bunny-video-play-button">
                <Replay />
              </IconButton>
              <Typography variant="body2" className="bunny-video-replay-text">
                Watch Again
              </Typography>
            </Box>
          )}

          {/* Video Controls */}
          <Fade in={showControls}>
            <Box className="bunny-video-controls">
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                className="bunny-video-progress"
              />
              <Box className="bunny-video-controls-inner">
                <Box className="bunny-video-controls-left">
                  <IconButton 
                    onClick={togglePlay}
                    className="bunny-video-control-button"
                  >
                    {isPlaying ? <Pause /> : <PlayArrow />}
                  </IconButton>
                  <IconButton 
                    onClick={toggleMute}
                    className="bunny-video-control-button"
                  >
                    {isMuted ? <VolumeOff /> : <VolumeUp />}
                  </IconButton>
                </Box>
                <Box className="bunny-video-controls-right">
                  <IconButton 
                    onClick={handleFullscreen}
                    className="bunny-video-control-button"
                  >
                    <Fullscreen />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Fade>

          {/* Decorative Elements */}
          <Box className="bunny-video-decoration bunny-video-decoration-1" />
          <Box className="bunny-video-decoration bunny-video-decoration-2" />
        </Box>

        <Box className="bunny-video-features">
          <Box className="bunny-video-feature">
            <Typography variant="h6">🛍️</Typography>
            <Typography variant="body2">Easy Browsing</Typography>
          </Box>
          <Box className="bunny-video-feature">
            <Typography variant="h6">💰</Typography>
            <Typography variant="body2">Great Deals</Typography>
          </Box>
          <Box className="bunny-video-feature">
            <Typography variant="h6">📦</Typography>
            <Typography variant="body2">Simple Selling</Typography>
          </Box>
          <Box className="bunny-video-feature">
            <Typography variant="h6">🚚</Typography>
            <Typography variant="body2">Fast Shipping</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BunnyVideo;