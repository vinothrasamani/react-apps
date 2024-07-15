import "./App.css";
import React, { useState } from "react";
import PlayerHome from "./Components/PlayerHome";
import PlayList from "./Components/PlayList";

function App() {
  let [songs, setSongs] = useState([
    { title: "Jai Hanuman", src: "/assets/songs/Jai Hanuman.mp3" },
    {
      title: "Arash feat. Helena - One Night In Dubai",
      src: "/assets/songs/Arash feat. Helena - One Night In Dubai.mp3",
    },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playMode, setPlayMode] = useState(0);

  const nextSong = () => {
    if (playMode === 2) {
      setCurrentSongIndex(currentSongIndex);
    } else if (playMode === 0) {
      setCurrentSongIndex(Math.floor(Math.random() * songs.length));
    } else {
      setCurrentSongIndex((prevIndex) =>
        prevIndex === songs.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  const handleEnded = () => {
    if (playMode === 1 || playMode === 0) {
      nextSong();
    }
  };

  const togglePlayMode = () => {
    setPlayMode((prevMode) => (prevMode + 1) % 3);
  };

  let Update = (e) => {
    let fileList = e.target.files;
    const newItems = [];
    for (let k = 0; k < fileList.length; k++) {
      const url = URL.createObjectURL(fileList[k]);
      const newItem = {
        title: fileList[k].name,
        src: url,
      };
      newItems.push(newItem);
    }
    setSongs([...songs, ...newItems]);
    console.log(songs);
  };

  return (
    <>
      <div className="Home">
        <div className="PlayerHome">
          <PlayerHome
            currentSong={songs[currentSongIndex]}
            nextSong={nextSong}
            prevSong={prevSong}
            setSong={Update}
            onEnded={handleEnded}
            playMode={playMode}
            togglePlayMode={togglePlayMode}
          />
        </div>
        <div className="PlayList">
          <PlayList
            songs={songs}
            CSong={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
          />
        </div>
      </div>
    </>
  );
}

export default App;
