import React, { useEffect, useState } from "react";
import axios from "axios";
import Categoria from "./Categoria";
import "./categorias.scss";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [peliculasPorCategoria, setPeliculasPorCategoria] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        params: {
          api_key: "a8b1c395b2742185f0c669c78c9a3bc2",
        },
      })
      .then((res) => res.data)
      .then((generos) => {
        setCategorias(generos.genres);
      });
  }, []);

  useEffect(() => {
    categorias.forEach((categoria) => {
      axios
        .get("https://api.themoviedb.org/3/discover/movie", {
          params: {
            api_key: "a8b1c395b2742185f0c669c78c9a3bc2",
            language: "es-419",
            with_genres: categoria.id,
          },
        })
        .then((res) => res.data)
        .then((peliculas) => {
          setPeliculasPorCategoria((prevPeliculas) => [
            ...prevPeliculas,
            { categoria, peliculas: peliculas.results },
          ]);
        });
    });
  }, [categorias]);

  return (
    <div className="backMovies">
      <h3
        style={{
          textAlign: "center",
          color: "white",
          width: "30%",
          marginTop: "5rem",
          textTransform: "uppercase",
          fontWeight: "900",
        }}
      >
        ¡Bienvenido a Sky Movie! Explora una amplia selección de emocionantes
        películas y series. Sumérgete en el mundo del cine y disfruta de
        entretenimiento de primera calidad. ¡Prepárate para una experiencia
        cinematográfica única en Sky Movie!
      </h3>
      <div
        style={{
          width: "100%",
          color: "white",
        }}
        className="movies"
      >
        {peliculasPorCategoria.map(({ categoria, peliculas }) => (
          <Categoria
            key={categoria.id}
            categoria={categoria}
            peliculas={peliculas}
          />
        ))}
      </div>
    </div>
  );
};

export default Categorias;
