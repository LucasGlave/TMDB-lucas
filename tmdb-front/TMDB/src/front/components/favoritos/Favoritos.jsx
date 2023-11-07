import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
// import "../busqueda/busqueda.scss";
import Navbar from "../navbar/Navbar";

const Favoritos = () => {
  const [peliculas, setPeliculas] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/favoritos/${userId}`)
      .then((res) => res.data)
      .then((favoritos) => {
        const peliculasIds = favoritos.map((favorito) => favorito.movieId);
        const vinculacion = peliculasIds.map((movieId) =>
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
              api_key: "a8b1c395b2742185f0c669c78c9a3bc2",
              language: "es-419",
            },
          })
        );
        Promise.all(vinculacion).then((respuestas) => {
          const peliculas = respuestas.map((res) => res.data);
          setPeliculas(peliculas);
        });
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className="busqueda">
        <div className="wrap">
          {peliculas.length > 0 ? (
            peliculas.map((pelicula) => (
              <div key={pelicula.id} className="cardBusqueda">
                {console.log(pelicula)}
                <img
                  src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`}
                  alt={pelicula.title}
                />
              </div>
            ))
          ) : (
            <div className="busqueda">
              <h1 style={{ color: "white" }}>No se ha encontrado contenido.</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Favoritos;
