import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRatedMovies } from "../reducer/moviereducer";
import { Link } from "react-router-dom";

function Toprate() {
  const dispatch = useDispatch();
  const { topRatedMovies = [], status, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);

  // console.log("Top Rated Movies:", topRatedMovies); 

  if (status === "loading") return <p>Loading top-rated movies...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="movies-tvshow-cards-main-container">
      <div className="movies-tvshow-cards-container">
        {topRatedMovies.length > 0 ? (
          topRatedMovies.map((item) => (
            <div key={item.id} className="card-main-container">
                <Link to={`/movie/${item.id}`}>

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
          <p>No top-rated movies available.</p>
        )}
      </div>
    </div>
  );
}

export default Toprate;
