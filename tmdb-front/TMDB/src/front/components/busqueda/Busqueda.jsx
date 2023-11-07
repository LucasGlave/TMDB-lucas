import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "./busqueda.scss";
import Navbar from "../navbar/Navbar";
import { useModal } from "../../commons/modal/ModalContext";
import Modal from "../../commons/modal/Modal";

const Busqueda = () => {
  const [peliculasBuscadas, setPeliculasBuscadas] = useState([]);
  const { busqueda } = useParams();
  const { openModal } = useModal();
  const handleModal = (pelicula) => {
    openModal({
      title: pelicula.title,
      image: `https://image.tmdb.org/t/p/original/${pelicula.poster_path}`,
      description: pelicula.overview,
    });
  };
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/search/multi", {
        params: {
          query: busqueda,
          page: "1",
          language: "es-419",
          api_key: "a8b1c395b2742185f0c669c78c9a3bc2",
        },
      })
      .then((res) => res.data)
      .then((peliculas) => {
        const peliculasConImagenes = peliculas.results.filter(
          (pelicula) => pelicula.poster_path !== undefined
        );
        setPeliculasBuscadas(peliculasConImagenes);
      })
      .catch((err) => console.error(err));
  }, [busqueda]);

  return (
    <>
      <Modal />
      <Navbar />
      <div className="busqueda">
        <div className="wrap">
          {peliculasBuscadas.length > 0 ? (
            peliculasBuscadas.map((pelicula) => (
              <div
                key={pelicula.id}
                className="cardBusqueda"
                onClick={() => handleModal(pelicula)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`}
                  alt={pelicula.title}
                />
              </div>
            ))
          ) : (
            <h1 style={{ color: "white" }}>No se ha encontrado contenido.</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Busqueda;
