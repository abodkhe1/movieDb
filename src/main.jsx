import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App.jsx";
import Home from "./component/Home.jsx";
import Searchmovie from "./component/Searchmovie.jsx";
import Singlemoviedetails from "./component/Singlemoviedetails.jsx";
import Toprate from "./component/Toprate.jsx";
import Upcomingmovie from "./component/Upcomingmovie.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="search" element={<Searchmovie />} />
      <Route path="movie/:movieId" element={<Singlemoviedetails />} />
      <Route path="toprate" element={<Toprate />} />
      <Route path="upcoming" element={<Upcomingmovie />} />
      <Route path="search" element={<Searchmovie />} /> 
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <Provider store={store}>
     <RouterProvider router={router} />

  </Provider>
  </StrictMode>
);
