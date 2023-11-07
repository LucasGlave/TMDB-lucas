import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useInput from "../../hooks/useInput";
import { useUser } from "../inicio/userContext";

const Navbar = () => {
  const user = useUser();
  const search = useInput();
  const navigate = useNavigate();

  const botonCerrar = () => {
    axios.post(
      "http://localhost:5000/api/user/logout",
      {},
      {
        withCredentials: true,
      }
    );
    navigate("/user/login");
  };
  const botonFavoritos = () => {
    navigate(`/favoritos/${user.id}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/busqueda/${search.value}`);
  };
  return (
    <div
      className="nav"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4rem",
        height: "4rem",
      }}
    >
      <Link to={"/"}>
        <div style={{ paddingRight: "9.5rem" }}>
          <img
            src="../../../7.png"
            alt="logo"
            width={"100px"}
            height={"100px"}
          />
        </div>
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          {...search}
          placeholder="Buscar película"
          className="input"
          type="text"
        ></input>
      </form>
      <div
        style={{
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
        }}
      >
        <button onClick={botonCerrar} className="cssbuttons-io-button">
          Cerrar sesión
          <div className="icon">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
        <button onClick={botonFavoritos} className="cssbuttons-io-button">
          Favoritos
          <div className="icon">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
