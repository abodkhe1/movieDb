import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies, clearSearchResults } from "./reducer/moviereducer"; 
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { searchResults } = useSelector((state) => state.movies);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      dispatch(searchMovies(searchTerm));
      navigate("/search"); 
    } else {
      dispatch(clearSearchResults()); 
      navigate("/"); 
    }
  };
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Turret+Road:wght@200;300;400;500;700;800&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

      <header>
        <div className="logo">
          <div className="bars"></div>
          <h2>MovieDb</h2>
        </div>

        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/"><i className="fa-solid fa-house"></i><span>Home</span></Link>
            </li>
            <li>
              <Link to="/toprate"><i className="fa-solid fa-file-alt"></i><span>Top Rated</span></Link>
            </li>
            <li>
              <Link to="/upcoming"><i className="fa-solid fa-folder-open"></i><span>Upcoming</span></Link>
            </li>
          </ul>
        </nav>


        <section>
          <input
            type="text"
            placeholder="Movie Name"
            value={searchTerm}

            className="form-control"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { 
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button className="btn btn-dark" onClick={handleSearch}>Search</button>
          <span><i className="fa-solid fa-bell"></i></span>
          {/* <img src="https://i.postimg.cc/nrn1rVW3/logo.jpg" alt="profile" /> */}
        </section>
      </header>


      <Outlet />



    </>
  );
}

export default App;
