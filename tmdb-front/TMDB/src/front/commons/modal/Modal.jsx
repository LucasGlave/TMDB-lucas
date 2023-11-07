import React from "react";
import { useModal } from "./ModalContext";
import "./modal.scss";
import { useUser } from "../../components/inicio/userContext";
import axios from "axios";
import { useParams } from "react-router";

function Modal() {
  const user = useUser();
  const { modalAbierto, modalContent, closeModal } = useModal();
  const clickFav = (pelicula) => {
    console.log(pelicula);
    if (user && user.id) {
      axios
        .post(`http://localhost:5000/api/favoritos/${user.id}`, {
          movieId: pelicula.movieId,
        })
        .then(() => console.log("subida"));
    }
  };
  return modalAbierto ? (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content">
        <div className="innerCard">
          <div className="frontSide">
            <img src={modalContent.image} alt={modalContent.title} />
          </div>
          <div className="backSide">
            <img src={modalContent.image} alt={modalContent.title} />
            {modalContent.title ? <h2>{modalContent.title}</h2> : null}
            {modalContent.description ? (
              <p>{modalContent.description}</p>
            ) : null}
            <button
              onClick={() => clickFav(modalContent)}
              style={{ zIndex: "1" }}
              className="botonCard"
            >
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span>Fav</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Modal;
