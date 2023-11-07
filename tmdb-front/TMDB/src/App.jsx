import { Route, Routes } from "react-router";
import "./app.scss";
import Registro from "./front/components/registro/Registro";
import Login from "./front/components/login/Login";
import Inicio from "./front/components/inicio/Inicio";
import Busqueda from "./front/components/busqueda/Busqueda";
import { ModalProvider } from "./front/commons/modal/ModalContext";
import Favoritos from "./front/components/favoritos/Favoritos";
import { UserProvider } from "./front/components/inicio/userContext";

function App() {
  return (
    <div>
      <UserProvider>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/*" element={<Inicio />} />
            <Route path="/user/registro" element={<Registro />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/favoritos/:userId" element={<Favoritos />} />
            <Route path="/busqueda/:busqueda" element={<Busqueda />} />
          </Routes>
        </ModalProvider>
      </UserProvider>
    </div>
  );
}

export default App;
