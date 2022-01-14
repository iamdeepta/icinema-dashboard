import React, { useState, useEffect } from "react";
import CatalogEdit from "../../components/CatalogEdit";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CatalogEdits = () => {
  const { pathname } = useLocation();
  //const [movie_id, setMovieId] = useState(null);
  //const movie_id = pathname.split("/").pop();
  const [mov, setMov] = useState([]);

  //   const { movies, dispatch } = useContext(MovieContext);
  //   useEffect(() => {
  //     getMovies(dispatch);
  //   }, [dispatch]);

  //   useEffect(() => {
  //     setMovieId(pathname.split("/").pop());
  //   }, [pathname]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axios.get(
          "/movies/find/" + pathname.split("/").pop(),
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        //console.log(res);
        setMov(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovies();
  }, [pathname]);
  return (
    <>
      <CatalogEdit mov={mov} />
    </>
  );
};

export default CatalogEdits;
