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
          <strong><span>Title: </span></strong>
          <span>{movie.title}</span>
        </div>
        <br></br>
        <div>
         <strong><span>Movie Description: </span></strong>
            <span>{movie.description}</span>
        </div>
        <br></br>
        <div>
            <strong><span>Genre: </span></strong>
            <span>{movie.genre}</span>
            <p>{movie.genreDescription}</p>
        </div>
        <br></br>
        <div>
        <strong><span>Director: </span></strong>
          <span>{movie.director}</span>
          <p>{movie.bio}</p>
        </div>
        <br></br>
        <div>
        <strong> <span>Actors: </span></strong>
          <ul>
            {movie.actors && movie.actors.map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>
</div>

       


        <br></br>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };
  