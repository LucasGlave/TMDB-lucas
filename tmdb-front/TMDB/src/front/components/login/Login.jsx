import React, { useState } from "react";
import axios from "axios";
import "../categoria/categorias.scss";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const [formData, setFormData] = useState({
    email: "",
    contraseña: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.contraseña) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    axios
      .post(`http://localhost:5000/api/user/login`, formData, {
        withCredentials: true,
      })
      .then(() => {
        setFormData({
          email: "",
          contraseña: "",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="back">
      <img src="../../../4.png" alt="logo"></img>
      <div className="wrapper">
        <h1>Inicio de sesión</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              value={formData.email}
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              value={formData.contraseña}
              type="password"
              name="contraseña"
              placeholder="Contraseña"
              onChange={handleInputChange}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="animated-button">
            <span>Iniciar sesión</span>
            <span></span>
          </button>
          <p style={{ textAlign: "center" }}> Desea Registrarse?</p>
          <Link className="animated-button" to={"/user/registro"}>
            <span style={{ color: "#FFFFFF" }}>Registro</span>
            <span></span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
