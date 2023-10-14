import { useEffect } from 'react';
import { useState } from 'react';

const useVideoPlayer = (videoRef) => {
  const [videoPlayerState, setVideoPlayerState] = useState({
    playing: false,
    percentage: 0,
    volume: 1,
    currentTime: 0,
  });

  const togglePlayingState = () => {
    setVideoPlayerState((prev) => ({ ...prev, playing: !prev.playing }));
  };

  const updateVideoTime = () => {
    const currentPercentage =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;

    setVideoPlayerState((prev) => ({
      ...prev,
      percentage: currentPercentage,
      currentTime: videoRef.current.currentTime,
      duration: videoRef.current.duration,
    }));
  };

  const toggleVideoTime = (e) => {
    const videoTime = e;

    videoRef.current.currentTime =
      (videoRef.current.duration / 100) * videoTime;

    setVideoPlayerState((prev) => ({
      ...prev,
      percentage: videoTime,
    }));
  };

  const toggleVolume = (e) => {
    const volume = e;
    videoRef.current.volume = volume;

    setVideoPlayerState((prev) => ({
      ...prev,
      volume: volume,
    }));
  };

  const toggleFullScreen = () => {
    videoRef.current.requestFullscreen();
  };

  useEffect(() => {
    if (videoPlayerState.playing) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [videoPlayerState.playing, videoRef]);

  return {
    videoPlayerState,
    togglePlayingState,
    updateVideoTime,
    toggleVideoTime,
    toggleFullScreen,
    toggleVolume,
  };
};

export default useVideoPlayer;
