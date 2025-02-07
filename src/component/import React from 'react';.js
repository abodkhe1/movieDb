import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { singleMovies, castDetails } from '../reducer/moviereducer'; // Import castDetails

function Singlemoviedetails() {
  const dispatch = useDispatch();
  const { single, status, error, cast } = useSelector((state) => state.movies); // Include cast in useSelector
  const { movieId } = useParams();

  useEffect(() => {
    dispatch(singleMovies(movieId));
    dispatch(castDetails(movieId)); // Dispatch castDetails
  }, [dispatch, movieId]);

  if (status === 'loading') return <p>Loading movie details...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
  if (!single) return <p>No movie details available.</p>;

  return (
    <div>
      <h2>{single.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500/${single.poster_path}`} alt={single.title} />
      <p>{single.overview}</p>

      {/* Cast Details */}
      <h3>Cast</h3>
      {cast && cast.cast && cast.cast.length > 0 ? ( // Check if cast data exists
        <div className="cast-container"> {/* Add some styling if needed */}
          {cast.cast.map((actor) => (
            <div key={actor.id} className="actor-card"> {/* Individual actor card */}
              {actor.profile_path && ( // Check if profile_path exists
                <img
                  src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} // Adjust image size as needed
                  alt={actor.name}
                  className="actor-image"
                />
              )}
              <p className="actor-name">{actor.name}</p>
              <p className="actor-character">{actor.character}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
}

export default Singlemoviedetails;