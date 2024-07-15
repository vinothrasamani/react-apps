import React, { useState, useRef, useEffect } from "react";

const PlayerHome = ({
  currentSong,
  nextSong,
  prevSong,
  setSong,
  onEnded,
  playMode,
  togglePlayMode,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(0);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const progress =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(progress);
  };

  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    audioRef.current.currentTime =
      (newProgress / 100) * audioRef.current.duration;
    setProgress(newProgress);
  };

  const handleEnded = () => {
    onEnded();
  };

  const getPlayModeLabel = () => {
    switch (playMode) {
      case 0:
        return (
          <img
            src="/assets/souffle.png"
            alt="Souffle"
            onClick={togglePlayMode}
          />
        );
      case 1:
        return (
          <img
            src="/assets/repeatAll.png"
            alt="Souffle"
            onClick={togglePlayMode}
          />
        );
      case 2:
        return (
          <img
            src="/assets/repeat.png"
            alt="Souffle"
            onClick={togglePlayMode}
          />
        );
      default:
        return "Unknown";
    }
  };

  return (
    <div>
      <div className="Choose">
        <marquee behavior="scroll" direction="left">
          Choose the file which you want to play?{" "}
          <label htmlFor="song">Open!</label>
          <input
            type="file"
            name="songs"
            id="song"
            multiple
            accept="audio/*"
            onChange={setSong}
            hidden
          />
        </marquee>
      </div>
      <br />
      <div className="Contents">
        <img src="/assets/songBack.jpg" alt="Song Image" />
      </div>
      <div className="Details">
        <h3>{currentSong.title}</h3>
      </div>
      <div className="Features">
        {!isMuted ? (
          <img src="/assets/volume.png" alt="Volume" onClick={toggleMute} />
        ) : (
          <img src="/assets/noVolume.png" alt="Volume" onClick={toggleMute} />
        )}
        <i onClick={togglePlayMode}>{getPlayModeLabel()}</i>
      </div>
      <div className="SongDuration">
        <span className="CurrentTime">
          {(audioRef.current && audioRef.current.currentTime / 60 > 9
            ? (audioRef.current.currentTime / 60).toFixed(2)
            : "0" + (audioRef.current.currentTime / 60).toFixed(2)) || "00:00"}
        </span>
        <span className="TotalTime">
          {(audioRef.current && audioRef.current.duration / 60 > 9
            ? (audioRef.current.duration / 60).toFixed(2)
            : "0" + (audioRef.current.duration / 60).toFixed(2)) || "00:00"}
        </span>
      </div>
      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <div className="Progress">
        <input
          type="range"
          name="Bar"
          id="ProgressBar"
          value={progress}
          onChange={handleProgressChange}
        />
      </div>
      <div className="controlers">
        <img src="/assets/previous.png" alt="Previous" onClick={prevSong} />

        {isPlaying ? (
          <img
            src="/assets/pause.png"
            alt="play/pause"
            onClick={togglePlayPause}
          />
        ) : (
          <img
            src="/assets/play.png"
            alt="play/pause"
            onClick={togglePlayPause}
          />
        )}
        <img src="/assets/next.png" alt="next" onClick={nextSong} />
      </div>
    </div>
  );
};
export default PlayerHome;
