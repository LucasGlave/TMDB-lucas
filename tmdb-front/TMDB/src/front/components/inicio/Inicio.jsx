import React, { useEffect, useState } from "react";
import "../categoria/categorias.scss";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Registro from "../registro/Registro";
import Categorias from "../categoria/Categorias";
import { useUser } from "./userContext";

const Inicio = () => {
  const user = useUser();

  return (
    <div>
      {user.email ? (
        <div>
          <Navbar />
          <Categorias />
        </div>
      ) : (
        <Registro />
      )}
    </div>
  );
};

export default Inicio;
