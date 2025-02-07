import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Home.css';  // Or create a SearchResults.css
// import { searchMovies } from '../reducer/moviereducer';

function Searchmovie() {
  const { searchResults, status, error } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  if (status === "loading") return <p>Searching...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="movies-tvshow-cards-main-container"> {/* Same class as Home/Upcoming/TopRated */}
      <h2>Search Results</h2>
      <div className="movies-tvshow-cards-container">
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <div key={item.id} className="card-main-container">
              <Link to={`/movie/${item.id}`}> {/* Link to movie details */}
                <div className="card-container">
                  <div className="card-image-container">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                      alt={item.title}
                      className="card-image"
                    />
                  </div>
                  <div className="card-footer-container">
                    <div className="card-title">{item.title}</div>
                    <div className="card-title">Rating: {item.vote_average}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default Searchmovie;