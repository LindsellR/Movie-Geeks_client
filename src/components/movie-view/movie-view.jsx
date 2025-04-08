export const MovieView = ({ movie, onBackClick }) => {
  console.log("Movie recieved by MovieView:", movie)
    return (
      <div>
        <div>
          <img src={movie.image}
          alt={movie.title} 
          style={{ width: '200px', height: 'auto' }}
          />
        </div>
        <br></br>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <br></br>
        <div>
            <span>Genre: </span>
            {movie.genre}
        </div>
        <br></br>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
        <br></br>
        <div>
            <span>Description: </span>
            <span>{movie.description}</span>
        </div>
        <br></br>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };
  