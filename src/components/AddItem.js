import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import storage from "../firebase";
import { createMovie } from "../context/movieContext/apiCalls";
import { MovieContext } from "../context/movieContext/MovieContext";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";
import "./css/add_item.scss";
import Select from "react-select";
import { ListContext } from "../context/listContext/ListContext";
import { getLists } from "../context/listContext/apiCalls";
import AppUrl from "../classes/AppUrl";

import S3FileUpload from "react-s3";
//import ReactS3 from "react-s3";

//Optional Import
import { uploadFile } from "react-s3";

// const config = {
//   bucketName: "files.icinemabd.com",
//   dirName: "images" /* optional */,
//   region: "us-east-1",
//   accessKeyId: process.env.REACT_APP_ACESS_KEY_ID,
//   secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
// };

//require("dotenv").config();

const AddItem = () => {
  const [title, setTitle] = useState(null);
  const [title_bn, setTitleBn] = useState(null);
  const [desc, setDesc] = useState(null);
  const [desc_bn, setDescBn] = useState(null);
  const [year, setYear] = useState(null);
  const [year_bn, setYearBn] = useState(null);
  const [time, setTime] = useState(null);
  const [time_bn, setTimeBn] = useState(null);
  const [genre, setGenre] = useState(null);
  const [genre_bn, setGenreBn] = useState(null);
  const [age, setAge] = useState(null);
  const [age_bn, setAgeBn] = useState(null);
  const [cast, setCast] = useState(null);
  const [cast_bn, setCastBn] = useState(null);
  const [director, setDirector] = useState(null);
  const [director_bn, setDirectorBn] = useState(null);
  const [writer, setWriter] = useState(null);
  const [writer_bn, setWriterBn] = useState(null);
  const [type, setType] = useState(null);
  const [category, setCategory] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [episode_bn, setEpisodeBn] = useState(null);
  const [season, setSeason] = useState(null);
  const [season_bn, setSeasonBn] = useState(null);
  const [totalSeason, setTotalSeason] = useState(null);
  const [totalSeason_bn, setTotalSeasonBn] = useState(null);
  const [rating, setRating] = useState(null);
  const [rating_bn, setRatingBn] = useState(null);

  const [imgUrl, setImgUrl] = useState(null);
  const [imgTitleUrl, setImgTitleUrl] = useState(null);
  const [imgSmUrl, setImgSmUrl] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const [uploadedFile, setUploadedFile] = useState({});
  const [uploadedFile1, setUploadedFile1] = useState({});
  const [uploadedFile2, setUploadedFile2] = useState({});
  const [uploadedFile3, setUploadedFile3] = useState({});
  const [uploadedFile4, setUploadedFile4] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadPercentage3, setUploadPercentage3] = useState(0);
  const [uploadPercentage4, setUploadPercentage4] = useState(0);
  const [uploadPercentage1, setUploadPercentage1] = useState(0);
  const [uploadPercentage2, setUploadPercentage2] = useState(0);

  const { isFetching, error, dispatch } = useContext(MovieContext);

  const { lists, dispatch: listDispatch } = useContext(ListContext);

  //console.log(lists);

  useEffect(() => {
    getLists(listDispatch);
  }, [listDispatch]);

  let options = [];
  lists.map((item) =>
    options.push({ value: item._id, label: `${item.title} - ${item.type}` })
  );

  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];

  //const [thumbnail, setThumbnail] = useState("");
  const [title_pic, setTitlePic] = useState("Upload Title Image");
  const [small_pic, setSmallPic] = useState("Upload Small Image");
  const [cover_pic, setCoverPic] = useState("Upload Cover Image");
  const [videos, setVideos] = useState("Upload video (mp4)");
  const [trailers, setTrailers] = useState("Upload trailer (mp4)");
  const [audio, setAudio] = useState("Upload audio");

  const [imgPic, setImgPic] = useState(null);

  useEffect(() => {
    setTime(null);
    setTimeBn(null);
    setSeason(null);
    setSeasonBn(null);
    setEpisode(null);
    setEpisodeBn(null);
    setTotalSeason(null);
    setTotalSeasonBn(null);
    setRating(null);
    setRatingBn(null);
    if (type === "Music") {
      setTrailer(null);
      setTrailers("Upload trailer (mp4)");
    }
  }, [type]);

  const selectCoverImage = (e) => {
    //setThumbnail(e.target.files[0].name);
    setCoverPic(e.target.files[0].name);
    setImg(e.target.files[0]);
    //console.log(e.target.files[0]);

    setImgPic(URL.createObjectURL(e.target.files[0]));
    let src = URL.createObjectURL(e.target.files[0]);

    //convert image to canvas
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    let coverImage = new Image();
    coverImage.src = src;

    coverImage.onload = function () {
      canvas.width = coverImage.width;
      canvas.height = coverImage.height;
      ctx.drawImage(coverImage, 0, 0);

      //convert canvas to webp
      let webpCover = canvas.toDataURL("image/webp");
      setImgPic(webpCover);
      //setImg(e.target.files[0]);
      //console.log(webpCover);
    };

    //console.log(thumbnail);
  };

  const changeTitlePic = (e) => {
    setTitlePic(e.target.files[0].name);
    setImgTitle(e.target.files[0]);

    //console.log(title_pic);
  };

  const changeSmallPic = (e) => {
    setSmallPic(e.target.files[0].name);
    setImgSm(e.target.files[0]);
  };

  const changeVideo = (e) => {
    setVideos(e.target.files[0].name);
    setAudio(e.target.files[0].name);
    setVideo(e.target.files[0]);
  };

  const changeTrailer = (e) => {
    setTrailers(e.target.files[0].name);
    setTrailer(e.target.files[0]);
  };

  const uploadMovie = async () => {
    // e.preventDefault();
    //cover image
    if (
      !img ||
      !imgSm ||
      !imgTitle ||
      !video ||
      (type !== "Music" && !trailer)
    ) {
      toast.error("Please select all images, video and trailer");
    } else {
      const formData = new FormData();
      formData.append("img", img);
      formData.append("imgSm", imgSm);
      formData.append("imgTitle", imgTitle);
      formData.append("video", video);
      if (type !== "Music") {
        formData.append("trailer", trailer);
      }

      // S3FileUpload.uploadFile(img, config)
      //   .then((data) => {
      //     console.log(data.location);
      //   })
      //   .catch((err) => console.log(err));

      //upload files to aws s3 bucket
      // get secure url from our server
      const { url } = await fetch(AppUrl.base_url + "/uploadFile").then((res) =>
        res.json()
      );

      const { imgTitle_url } = await fetch(
        AppUrl.base_url + "/uploadFile/imgTitle"
      ).then((res) => res.json());

      const { imgSm_url } = await fetch(
        AppUrl.base_url + "/uploadFile/imgSm"
      ).then((res) => res.json());

      const { trailer_url } = await fetch(
        AppUrl.base_url + "/uploadFile/trailer"
      ).then((res) => res.json());

      const { video_url } = await fetch(
        AppUrl.base_url + "/uploadFile/video"
      ).then((res) => res.json());
      //console.log(url);

      // // post the image direclty to the s3 bucket
      // await fetch(url, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   body: img,
      // });

      // const imageUrl = url.split("?")[0];
      // console.log(imageUrl);

      try {
        const res = await axios.put(url, img, {
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

        // Clear percentage
        //setTimeout(() => setUploadPercentage(0), 10000);
        setImgUrl(url.split("?")[0]);
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
          toast.error(err.response.data.msg);
        }
        setUploadPercentage(0);
      }

      try {
        const res = await axios.put(imgTitle_url, imgTitle, {
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

        // Clear percentage
        //setTimeout(() => setUploadPercentage(0), 10000);
        setImgTitleUrl(imgTitle_url.split("?")[0]);
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
          toast.error(err.response.data.msg);
        }
        setUploadPercentage1(0);
      }

      // try {
      //   const res = await axios.post(AppUrl.base_url + "/upload1", formData, {
      //     headers: {
      //       token:
      //         "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      //       "Content-Type": "multipart/form-data",
      //     },
      //     onUploadProgress: (progressEvent) => {
      //       setUploadPercentage1(
      //         parseInt(
      //           Math.round((progressEvent.loaded * 100) / progressEvent.total)
      //         )
      //       );
      //     },
      //   });

      //   // Clear percentage
      //   //setTimeout(() => setUploadPercentage(0), 10000);

      //   const { fileName, filePath } = res.data;

      //   setUploadedFile1({
      //     fileName,
      //     filePath,
      //   });

      //   //console.log(uploadedFile);

      //   setMessage("File Uploaded");
      // } catch (err) {
      //   if (err.response.status === 500) {
      //     toast.error("There was a problem with the server");
      //   } else {
      //     toast.error(err.response.data.msg);
      //   }
      //   setUploadPercentage1(0);
      // }

      try {
        const res = await axios.put(imgSm_url, imgSm, {
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

        // Clear percentage
        //setTimeout(() => setUploadPercentage(0), 10000);
        setImgSmUrl(imgSm_url.split("?")[0]);
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
          toast.error(err.response.data.msg);
        }
        setUploadPercentage2(0);
      }

      if (type !== "Music") {
        try {
          const res = await axios.put(trailer_url, trailer, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              setUploadPercentage3(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );
            },
          });

          // Clear percentage
          //setTimeout(() => setUploadPercentage(0), 10000);
          setTrailerUrl(trailer_url.split("?")[0]);
          const { fileName, filePath } = res.data;

          setUploadedFile3({
            fileName,
            filePath,
          });

          //console.log(uploadedFile);

          setMessage("File Uploaded");
          if (type === "Music") {
            toast.success("You can publish now");
          }
        } catch (err) {
          if (err.response.status === 500) {
            toast.error("There was a problem with the server");
          } else {
            toast.error(err.response.data.msg);
          }
          setUploadPercentage3(0);
        }
      }

      //if (type !== "Music") {
      try {
        const res = await axios.put(video_url, video, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage4(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        });

        // Clear percentage
        //setTimeout(() => setUploadPercentage(0), 10000);
        setVideoUrl(video_url.split("?")[0]);
        const { fileName, filePath } = res.data;

        setUploadedFile4({
          fileName,
          filePath,
        });

        //console.log(uploadedFile);

        setMessage("File Uploaded");
        toast.success("You can publish now");
      } catch (err) {
        if (err.response.status === 500) {
          toast.error("There was a problem with the server");
        } else {
          toast.error(err.response.data.msg);
        }
        setUploadPercentage4(0);
      }
      //}
    }
  };

  const addMovie = () => {
    if (
      !title ||
      !title_bn ||
      !desc ||
      !desc_bn ||
      !year ||
      !year_bn ||
      !time ||
      !time_bn ||
      !genre ||
      !genre_bn ||
      !category ||
      (type !== "Music" && !age) ||
      !cast ||
      !cast_bn ||
      !director ||
      !director_bn ||
      !writer ||
      !writer_bn ||
      !rating ||
      !rating_bn ||
      !type ||
      !img ||
      !imgTitle ||
      !imgSm ||
      (type !== "Music" && !trailer) ||
      !video
    ) {
      toast.error("Please fill up all the empty fields");
    } else {
      if (type !== "Music") {
        createMovie(
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
            rating,
            rating_bn,
            img: imgUrl.substring(imgUrl.lastIndexOf("/") + 1),
            imgTitle: imgTitleUrl.substring(imgTitleUrl.lastIndexOf("/") + 1),
            imgSm: imgSmUrl.substring(imgSmUrl.lastIndexOf("/") + 1),
            video: videoUrl.substring(videoUrl.lastIndexOf("/") + 1),
            trailer: trailerUrl.substring(trailerUrl.lastIndexOf("/") + 1),
            // trailer: uploadedFile4.filePath,
          },
          dispatch
        );
      } else {
        createMovie(
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
            rating,
            rating_bn,
            img: imgUrl.substring(imgUrl.lastIndexOf("/") + 1),
            imgTitle: imgTitleUrl.substring(imgTitleUrl.lastIndexOf("/") + 1),
            imgSm: imgSmUrl.substring(imgSmUrl.lastIndexOf("/") + 1),
            video: videoUrl.substring(videoUrl.lastIndexOf("/") + 1),
            // trailer: trailerUrl,
            // trailer: uploadedFile4.filePath,
          },
          dispatch
        );
      }

      if (!error) {
        toast.success("Uploaded Successfully");
        setTitle(null);
        setTitleBn(null);
        setDesc(null);
        setDescBn(null);
        setYear(null);
        setYearBn(null);
        setTime(null);
        setTimeBn(null);
        setGenre(null);
        setGenreBn(null);
        setAge(null);
        setAgeBn(null);
        setCast(null);
        setCastBn(null);
        setDirector(null);
        setDirectorBn(null);
        setWriter(null);
        setWriterBn(null);
        setEpisode(null);
        setEpisodeBn(null);
        setSeason(null);
        setSeasonBn(null);
        setTotalSeason(null);
        setTotalSeasonBn(null);
        setRating(null);
        setRatingBn(null);
        setCoverPic("Upload cover image");
        setSmallPic("Upload small image");
        setTitlePic("Upload title image");
        setVideos("Upload video (mp4)");
        setTrailers("Upload trailers (mp4)");
        setImg(null);
        setImgSm(null);
        setImgTitle(null);
        setVideo(null);
        setTrailer(null);
        setUploadPercentage(0);
        setUploadPercentage1(0);
        setUploadPercentage2(0);
        setUploadPercentage3(0);
        setUploadPercentage4(0);
        if (!isFetching) {
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      } else {
        toast.error("This title is created before");
      }
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
                <h2>Add new content</h2>
              </div>
            </div>
            {/* <!-- end main title --> */}

            {/* <!-- form --> */}
            <div className="col-12">
              <form action="#" className="form">
                <div className="row">
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
                          // checked={type === "Series"}
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
                          // checked={type === "Series"}
                        />
                        <label for="type2">Series</label>
                      </li>
                      <li>
                        <input
                          id="type3"
                          type="radio"
                          name="type"
                          value="Music"
                          onChange={(e) => setType(e.target.value)}
                          // checked={type === "Series"}
                        />
                        <label for="type3">Music</label>
                      </li>
                    </ul>
                  </div>

                  <div className="col-12 col-md-5 form__cover">
                    <div className="row">
                      <div className="col-12 col-sm-6 col-md-12">
                        <div className="form__img">
                          <label for="form__img-upload">{cover_pic}</label>
                          <input
                            id="form__img-upload"
                            name="form__img-upload"
                            type="file"
                            accept=".png, .jpg, .jpeg, .webp, image/*"
                            onChange={(e) => selectCoverImage(e)}
                          />
                          <img id="form__img" src={imgPic} alt=" " />
                        </div>
                      </div>
                    </div>
                    {uploadPercentage > 0 && (
                      <div className="col-12 col-lg-12">
                        <div className="">
                          <ProgressBar
                            now={uploadPercentage}
                            label={`cover(${uploadPercentage}%)`}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-7 form__content">
                    <div className="row">
                      <div className="col-6">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="Title"
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
                            onChange={(e) => setTitleBn(e.target.value)}
                          />
                        </div>
                      </div>

                      {type === "Series" ? (
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
                      ) : (
                        <></>
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
                              type === "Movie"
                                ? "Duration"
                                : type === "Series"
                                ? "Duration"
                                : "Duration"
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
                              type === "Movie"
                                ? "Duration (BN)"
                                : type === "Series"
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

                      <div className="col-12 col-sm-6 col-lg-6">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="Rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-lg-6">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="Rating (BN)"
                            value={rating_bn}
                            onChange={(e) => setRatingBn(e.target.value)}
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

                      <div className="col-12 col-lg-6">
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
                            accept=".png, .jpg, .jpeg, .webp"
                            multiple
                            onChange={(e) => changeTitlePic(e)}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-lg-6">
                        <div className="form__gallery">
                          <label id="gallery1" for="form__gallery-upload2">
                            {small_pic}
                          </label>
                          <input
                            data-name="#gallery1"
                            id="form__gallery-upload2"
                            name="gallery"
                            className="form__gallery-upload"
                            type="file"
                            accept=".png, .jpg, .jpeg, .webp"
                            multiple
                            onChange={(e) => changeSmallPic(e)}
                          />
                        </div>
                      </div>
                      {uploadPercentage1 > 0 && (
                        <div className="col-12 col-lg-6">
                          <div className="">
                            <ProgressBar
                              now={uploadPercentage1}
                              label={`title(${uploadPercentage1}%)`}
                            />
                          </div>
                        </div>
                      )}

                      {uploadPercentage2 > 0 && (
                        <div className="col-12 col-lg-6">
                          <div className="">
                            <ProgressBar
                              now={uploadPercentage2}
                              label={`small(${uploadPercentage2}%)`}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* <div className="col-12">
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
                          // checked={type === "Series"}
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
                          // checked={type === "Series"}
                        />
                        <label for="type2">TV Show</label>
                      </li>
                    </ul>
                  </div> */}

                  <div className="col-12">
                    <div className="row">
                      {type !== "Music" ? (
                        <>
                          <div className="col-12 col-lg-6">
                            <div className="form__video">
                              <label id="movie1" for="form__video-upload">
                                {videos}
                              </label>
                              <input
                                data-name="#movie1"
                                id="form__video-upload"
                                name="movie"
                                className="form__video-upload"
                                type="file"
                                accept="video/mp4,video/x-m4v,video/*,.mkv"
                                onChange={(e) => changeVideo(e)}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-lg-6">
                            <div className="form__video">
                              <label id="movie2" for="form__video-upload1">
                                {trailers}
                              </label>
                              <input
                                data-name="#movie2"
                                id="form__video-upload1"
                                name="trailer"
                                className="form__video-upload"
                                type="file"
                                accept="video/mp4,video/x-m4v,video/*, .mkv"
                                onChange={(e) => changeTrailer(e)}
                              />
                            </div>
                          </div>

                          {/* <div className="col-12 col-lg-6">
                        <div className="form__group form__group--link">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="or add a link (mp4)"
                          />
                        </div>
                      </div> */}
                          {uploadPercentage3 > 0 && (
                            <div className="col-12 col-lg-6">
                              <div className="">
                                <ProgressBar
                                  now={uploadPercentage3}
                                  label={`video(${uploadPercentage3}%)`}
                                />
                              </div>
                            </div>
                          )}

                          {uploadPercentage4 > 0 && (
                            <div className="col-12 col-lg-6">
                              <div className="">
                                <ProgressBar
                                  now={uploadPercentage4}
                                  label={`trailer(${uploadPercentage4}%)`}
                                />
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="col-12 col-lg-12">
                            <div className="form__video">
                              <label id="movie1" for="form__video-upload3">
                                {audio}
                              </label>
                              <input
                                data-name="#movie1"
                                id="form__video-upload3"
                                name="movie"
                                className="form__video-upload"
                                type="file"
                                accept="audio/*"
                                onChange={(e) => changeVideo(e)}
                              />
                            </div>
                          </div>

                          {uploadPercentage3 > 0 && (
                            <div className="col-12 col-lg-12">
                              <div className="">
                                <ProgressBar
                                  now={uploadPercentage3}
                                  label={`audio(${uploadPercentage3}%)`}
                                />
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      <div className="col-12 col-lg-12 mb-5 add_content_select">
                        <Select
                          defaultValue={null}
                          placeholder="Select a category"
                          options={options}
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
                        {uploadPercentage +
                          uploadPercentage1 +
                          uploadPercentage2 +
                          uploadPercentage3 +
                          uploadPercentage4 ===
                        (type === "Music" ? 400 : 500) ? (
                          <>
                            {isFetching ? (
                              <>
                                <button
                                  type="button"
                                  className="form__btn"
                                  disabled={true}
                                >
                                  publishing...
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="form__btn"
                                  onClick={() => addMovie()}
                                >
                                  publish
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {uploadPercentage > 0 && uploadPercentage < 500 ? (
                              <>
                                <button
                                  type="button"
                                  className="form__btn"
                                  disabled={true}
                                >
                                  uploading...
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="form__btn"
                                  onClick={() => uploadMovie()}
                                >
                                  upload
                                </button>
                              </>
                            )}
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

export default AddItem;
