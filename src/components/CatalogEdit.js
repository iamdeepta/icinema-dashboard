import React, { useContext, useState, useEffect } from "react";
import { updateMovie } from "../context/movieContext/apiCalls";
import { MovieContext } from "../context/movieContext/MovieContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { getMovies } from "../context/movieContext/apiCalls";
// import { MovieContext } from "../context/movieContext/MovieContext";
// import axios from "axios";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";
import "./css/add_item.scss";
import AppUrl from "../classes/AppUrl";
import Select from "react-select";
import { ListContext } from "../context/listContext/ListContext";
import { getLists } from "../context/listContext/apiCalls";

const CatalogEdit = ({ mov }) => {
  const [id, setId] = useState(mov._id);
  const [title, setTitle] = useState(mov.title);
  const [title_bn, setTitleBn] = useState(mov.title_bn);
  const [desc, setDesc] = useState(mov.desc);
  const [desc_bn, setDescBn] = useState(mov.desc_bn);
  const [year, setYear] = useState(mov.year);
  const [year_bn, setYearBn] = useState(mov.year_bn);
  const [time, setTime] = useState(mov.time);
  const [time_bn, setTimeBn] = useState(mov.time_bn);
  const [genre, setGenre] = useState(mov.genre);
  const [genre_bn, setGenreBn] = useState(mov.genre_bn);
  const [age, setAge] = useState(mov.age);
  const [age_bn, setAgeBn] = useState(mov.age_bn);
  const [cast, setCast] = useState(mov.cast);
  const [cast_bn, setCastBn] = useState(mov.cast_bn);
  const [director, setDirector] = useState(mov.director);
  const [director_bn, setDirectorBn] = useState(mov.director_bn);
  const [writer, setWriter] = useState(mov.writer);
  const [writer_bn, setWriterBn] = useState(mov.writer_bn);
  const [type, setType] = useState(mov.type);
  const [category, setCategory] = useState(mov.category);
  const [img, setImg] = useState(mov.img);
  const [imgSm, setImgSm] = useState(mov.imgSm);
  const [imgTitle, setImgTitle] = useState(mov.imgTitle);

  const [imgUrl, setImgUrl] = useState(mov.img);
  const [imgSmUrl, setImgSmUrl] = useState(mov.imgSm);
  const [imgTitleUrl, setImgTitleUrl] = useState(mov.imgTitle);

  const [update_img, setUpdateImg] = useState(null);

  const [episode, setEpisode] = useState(mov.episode);
  const [episode_bn, setEpisodeBn] = useState(mov.episode_bn);
  const [season, setSeason] = useState(mov.season);
  const [season_bn, setSeasonBn] = useState(mov.season_bn);
  const [totalSeason, setTotalSeason] = useState(mov.totalSeason);
  const [totalSeason_bn, setTotalSeasonBn] = useState(mov.totalSeason_bn);

  const [uploadedFile, setUploadedFile] = useState({});
  const [uploadedFile1, setUploadedFile1] = useState({});
  const [uploadedFile2, setUploadedFile2] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadPercentage1, setUploadPercentage1] = useState(0);
  const [uploadPercentage2, setUploadPercentage2] = useState(0);

  useEffect(() => {
    setId(mov._id);
    setTitle(mov.title);
    setTitleBn(mov.title_bn);
    setDesc(mov.desc);
    setDescBn(mov.desc_bn);
    setYear(mov.year);
    setYearBn(mov.year_bn);
    setTime(mov.time);
    setTimeBn(mov.time_bn);
    setGenre(mov.genre);
    setGenreBn(mov.genre_bn);
    setAge(mov.age);
    setAgeBn(mov.age_bn);
    setCast(mov.cast);
    setCastBn(mov.cast_bn);
    setDirector(mov.director);
    setDirectorBn(mov.director_bn);
    setWriter(mov.writer);
    setWriterBn(mov.writer_bn);
    setType(mov.type);
    setCategory(mov.category);
    setImg(mov.img);
    setImgSm(mov.imgSm);
    setImgTitle(mov.imgTitle);
    // if (type === "Series") {
    setEpisode(mov.episode);
    setEpisodeBn(mov.episode_bn);
    setSeason(mov.season);
    setSeasonBn(mov.season_bn);
    setTotalSeason(mov.totalSeason);
    setTotalSeasonBn(mov.totalSeason_bn);
    // } else {
    //   setEpisode(null);
    //   setSeason(null);
    // }
  }, [mov]);

  useEffect(() => {
    // setTime(null);
    if (type !== "Series") {
      setSeason(null);
      setSeasonBn(null);
      setEpisode(null);
      setEpisodeBn(null);
      setTotalSeason(null);
      setTotalSeasonBn(null);
    } else {
      setSeason(mov.season);
      setSeasonBn(mov.season_bn);
      setEpisode(mov.episode);
      setEpisodeBn(mov.episode_bn);
      setTotalSeason(mov.totalSeason);
      setTotalSeasonBn(mov.totalSeason_bn);
    }
  }, [type]);

  //   useEffect(() => {
  //     setUploadedFile(uploadedFile);
  //   }, [uploadedFile]);

  const { isFetching, error, dispatch } = useContext(MovieContext);
  const { lists, dispatch: listDispatch } = useContext(ListContext);

  useEffect(() => {
    getLists(listDispatch);
  }, [listDispatch]);

  let options = [];
  lists.map((item) => options.push({ value: item._id, label: item.title }));

  const navigate = useNavigate();

  const [thumbnail, setThumbnail] = useState("Upload Cover Image");
  const [title_pic, setTitlePic] = useState("Upload Title Image");
  const [small_pic, setSmallPic] = useState("Upload Small Image");

  const selectCoverImage = async (e) => {
    setThumbnail(e.target.files[0].name);
    setImg(e.target.files[0]);
    //setUpdateImg(e.target.files[0]);

    if (!img) {
      toast.error("Please select a cover image");
    } else {
      const formData = new FormData();
      formData.append("img", e.target.files[0]);

      const { url } = await fetch(AppUrl.base_url + "/uploadFile").then((res) =>
        res.json()
      );

      try {
        const res = await axios.put(url, e.target.files[0], {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        });

        //console.log(res);

        // Clear percentage
        //setTimeout(() => setUploadPercentage(0), 10000);
        setImgUrl(url.substring(url.lastIndexOf("/") + 1).split("?")[0]);
        //setImgUrl(imgUrl.substring(imgUrl.lastIndexOf("/") + 1));
        const { fileName, filePath } = res.data;

        setUploadedFile({
          fileName,
          filePath,
        });

        //console.log(uploadedFile);

        setMessage("File Uploaded");
      } catch (err) {
        if (err.response.status === 500) {
          toast.error("There was a problem with the server");
        } else {
          console.log(err.response.data.msg);
        }
        setUploadPercentage(0);
      }
    }
    //console.log(uploadedFile.filePath);
  };

  const selectSmallImage = async (e) => {
    setSmallPic(e.target.files[0].name);
    setImgSm(e.target.files[0]);

    if (!imgSm) {
      toast.error("Please select a small image");
    } else {
      const formData = new FormData();
      formData.append("imgSm", e.target.files[0]);

      const { imgSm_url } = await fetch(
        AppUrl.base_url + "/uploadFile/imgSm"
      ).then((res) => res.json());

      try {
        const res = await axios.put(imgSm_url, e.target.files[0], {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage1(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        });

        //console.log(res);

        // Clear percentage
        //setTimeout(() => setUploadPercentage(0), 10000);
        setImgSmUrl(
          imgSm_url.substring(imgSm_url.lastIndexOf("/") + 1).split("?")[0]
        );
        //setImgSmUrl(imgSmUrl.substring(imgSmUrl.lastIndexOf("/") + 1));
        const { fileName, filePath } = res.data;

        setUploadedFile1({
          fileName,
          filePath,
        });

        //console.log(uploadedFile);

        setMessage("File Uploaded");
      } catch (err) {
        if (err.response.status === 500) {
          toast.error("There was a problem with the server");
        } else {
          console.log(err.response.data.msg);
        }
        setUploadPercentage1(0);
      }
    }

    //console.log(title_pic);
  };

  const selectTitleImage = async (e) => {
    setTitlePic(e.target.files[0].name);
    setImgTitle(e.target.files[0]);

    if (!imgTitle) {
      toast.error("Please select a title image");
    } else {
      const formData = new FormData();
      formData.append("imgTitle", e.target.files[0]);

      const { imgTitle_url } = await fetch(
        AppUrl.base_url + "/uploadFile/imgTitle"
      ).then((res) => res.json());

      try {
        const res = await axios.put(imgTitle_url, e.target.files[0], {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage2(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        });

        //console.log(res);

        // Clear percentage
        //setTimeout(() => setUploadPercentage(0), 10000);
        setImgTitleUrl(
          imgTitle_url
            .substring(imgTitle_url.lastIndexOf("/") + 1)
            .split("?")[0]
        );
        //setImgTitleUrl(imgTitleUrl.substring(imgTitleUrl.lastIndexOf("/") + 1));
        const { fileName, filePath } = res.data;

        setUploadedFile2({
          fileName,
          filePath,
        });

        //console.log(uploadedFile);

        setMessage("File Uploaded");
      } catch (err) {
        if (err.response.status === 500) {
          toast.error("There was a problem with the server");
        } else {
          console.log(err.response.data.msg);
        }
        setUploadPercentage2(0);
      }
    }

    //console.log(title_pic);
  };

  const update = () => {
    // if (!imgSm) {
    //   toast.error("Please select a small image");
    // } else {
    //   const formData = new FormData();
    //   formData.append("imgSm", imgSm);

    //   try {
    //     const res = await axios.post("/uploadfiles1", formData, {
    //       headers: {
    //         token:
    //           "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    //         "Content-Type": "multipart/form-data",
    //       },
    //       onUploadProgress: (progressEvent) => {
    //         setUploadPercentage1(
    //           parseInt(
    //             Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //           )
    //         );
    //       },
    //     });

    //     // Clear percentage
    //     //setTimeout(() => setUploadPercentage(0), 10000);

    //     const { fileName, filePath } = res.data;

    //     setUploadedFile1({
    //       fileName,
    //       filePath,
    //     });

    //     //console.log(uploadedFile);

    //     setMessage("File Uploaded");
    //   } catch (err) {
    //     if (err.response.status === 500) {
    //       toast.error("There was a problem with the server");
    //     } else {
    //       console.log(err.response.data.msg);
    //     }
    //     setUploadPercentage1(0);
    //   }
    // }

    // if (!imgTitle) {
    //   toast.error("Please select a title image");
    // } else {
    //   const formData = new FormData();
    //   formData.append("imgTitle", imgTitle);

    //   try {
    //     const res = await axios.post("/uploadfiles2", formData, {
    //       headers: {
    //         token:
    //           "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    //         "Content-Type": "multipart/form-data",
    //       },
    //       onUploadProgress: (progressEvent) => {
    //         setUploadPercentage2(
    //           parseInt(
    //             Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //           )
    //         );
    //       },
    //     });

    //     // Clear percentage
    //     //setTimeout(() => setUploadPercentage(0), 10000);

    //     const { fileName, filePath } = res.data;

    //     setUploadedFile2({
    //       fileName,
    //       filePath,
    //     });

    //     //console.log(uploadedFile);

    //     setMessage("File Uploaded");
    //   } catch (err) {
    //     if (err.response.status === 500) {
    //       toast.error("There was a problem with the server");
    //     } else {
    //       console.log(err.response.data.msg);
    //     }
    //     setUploadPercentage2(0);
    //   }
    // }

    updateMovie(
      {
        title,
        title_bn,
        desc,
        desc_bn,
        year,
        year_bn,
        time,
        time_bn,
        genre,
        genre_bn,
        age,
        age_bn,
        cast,
        cast_bn,
        director,
        director_bn,
        writer,
        writer_bn,
        type,
        category,
        episode,
        episode_bn,
        season,
        season_bn,
        totalSeason,
        totalSeason_bn,
        img: imgUrl,
        imgSm: imgSmUrl,
        imgTitle: imgTitleUrl,
        // imgTitle: uploadedFile2.filePath,
      },
      id,
      dispatch
    );

    console.log(uploadedFile.filePath);

    if (!error) {
      toast.success("Updated Successfully");
      setTimeout(() => {
        navigate("/catalog");
      }, 2000);
    } else {
      toast.error("Something went wrong. Try again.");
    }
  };
  return (
    <>
      <ToastContainer />
      {/* <!-- main content --> */}
      <main className="main">
        <div className="container-fluid">
          <div className="row">
            {/* <!-- main title --> */}
            <div className="col-12">
              <div className="main__title">
                <h2>Edit {mov.title}</h2>
              </div>
            </div>
            {/* <!-- end main title --> */}

            {/* <!-- form --> */}
            <div className="col-12">
              <form action="#" className="form">
                <div className="row">
                  <div className="col-12 col-md-6 ">
                    <div className="row">
                      <div className="col-12 col-sm-6 col-md-12">
                        <div className="form__img">
                          <label htmlFor="form__img-upload">{thumbnail}</label>
                          <input
                            id="form__img-upload"
                            name="form__img-upload"
                            type="file"
                            accept=".png, .jpg, .jpeg, .webp"
                            onChange={(e) => selectCoverImage(e)}
                          />
                          <img
                            id="form__img"
                            src={AppUrl.file_url + img}
                            alt=" "
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="row">
                      <div className="col-12 col-sm-6 col-md-12">
                        <div className="form__img">
                          <label htmlFor="form__img-upload1">{small_pic}</label>
                          <input
                            id="form__img-upload1"
                            name="form__img-upload1"
                            type="file"
                            accept=".png, .jpg, .jpeg, .webp"
                            onChange={(e) => selectSmallImage(e)}
                          />
                          <img
                            id="form__img"
                            src={AppUrl.file_url + imgSm}
                            alt=" "
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-5 form__cover">
                    <div className="row">
                      <div className="col-12 col-sm-6 col-md-12">
                        <div className="form__img">
                          <label htmlFor="form__img-upload2">{title_pic}</label>
                          <input
                            id="form__img-upload2"
                            name="form__img-upload2"
                            type="file"
                            accept=".png, .jpg, .jpeg, .webp"
                            onChange={(e) => selectTitleImage(e)}
                          />
                          <img
                            id="form__img"
                            src={AppUrl.file_url + imgTitle}
                            alt=" "
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-7 form__content">
                    <div className="row">
                      <div className="col-6">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="Title (BN)"
                            value={title_bn}
                            onChange={(e) => setTitleBn(e.target.value)}
                          />
                        </div>
                      </div>

                      {type === "Series" && (
                        <>
                          <div className="col-12 col-sm-6 col-lg-4">
                            <div className="form__group">
                              <input
                                type="number"
                                className="form__input"
                                placeholder="Season Number"
                                value={season}
                                onChange={(e) => setSeason(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-sm-6 col-lg-4">
                            <div className="form__group">
                              <input
                                type="number"
                                className="form__input"
                                placeholder="Episode Number"
                                value={episode}
                                onChange={(e) => setEpisode(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-sm-6 col-lg-4">
                            <div className="form__group">
                              <input
                                type="number"
                                className="form__input"
                                placeholder="Total Season Number"
                                value={totalSeason}
                                onChange={(e) => setTotalSeason(e.target.value)}
                              />
                            </div>
                          </div>

                          {/* bangla */}
                          <div className="col-12 col-sm-6 col-lg-4">
                            <div className="form__group">
                              <input
                                type="text"
                                className="form__input"
                                placeholder="Season Number (BN)"
                                value={season_bn}
                                onChange={(e) => setSeasonBn(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-sm-6 col-lg-4">
                            <div className="form__group">
                              <input
                                type="text"
                                className="form__input"
                                placeholder="Episode Number (BN)"
                                value={episode_bn}
                                onChange={(e) => setEpisodeBn(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-sm-6 col-lg-4">
                            <div className="form__group">
                              <input
                                type="text"
                                className="form__input"
                                placeholder="Total Season Number (BN)"
                                value={totalSeason_bn}
                                onChange={(e) =>
                                  setTotalSeasonBn(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="col-6">
                        <div className="form__group">
                          <textarea
                            id="text"
                            name="text"
                            className="form__textarea"
                            placeholder="Description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="form__group">
                          <textarea
                            id="text"
                            name="text"
                            className="form__textarea"
                            placeholder="Description (BN)"
                            value={desc_bn}
                            onChange={(e) => setDescBn(e.target.value)}
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="Release year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder={
                              type === "Series" ? "Duration" : "Duration"
                            }
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="Genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <select
                            className="js-example-basic-single"
                            id="quality"
                          >
                            <option value="FullHD">FullHD</option>
                            <option value="HD">HD</option>
                          </select>
                        </div>
                      </div> */}
                      {type !== "Music" && (
                        <div className="col-12 col-sm-6 col-lg-3">
                          <div className="form__group">
                            <input
                              type="number"
                              className="form__input"
                              placeholder="Age"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                            />
                          </div>
                        </div>
                      )}

                      {/* bangla */}
                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="Release year (BN)"
                            value={year_bn}
                            onChange={(e) => setYearBn(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder={
                              type === "Series"
                                ? "Duration (BN)"
                                : "Duration (BN)"
                            }
                            value={time_bn}
                            onChange={(e) => setTimeBn(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="Genre (BN)"
                            value={genre_bn}
                            onChange={(e) => setGenreBn(e.target.value)}
                          />
                        </div>
                      </div>

                      {type !== "Music" && (
                        <div className="col-12 col-sm-6 col-lg-3">
                          <div className="form__group">
                            <input
                              type="text"
                              className="form__input"
                              placeholder="Age (BN)"
                              value={age_bn}
                              onChange={(e) => setAgeBn(e.target.value)}
                            />
                          </div>
                        </div>
                      )}

                      <div className="col-12 col-sm-6 col-lg-4">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder={
                              type !== "Music" ? "Casts" : "Singer/Artist"
                            }
                            value={cast}
                            onChange={(e) => setCast(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-4">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder={
                              type !== "Music" ? "Director" : "Composer"
                            }
                            value={director}
                            onChange={(e) => setDirector(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-4">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder={
                              type !== "Music" ? "Writer" : "Lyrics Writer"
                            }
                            value={writer}
                            onChange={(e) => setWriter(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* bangla */}
                      <div className="col-12 col-sm-6 col-lg-4">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder={
                              type !== "Music"
                                ? "Casts (BN)"
                                : "Singer/Artist (BN)"
                            }
                            value={cast_bn}
                            onChange={(e) => setCastBn(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-4">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder={
                              type !== "Music"
                                ? "Director (BN)"
                                : "Composer (BN)"
                            }
                            value={director_bn}
                            onChange={(e) => setDirectorBn(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-4">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder={
                              type !== "Music"
                                ? "Writer (BN)"
                                : "Lyrics Writer (BN)"
                            }
                            value={writer_bn}
                            onChange={(e) => setWriterBn(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* <div className="col-12 col-lg-6">
                        <div className="form__group">
                          <select
                            className="js-example-basic-multiple"
                            id="country"
                            multiple="multiple"
                          >
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Åland Islands">Åland Islands</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">
                              American Samoa
                            </option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Antigua and Barbuda">
                              Antigua and Barbuda
                            </option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bosnia and Herzegovina">
                              Bosnia and Herzegovina
                            </option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="Brunei Darussalam">
                              Brunei Darussalam
                            </option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">
                              Cayman Islands
                            </option>
                            <option value="Central African Republic">
                              Central African Republic
                            </option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Congo">Congo</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote D'ivoire">Cote D'ivoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">
                              Czech Republic
                            </option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">
                              Dominican Republic
                            </option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">
                              Equatorial Guinea
                            </option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guernsey">Guernsey</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-bissau">Guinea-bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran">Iran</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Isle of Man">Isle of Man</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Korea">Korea</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao People's Democratic Republic">
                              Lao People's Democratic Republic
                            </option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libyan Arab Jamahiriya">
                              Libyan Arab Jamahiriya
                            </option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macao">Macao</option>
                            <option value="Macedonia">Macedonia</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">
                              Marshall Islands
                            </option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Moldova">Moldova</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">
                              Netherlands Antilles
                            </option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">
                              Norfolk Island
                            </option>
                            <option value="Northern Mariana Islands">
                              Northern Mariana Islands
                            </option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">
                              Papua New Guinea
                            </option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russian Federation">
                              Russian Federation
                            </option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">
                              Sao Tome and Principe
                            </option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">
                              Solomon Islands
                            </option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syrian Arab Republic">
                              Syrian Arab Republic
                            </option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania">Tanzania</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Timor-leste">Timor-leste</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">
                              Trinidad and Tobago
                            </option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos Islands">
                              Turks and Caicos Islands
                            </option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">
                              United Arab Emirates
                            </option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="United States">United States</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Viet Nam">Viet Nam</option>
                            <option value="Western Sahara">
                              Western Sahara
                            </option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                          </select>
                        </div>
                      </div> */}

                      {/* <div className="col-12 col-lg-6">
                        <div className="form__group">
                          <select
                            className="js-example-basic-multiple"
                            id="genre"
                            multiple="multiple"
                          >
                            <option value="Action">Action</option>
                            <option value="Animation">Animation</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Crime">Crime</option>
                            <option value="Drama">Drama</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Historical">Historical</option>
                            <option value="Horror">Horror</option>
                            <option value="Romance">Romance</option>
                            <option value="Science-fiction">
                              Science-fiction
                            </option>
                            <option value="Thriller">Thriller</option>
                            <option value="Western">Western</option>
                            <option value="Otheer">Otheer</option>
                          </select>
                        </div>
                      </div> */}

                      {/* <div className="col-12">
                        <div className="form__gallery">
                          <label id="gallery1" for="form__gallery-upload">
                            {title_pic}
                          </label>
                          <input
                            data-name="#gallery1"
                            id="form__gallery-upload"
                            name="gallery"
                            className="form__gallery-upload"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            multiple
                            onChange={(e) => changeTitlePic(e)}
                          />
                        </div>
                      </div> */}
                    </div>
                  </div>

                  <div className="col-12">
                    <ul className="form__radio">
                      <li>
                        <span>Item type:</span>
                      </li>
                      <li>
                        <input
                          id="type1"
                          type="radio"
                          name="type"
                          value="Movie"
                          onChange={(e) => setType(e.target.value)}
                          checked={type === "Movie"}
                        />
                        <label for="type1">Movie</label>
                      </li>
                      <li>
                        <input
                          id="type2"
                          type="radio"
                          name="type"
                          value="Series"
                          onChange={(e) => setType(e.target.value)}
                          checked={type === "Series"}
                        />
                        <label for="type2">Series</label>
                      </li>
                      <li>
                        <input
                          id="type3"
                          type="radio"
                          name="type3"
                          value="Music"
                          onChange={(e) => setType(e.target.value)}
                          checked={type === "Music"}
                        />
                        <label for="type3">Music</label>
                      </li>
                    </ul>
                  </div>

                  <div className="col-12">
                    <div className="row">
                      {/* <div className="col-12 col-lg-6">
                        <div className="form__video">
                          <label id="movie1" for="form__video-upload">
                            Upload video (mp4)
                          </label>
                          <input
                            data-name="#movie1"
                            id="form__video-upload"
                            name="movie"
                            className="form__video-upload"
                            type="file"
                            accept="video/mp4,video/x-m4v,video/*"
                          />
                        </div>
                      </div> */}

                      {/* <div className="col-12 col-lg-6">
                        <div className="form__group form__group--link">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="or add a link (mp4)"
                          />
                        </div>
                      </div> */}

                      <div className="col-12 col-lg-12 mb-5 add_content_select">
                        <Select
                          defaultValue={category}
                          placeholder={
                            category
                              ? lists
                                  // eslint-disable-next-line array-callback-return
                                  .filter((item) => {
                                    if (item._id === category) {
                                      return item;
                                    }
                                  })
                                  .map((item) => item.title)
                              : "Select a category"
                          }
                          options={options}
                          selectedValue={category}
                          onChange={(e) => setCategory(e.value)}

                          // theme={(theme) => ({
                          //   ...theme,
                          //   borderRadius: 6,
                          //   colors: {
                          //     ...theme.colors,
                          //     text: "white",
                          //     primary25: "hotpink",
                          //     primary: "gray",

                          //   },
                          // })}
                        />
                      </div>

                      <div className="col-12">
                        {isFetching ? (
                          <>
                            <button
                              type="button"
                              className="form__btn"
                              disabled={true}
                            >
                              Updating...
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="form__btn"
                              onClick={() => update()}
                            >
                              Update
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/* <!-- end form --> */}
          </div>
        </div>
      </main>
      {/* <!-- end main content --> */}
    </>
  );
};

export default CatalogEdit;
