const PlayList = ({ songs, CSong, setCurrentSongIndex }) => {
  return (
    <div>
      <div className="ListItems">
        <h3>Available Songs</h3>
        <hr />
        <div className="List">
          {songs.map((song, index) => (
            <div
              className="item"
              key={index}
              onClick={() => setCurrentSongIndex(index)}
            >
              {/* {console.log(CSong + " + " + index)} */}
              {CSong == index ? (
                <>
                  <img src="/assets/anim.gif" alt="Song image." />
                  <h6 className="anime">{song.title}</h6>
                </>
              ) : (
                <>
                  <img src="/assets/playBack.jpg" alt="Song image." />
                  <h6>{song.title}</h6>
                </>
              )}
            </div>
          ))}
        </div>
        <br />
      </div>
    </div>
  );
};
export default PlayList;
