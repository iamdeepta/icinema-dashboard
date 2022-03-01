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

const CompressImage = () => {
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
  lists.map((item) => options.push({ value: item._id, label: item.title }));

  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];

  //const [thumbnail, setThumbnail] = useState("");
  // const [title_pic, setTitlePic] = useState("Upload Title Image");
  // const [small_pic, setSmallPic] = useState("Upload Small Image");
  const [cover_pic, setCoverPic] = useState("Select an Image");
  // const [videos, setVideos] = useState("Upload video (mp4)");
  // const [trailers, setTrailers] = useState("Upload trailer (mp4)");
  // const [audio, setAudio] = useState("Upload audio");

  const [imgPic, setImgPic] = useState(null);

  // useEffect(() => {
  //   setTime(null);
  //   setTimeBn(null);
  //   setSeason(null);
  //   setSeasonBn(null);
  //   setEpisode(null);
  //   setEpisodeBn(null);
  //   setTotalSeason(null);
  //   setTotalSeasonBn(null);
  //   if (type === "Music") {
  //     setTrailer(null);
  //     setTrailers("Upload trailer (mp4)");
  //   }
  // }, [type]);

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

    // setTimeout(() => {
    //   document.querySelector(".compress_image_link").click();
    // }, 2000);

    //console.log(thumbnail);
  };

  const compressImage = () => {
    document.querySelector(".compress_image_link").click();
  };

  // const changeTitlePic = (e) => {
  //   setTitlePic(e.target.files[0].name);
  //   setImgTitle(e.target.files[0]);

  //   //console.log(title_pic);
  // };

  // const changeSmallPic = (e) => {
  //   setSmallPic(e.target.files[0].name);
  //   setImgSm(e.target.files[0]);
  // };

  // const changeVideo = (e) => {
  //   setVideos(e.target.files[0].name);
  //   setAudio(e.target.files[0].name);
  //   setVideo(e.target.files[0]);
  // };

  // const changeTrailer = (e) => {
  //   setTrailers(e.target.files[0].name);
  //   setTrailer(e.target.files[0]);
  // };

  // const uploadMovie = async () => {
  //   // e.preventDefault();
  //   //cover image
  //   if (
  //     !img ||
  //     !imgSm ||
  //     !imgTitle ||
  //     !video ||
  //     (type !== "Music" && !trailer)
  //   ) {
  //     toast.error("Please select all images, video and trailer");
  //   } else {
  //     const formData = new FormData();
  //     formData.append("img", img);
  //     formData.append("imgSm", imgSm);
  //     formData.append("imgTitle", imgTitle);
  //     formData.append("video", video);
  //     if (type !== "Music") {
  //       formData.append("trailer", trailer);
  //     }

  //     // S3FileUpload.uploadFile(img, config)
  //     //   .then((data) => {
  //     //     console.log(data.location);
  //     //   })
  //     //   .catch((err) => console.log(err));

  //     //upload files to aws s3 bucket
  //     // get secure url from our server
  //     const { url } = await fetch(AppUrl.base_url + "/uploadFile").then((res) =>
  //       res.json()
  //     );

  //     const { imgTitle_url } = await fetch(
  //       AppUrl.base_url + "/uploadFile/imgTitle"
  //     ).then((res) => res.json());

  //     const { imgSm_url } = await fetch(
  //       AppUrl.base_url + "/uploadFile/imgSm"
  //     ).then((res) => res.json());

  //     const { trailer_url } = await fetch(
  //       AppUrl.base_url + "/uploadFile/trailer"
  //     ).then((res) => res.json());

  //     const { video_url } = await fetch(
  //       AppUrl.base_url + "/uploadFile/video"
  //     ).then((res) => res.json());
  //     //console.log(url);

  //     // // post the image direclty to the s3 bucket
  //     // await fetch(url, {
  //     //   method: "PUT",
  //     //   headers: {
  //     //     "Content-Type": "multipart/form-data",
  //     //   },
  //     //   body: img,
  //     // });

  //     // const imageUrl = url.split("?")[0];
  //     // console.log(imageUrl);

  //     try {
  //       const res = await axios.put(url, img, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         onUploadProgress: (progressEvent) => {
  //           setUploadPercentage(
  //             parseInt(
  //               Math.round((progressEvent.loaded * 100) / progressEvent.total)
  //             )
  //           );
  //         },
  //       });

  //       // Clear percentage
  //       //setTimeout(() => setUploadPercentage(0), 10000);
  //       setImgUrl(url.split("?")[0]);
  //       const { fileName, filePath } = res.data;

  //       setUploadedFile({
  //         fileName,
  //         filePath,
  //       });

  //       //console.log(uploadedFile);

  //       setMessage("File Uploaded");
  //     } catch (err) {
  //       if (err.response.status === 500) {
  //         toast.error("There was a problem with the server");
  //       } else {
  //         toast.error(err.response.data.msg);
  //       }
  //       setUploadPercentage(0);
  //     }

  //     try {
  //       const res = await axios.put(imgTitle_url, imgTitle, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         onUploadProgress: (progressEvent) => {
  //           setUploadPercentage1(
  //             parseInt(
  //               Math.round((progressEvent.loaded * 100) / progressEvent.total)
  //             )
  //           );
  //         },
  //       });

  //       // Clear percentage
  //       //setTimeout(() => setUploadPercentage(0), 10000);
  //       setImgTitleUrl(imgTitle_url.split("?")[0]);
  //       const { fileName, filePath } = res.data;

  //       setUploadedFile1({
  //         fileName,
  //         filePath,
  //       });

  //       //console.log(uploadedFile);

  //       setMessage("File Uploaded");
  //     } catch (err) {
  //       if (err.response.status === 500) {
  //         toast.error("There was a problem with the server");
  //       } else {
  //         toast.error(err.response.data.msg);
  //       }
  //       setUploadPercentage1(0);
  //     }

  //     // try {
  //     //   const res = await axios.post(AppUrl.base_url + "/upload1", formData, {
  //     //     headers: {
  //     //       token:
  //     //         "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
  //     //       "Content-Type": "multipart/form-data",
  //     //     },
  //     //     onUploadProgress: (progressEvent) => {
  //     //       setUploadPercentage1(
  //     //         parseInt(
  //     //           Math.round((progressEvent.loaded * 100) / progressEvent.total)
  //     //         )
  //     //       );
  //     //     },
  //     //   });

  //     //   // Clear percentage
  //     //   //setTimeout(() => setUploadPercentage(0), 10000);

  //     //   const { fileName, filePath } = res.data;

  //     //   setUploadedFile1({
  //     //     fileName,
  //     //     filePath,
  //     //   });

  //     //   //console.log(uploadedFile);

  //     //   setMessage("File Uploaded");
  //     // } catch (err) {
  //     //   if (err.response.status === 500) {
  //     //     toast.error("There was a problem with the server");
  //     //   } else {
  //     //     toast.error(err.response.data.msg);
  //     //   }
  //     //   setUploadPercentage1(0);
  //     // }

  //     try {
  //       const res = await axios.put(imgSm_url, imgSm, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         onUploadProgress: (progressEvent) => {
  //           setUploadPercentage2(
  //             parseInt(
  //               Math.round((progressEvent.loaded * 100) / progressEvent.total)
  //             )
  //           );
  //         },
  //       });

  //       // Clear percentage
  //       //setTimeout(() => setUploadPercentage(0), 10000);
  //       setImgSmUrl(imgSm_url.split("?")[0]);
  //       const { fileName, filePath } = res.data;

  //       setUploadedFile2({
  //         fileName,
  //         filePath,
  //       });

  //       //console.log(uploadedFile);

  //       setMessage("File Uploaded");
  //     } catch (err) {
  //       if (err.response.status === 500) {
  //         toast.error("There was a problem with the server");
  //       } else {
  //         toast.error(err.response.data.msg);
  //       }
  //       setUploadPercentage2(0);
  //     }

  //     if (type !== "Music") {
  //       try {
  //         const res = await axios.put(trailer_url, trailer, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //           onUploadProgress: (progressEvent) => {
  //             setUploadPercentage3(
  //               parseInt(
  //                 Math.round((progressEvent.loaded * 100) / progressEvent.total)
  //               )
  //             );
  //           },
  //         });

  //         // Clear percentage
  //         //setTimeout(() => setUploadPercentage(0), 10000);
  //         setTrailerUrl(trailer_url.split("?")[0]);
  //         const { fileName, filePath } = res.data;

  //         setUploadedFile3({
  //           fileName,
  //           filePath,
  //         });

  //         //console.log(uploadedFile);

  //         setMessage("File Uploaded");
  //         if (type === "Music") {
  //           toast.success("You can publish now");
  //         }
  //       } catch (err) {
  //         if (err.response.status === 500) {
  //           toast.error("There was a problem with the server");
  //         } else {
  //           toast.error(err.response.data.msg);
  //         }
  //         setUploadPercentage3(0);
  //       }
  //     }

  //     //if (type !== "Music") {
  //     try {
  //       const res = await axios.put(video_url, video, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         onUploadProgress: (progressEvent) => {
  //           setUploadPercentage4(
  //             parseInt(
  //               Math.round((progressEvent.loaded * 100) / progressEvent.total)
  //             )
  //           );
  //         },
  //       });

  //       // Clear percentage
  //       //setTimeout(() => setUploadPercentage(0), 10000);
  //       setVideoUrl(video_url.split("?")[0]);
  //       const { fileName, filePath } = res.data;

  //       setUploadedFile4({
  //         fileName,
  //         filePath,
  //       });

  //       //console.log(uploadedFile);

  //       setMessage("File Uploaded");
  //       toast.success("You can publish now");
  //     } catch (err) {
  //       if (err.response.status === 500) {
  //         toast.error("There was a problem with the server");
  //       } else {
  //         toast.error(err.response.data.msg);
  //       }
  //       setUploadPercentage4(0);
  //     }
  //     //}
  //   }
  // };

  // const addMovie = () => {
  //   if (
  //     !title ||
  //     !title_bn ||
  //     !desc ||
  //     !desc_bn ||
  //     !year ||
  //     !year_bn ||
  //     !time ||
  //     !time_bn ||
  //     !genre ||
  //     !genre_bn ||
  //     !category ||
  //     (type !== "Music" && !age) ||
  //     !cast ||
  //     !cast_bn ||
  //     !director ||
  //     !director_bn ||
  //     !writer ||
  //     !writer_bn ||
  //     !type ||
  //     !img ||
  //     !imgTitle ||
  //     !imgSm ||
  //     (type !== "Music" && !trailer) ||
  //     !video
  //   ) {
  //     toast.error("Please fill up all the empty fields");
  //   } else {
  //     if (type !== "Music") {
  //       createMovie(
  //         {
  //           title,
  //           title_bn,
  //           desc,
  //           desc_bn,
  //           year,
  //           year_bn,
  //           time,
  //           time_bn,
  //           genre,
  //           genre_bn,
  //           age,
  //           age_bn,
  //           cast,
  //           cast_bn,
  //           director,
  //           director_bn,
  //           writer,
  //           writer_bn,
  //           type,
  //           category,
  //           episode,
  //           episode_bn,
  //           season,
  //           season_bn,
  //           totalSeason,
  //           totalSeason_bn,
  //           img: imgUrl.substring(imgUrl.lastIndexOf("/") + 1),
  //           imgTitle: imgTitleUrl.substring(imgTitleUrl.lastIndexOf("/") + 1),
  //           imgSm: imgSmUrl.substring(imgSmUrl.lastIndexOf("/") + 1),
  //           video: videoUrl.substring(videoUrl.lastIndexOf("/") + 1),
  //           trailer: trailerUrl.substring(trailerUrl.lastIndexOf("/") + 1),
  //           // trailer: uploadedFile4.filePath,
  //         },
  //         dispatch
  //       );
  //     } else {
  //       createMovie(
  //         {
  //           title,
  //           title_bn,
  //           desc,
  //           desc_bn,
  //           year,
  //           year_bn,
  //           time,
  //           time_bn,
  //           genre,
  //           genre_bn,
  //           age,
  //           age_bn,
  //           cast,
  //           cast_bn,
  //           director,
  //           director_bn,
  //           writer,
  //           writer_bn,
  //           type,
  //           category,
  //           episode,
  //           episode_bn,
  //           season,
  //           season_bn,
  //           totalSeason,
  //           totalSeason_bn,
  //           img: imgUrl.substring(imgUrl.lastIndexOf("/") + 1),
  //           imgTitle: imgTitleUrl.substring(imgTitleUrl.lastIndexOf("/") + 1),
  //           imgSm: imgSmUrl.substring(imgSmUrl.lastIndexOf("/") + 1),
  //           video: videoUrl.substring(videoUrl.lastIndexOf("/") + 1),
  //           // trailer: trailerUrl,
  //           // trailer: uploadedFile4.filePath,
  //         },
  //         dispatch
  //       );
  //     }

  //     if (!error) {
  //       toast.success("Uploaded Successfully");
  //       setTitle(null);
  //       setTitleBn(null);
  //       setDesc(null);
  //       setDescBn(null);
  //       setYear(null);
  //       setYearBn(null);
  //       setTime(null);
  //       setTimeBn(null);
  //       setGenre(null);
  //       setGenreBn(null);
  //       setAge(null);
  //       setAgeBn(null);
  //       setCast(null);
  //       setCastBn(null);
  //       setDirector(null);
  //       setDirectorBn(null);
  //       setWriter(null);
  //       setWriterBn(null);
  //       setEpisode(null);
  //       setEpisodeBn(null);
  //       setSeason(null);
  //       setSeasonBn(null);
  //       setTotalSeason(null);
  //       setTotalSeasonBn(null);
  //       setCoverPic("Upload cover image");
  //       setSmallPic("Upload small image");
  //       setTitlePic("Upload title image");
  //       setVideos("Upload video (mp4)");
  //       setTrailers("Upload trailers (mp4)");
  //       setImg(null);
  //       setImgSm(null);
  //       setImgTitle(null);
  //       setVideo(null);
  //       setTrailer(null);
  //       setUploadPercentage(0);
  //       setUploadPercentage1(0);
  //       setUploadPercentage2(0);
  //       setUploadPercentage3(0);
  //       setUploadPercentage4(0);
  //       if (!isFetching) {
  //         setTimeout(() => {
  //           window.location.reload();
  //         }, 3000);
  //       }
  //     } else {
  //       toast.error("This title is created before");
  //     }
  //   }
  // };
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
                <h2>Compress Image</h2>
              </div>
            </div>
            {/* <!-- end main title --> */}

            {/* <!-- form --> */}
            <div className="col-12">
              <form action="#" className="form">
                <div className="row">
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
                  </div> */}

                  <div className="col-12 col-md-12 form__cover">
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-12">
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

                        <div className="imgCov">
                          <a
                            href={imgPic}
                            download
                            style={{ opacity: 0 }}
                            className="compress_image_link"
                          >
                            {/* <img src={imgPic} alt="" /> */}
                          </a>
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
                      <div className="col-12">
                        <button
                          type="button"
                          className="form__btn"
                          onClick={() => compressImage()}
                        >
                          download
                        </button>
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

export default CompressImage;
