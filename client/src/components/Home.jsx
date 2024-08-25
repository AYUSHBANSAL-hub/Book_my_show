import { useContext, useEffect, useState } from "react";
import MovieCard from "./movie_card/MovieCard";
import "../style/home.css";
import Menubar from "./menubar/Menubar";
import PrivacyNote from "./privacyNote/PrivacyNote";
import Footer from "./footer/Footer";
import Modal from "react-bootstrap/Modal";
import LocationPicker from "./LocationPickup/LocationPicker";
import { AppContext } from "../contexts/AppContext";
import Navbar from "./navbar/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { movies as mockMovies } from "../mockData.js";
import { Link } from "react-router-dom";

export default function () {
  const [movies, setMovies] = useState({
    recommendedMovies: [],
  });
  const imagesCard = [
    "https://in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTcwKyBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300/workshops-collection-202007231330.png",
    "https://in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTAgRXZlbnRz,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300/fitness-collection-2020081150.png",
    "https://in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NDArIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300/kids-collection-202007220710.png",
    "https://in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTUwKyBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300/comedy-shows-collection-202007220710.png",
    "https://in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MzUrIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300/music-shows-collection-202007220710.png",
  ];
  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmU5OGU3MmNjYmMyZjY1NTNmNDkxOWJmNmI5ZGM1OSIsIm5iZiI6MTcyNDU2OTI3NC45NjUyODMsInN1YiI6IjYxMWJhNTlkODdmM2YyMDA0NTRlMTJlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QkhXZtfhO8Je8G2Thmk_TusUai29867PQkL9-Dfm_NY",
        },
      };
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          options
        );
        const data = await response.json();
        setMovies({ recommendedMovies: data.results });
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const [showModal, setShowModal] = useState(false);
  let { city, handleChange } = useContext(AppContext);
  console.log(city, handleChange);
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveheight: false,
    autoplay: true,
    autoplaySpeed: 2599,
  };
  function handleClose(e) {
    setShowModal(false);
  }
  function toggleLocationPickup(e) {
    console.log(e);
    let set = !showModal;
    setShowModal(set);
  }
  useEffect(async () => {
    window.addEventListener("load", (e) => {
      setShowModal(true);
    });
  }, []);
  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    // Add more genres as needed
  };
  return (
    <>
      <Modal
        size="xl"
        show={showModal}
        onHide={handleClose}
        style={{}}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <LocationPicker handleClose={handleClose} />
        </Modal.Body>

        <p className="red">View All Cities</p>
      </Modal>

      <Navbar toggle={toggleLocationPickup} />
      <Menubar />

      <Slider
        {...settings}
        style={{
          maxWidth: "100%",
          maxHeight: "324px",
          marginRight: "20px",
          marginLeft: "20px",
          marginTop: "20px",
        }}
      >
        <div>
          <img
            src="https://in.bmscdn.com/promotions/cms/creatives/1639378314392_revisedbanner2.jpg"
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div>
        <div>
          <img
            src="https://in.bmscdn.com/promotions/cms/creatives/1639051788302_sunburn.jpg"
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div>
        <div>
          <img
            src="https://in.bmscdn.com/promotions/cms/creatives/1637323134871_divinepunyapaaptour_webshowcase_1240x300.jpg"
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div>
      </Slider>

      <div className="container-fluid padd">
        <div className="left">
          <p className="heading-4">Recommended Movies</p>
        </div>
        <div className="right">
          <p className="heading-3">see all &#8594; </p>
        </div>
        <div className="clear"></div>
      </div>

      <div className="container-fluid movies-list">
        {movies.recommendedMovies?.map((el, index) => {
          return (
            <Link to={`/movie/${el._id}`} key={el._id}>
              <MovieCard
                title={el.title}
                image={`https://image.tmdb.org/t/p/original/${el.poster_path}`}
                tag={genreMap[el.genre_ids[0]] || "Unknown"} // Map genre ID to genre name
                headingColor="white"
                subHeadColor="white"
              />
            </Link>
          );
        })}
      </div>

      <br />

      <img
        className="img-fluid padded-img"
        src="https://in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/lead-in-v3-collection-202102040828.png"
      />

      <br />

      <p className="heading-4">The Best Of Entertainment</p>

      <div className="image-flex">
        <br />

        {imagesCard.map((el) => {
          return <img src={el} />;
        })}
      </div>

      <br />
      <div> Ayush</div>
      <div className="premier-container">
        <img
          className="img-fluid padded-img "
          src="https://in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/premiere-rupay-banner-web-collection-202104230555.png"
        />

        <br />
        <br />

        <div className="container-fluid movies-list">
          {movies.recommendedMovies?.map((el, index) => {
            return (
              <Link to={`/movie/${el._id}`} key={el._id}>
                <MovieCard
                  title={el.title}
                  image={`https://image.tmdb.org/t/p/original/${el.poster_path}`}
                  tag={genreMap[el.genre_ids[0]] || "Unknown"} // Map genre ID to genre name
                  headingColor="white"
                  subHeadColor="white"
                />
              </Link>
            );
          })}
        </div>
      </div>

      <br />

      <div className="container-fluid padd">
        <div className="left">
          <p className="heading-4">Top Games &amp; Sports Events</p>
        </div>
        <div className="right">
          <p className="heading-3">see all &#8594; </p>
        </div>
        <div className="clear"></div>
      </div>

      <div className="container-fluid movies-list">
        {movies.recommendedMovies?.map((el, index) => {
          return (
            <Link to={`/movie/${el._id}`} key={el._id}>
              <MovieCard
                title={el.title}
                image={`https://image.tmdb.org/t/p/original/${el.poster_path}`}
                tag={genreMap[el.genre_ids[0]] || "Unknown"} // Map genre ID to genre name
                headingColor="white"
                subHeadColor="white"
              />
            </Link>
          );
        })}
      </div>
      <br />

      <div className="container-fluid padd">
        <div className="left">
          <p className="heading-4">Top Games &amp; Sports Events</p>
        </div>
        <div className="right">
          <p className="heading-3">see all &#8594; </p>
        </div>
        <div className="clear"></div>
      </div>

      <div className="container-fluid movies-list">
        {movies.recommendedMovies?.map((el, index) => {
          return (
            <Link to={`/movie/${el._id}`} key={el._id}>
              <MovieCard
                title={el.title}
                image={`https://image.tmdb.org/t/p/original/${el.poster_path}`}
                tag={genreMap[el.genre_ids[0]] || "Unknown"} // Map genre ID to genre name
                headingColor="white"
                subHeadColor="white"
              />
            </Link>
          );
        })}
      </div>
      <br />

      <div className="container-fluid padd">
        <div className="left">
          <p className="heading-4">Top Games &amp; Sports Events</p>
        </div>
        <div className="right">
          <p className="heading-3">see all &#8594; </p>
        </div>
        <div className="clear"></div>
      </div>

      <div className="container-fluid movies-list">
        {movies.recommendedMovies?.map((el, index) => {
          return (
            <Link to={`/movie/${el._id}`} key={el._id}>
              <MovieCard
                title={el.title}
                image={`https://image.tmdb.org/t/p/original/${el.poster_path}`}
                tag={genreMap[el.genre_ids[0]] || "Unknown"} // Map genre ID to genre name
                headingColor="white"
                subHeadColor="white"
              />
            </Link>
          );
        })}
      </div>
      <br />

      <div className="container-fluid padd">
        <div className="left">
          <p className="heading-4">Top Games &amp; Sports Events</p>
        </div>
        <div className="right">
          <p className="heading-3">see all &#8594; </p>
        </div>
        <div className="clear"></div>
      </div>

      <div className="container-fluid movies-list">
        {movies.recommendedMovies?.map((el, index) => {
          return (
            <Link to={`/movie/${el._id}`} key={el._id}>
              <MovieCard
                title={el.title}
                image={`https://image.tmdb.org/t/p/original/${el.poster_path}`}
                tag={genreMap[el.genre_ids[0]] || "Unknown"} // Map genre ID to genre name
                headingColor="white"
                subHeadColor="white"
              />
            </Link>
          );
        })}
      </div>
      <PrivacyNote />
      <Footer />
    </>
  );
}
