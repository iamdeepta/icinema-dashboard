import React, { useState, useEffect } from "react";
//import CatalogEdit from "../../components/CatalogEdit";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CategoryEdit from "../../components/CategoryEdit";

const CategoryEdits = () => {
  const { pathname } = useLocation();
  //const [movie_id, setMovieId] = useState(null);
  //const movie_id = pathname.split("/").pop();
  const [cat, setCat] = useState([]);

  //   const { movies, dispatch } = useContext(MovieContext);
  //   useEffect(() => {
  //     getMovies(dispatch);
  //   }, [dispatch]);

  //   useEffect(() => {
  //     setMovieId(pathname.split("/").pop());
  //   }, [pathname]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          "/lists/find/" + pathname.split("/").pop(),
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        //console.log(res);
        setCat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, [pathname]);
  return (
    <>
      <CategoryEdit cat={cat} />
    </>
  );
};

export default CategoryEdits;
