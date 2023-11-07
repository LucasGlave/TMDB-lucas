import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./categorias.scss";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Modal from "../../commons/modal/Modal";
import { useModal } from "../../commons/modal/ModalContext";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

const Categoria = ({ peliculas, categoria }) => {
  const { openModal } = useModal();
  const handleModal = (pelicula) => {
    openModal({
      title: pelicula.title,
      image: `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`,
      description: pelicula.overview,
      movieId: pelicula.id,
    });
  };
  return (
    <div>
      <Modal />
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {peliculas.map((pelicula) => (
          <SwiperSlide
            key={`${categoria.name} - ${pelicula.id}`}
            className="card"
            onClick={() => handleModal(pelicula)} // descubrir por que renderiza mal la imagen aca y en busqueda no
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
              alt={pelicula.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <h2
        style={{
          textAlign: "center",
          marginTop: "2rem",
          textTransform: "uppercase",
        }}
      >
        {categoria.name}
      </h2>
      {categoria.id !== 37 && (
        <hr
          style={{
            border: "0",
            borderTop: "2px solid #4a83f9",
            margin: "30px 0",
            width: "100%",
            justifyContent: "center",
            boxShadow: "inset 2px 5px 10px rgb(85, 84, 84)",
          }}
        ></hr>
      )}
    </div>
  );
};

export default Categoria;
