import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { singleMovies, castDetails } from '../reducer/moviereducer'; 
import "./single.css";

function Singlemoviedetails() {
  const dispatch = useDispatch();
  const { single, status, error, cast } = useSelector((state) => state.movies); 
  const { movieId } = useParams();

  useEffect(() => {
    dispatch(singleMovies(movieId));
    dispatch(castDetails(movieId));
  }, [dispatch, movieId]);

  if (status === 'loading') return <p>Loading movie details...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
  if (!single) return <p>No movie details available.</p>;
  // console.log(single);



  return (

    <div>
      <div class="movie_card" id="tomb">
        <div class="info_section">
          <div class="movie_header">
            <img class="locandina" src={`https://image.tmdb.org/t/p/w500${single.poster_path
              }`} />
            <h1>{single.title}</h1>
            <h4>Release Date: {single.
              release_date
            }</h4>
            <span class="minutes">Available Languages:</span>
            {single?.spoken_languages?.map((items, index) => (
              <p key={index} className="type">{items.english_name}</p>
            ))}

          </div>
          <div class="movie_desc">
            <p class="text">
              {single.
                overview
              }
            </p>
          </div>

        </div>
        <div
          className="blur_back tomb_back"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${single.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

      </div>



   
      <div className="container">
        <h3>Cast</h3>
        {cast && cast.cast && cast.cast.length > 0 ? (
          <div className="cast-container"> 
            <div className="row">
              {cast.cast.map((actor) => (
                <div className="col-md-2 m-3 mb-md-2 p-md-4">
                  <div key={actor.id} className="actor-card"> 
                    {actor.profile_path && ( 
                      <img
                        src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} 
                        alt={actor.name}
                        className="actor-image"
                      />
                    )}
                    <div className="col-md-2 p-2 p-md-4">
                      <p className="actor-name">{actor.name}</p>
                      <p className="actor-character">{actor.character}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No cast information available.</p>
        )}
      </div>
    </div>
  );
}

export default Singlemoviedetails;