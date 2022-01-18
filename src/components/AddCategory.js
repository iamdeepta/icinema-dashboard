import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import storage from "../firebase";
import { createMovie } from "../context/movieContext/apiCalls";
import { MovieContext } from "../context/movieContext/MovieContext";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";
import "./css/add_item.scss";
import { ListContext } from "../context/listContext/ListContext";
import { createList } from "../context/listContext/apiCalls";

const AddCategory = () => {
  const [title, setTitle] = useState(null);

  const [type, setType] = useState(null);
  const [catSlug, setCatSlug] = useState(null);

  useEffect(() => {
    if (title !== null) {
      setCatSlug(title.toString().toLowerCase().replace(" ", "-"));
    }
  }, [title]);

  const { isFetching, error, dispatch } = useContext(ListContext);

  const addCategory = () => {
    if (!title || !type) {
      toast.error("Please fill up all the empty fields");
    } else {
      createList(
        {
          title,
          type,
          catSlug,
        },
        dispatch
      );
      if (!error) {
        toast.success("Added Successfully");
        setTitle(null);

        window.location.reload();
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
                <h2>Add new category</h2>
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
                        <span>Page Name:</span>
                      </li>
                      <li>
                        <input
                          id="type1"
                          type="radio"
                          name="type"
                          value="Home"
                          onChange={(e) => setType(e.target.value)}
                          // checked={type === "Series"}
                        />
                        <label for="type1">Home</label>
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
                          value="Movies"
                          onChange={(e) => setType(e.target.value)}
                          // checked={type === "Series"}
                        />
                        <label for="type3">Movies</label>
                      </li>
                      <li>
                        <input
                          id="type4"
                          type="radio"
                          name="type"
                          value="Popular"
                          onChange={(e) => setType(e.target.value)}
                          // checked={type === "Series"}
                        />
                        <label for="type4">New and Popular</label>
                      </li>
                      <li>
                        <input
                          id="type5"
                          type="radio"
                          name="type"
                          value="Music"
                          onChange={(e) => setType(e.target.value)}
                          // checked={type === "Series"}
                        />
                        <label for="type5">Music</label>
                      </li>
                    </ul>
                  </div>

                  {/* <div className="col-12 col-md-5 form__cover">
                    <div className="row">
                      <div className="col-12 col-sm-6 col-md-12">
                        <div className="form__img">
                          <label for="form__img-upload">{cover_pic}</label>
                          <input
                            id="form__img-upload"
                            name="form__img-upload"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={(e) => selectCoverImage(e)}
                          />
                          <img id="form__img" src={cover_pic} alt=" " />
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
                  </div> */}

                  <div className="col-12 col-md-7 form__content">
                    <div className="row">
                      <div className="col-12">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* <div className="col-12">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="Slug"
                            value={catSlug}
                          />
                        </div>
                      </div> */}

                      {/* <div className="col-12">
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
                      </div> */}

                      {/* <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="Release year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                          />
                        </div>
                      </div> */}

                      {/* <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder={
                              type === "Movie"
                                ? "Duration"
                                : type === "Series"
                                ? "Total Season"
                                : "Duration/total season"
                            }
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                          />
                        </div>
                      </div> */}

                      {/* <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form__group">
                          <input
                            type="text"
                            className="form__input"
                            placeholder="Genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                          />
                        </div>
                      </div> */}

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
                      {/* {type !== "Music" && (
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
                      )} */}

                      {/* <div className="col-12 col-sm-6 col-lg-4">
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
                      </div> */}

                      {/* <div className="col-12 col-sm-6 col-lg-4">
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
                      </div> */}

                      {/* <div className="col-12 col-sm-6 col-lg-4">
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
                      </div> */}

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

                      {/* <div className="col-12 col-lg-6">
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

                      {/* <div className="col-12 col-lg-6">
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
                            accept=".png, .jpg, .jpeg"
                            multiple
                            onChange={(e) => changeSmallPic(e)}
                          />
                        </div>
                      </div> */}
                      {/* {uploadPercentage1 > 0 && (
                        <div className="col-12 col-lg-6">
                          <div className="">
                            <ProgressBar
                              now={uploadPercentage1}
                              label={`title(${uploadPercentage1}%)`}
                            />
                          </div>
                        </div>
                      )} */}

                      {/* {uploadPercentage2 > 0 && (
                        <div className="col-12 col-lg-6">
                          <div className="">
                            <ProgressBar
                              now={uploadPercentage2}
                              label={`small(${uploadPercentage2}%)`}
                            />
                          </div>
                        </div>
                      )} */}
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
                      <div className="col-12">
                        {isFetching ? (
                          <>
                            <button
                              type="button"
                              className="form__btn"
                              disabled={true}
                            >
                              Adding...
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="form__btn"
                              onClick={() => addCategory()}
                            >
                              Add
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

export default AddCategory;
