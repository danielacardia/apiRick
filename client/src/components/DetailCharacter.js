import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/detailCharacter.css";
import getConfig from "../utils/getConfig";

const DetailCharacter = () => {
  const [character, setCharacter] = useState([]);
  const { id } = useParams();
  const [button, setButton] = useState(true);

  const [selectFavorite, setSelectFavorite] = useState({});

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => setCharacter(res.data));

    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => setCharacter(res.data));
    axios
      .get(`${process.env.REACT_APP_HOST}/personajes/${id}`, getConfig())
      .then((res) => setSelectFavorite(res.data.data));
  }, []);

  const refresh = () => {
    axios
      .get(`${process.env.REACT_APP_HOST}/personajes/${id}`, getConfig())
      .then((res) => setSelectFavorite(res.data.data));
  };

  const buttonStatus = (status) => {
    if (status === "Alive") {
      return <div className="statusAlived"></div>;
    } else if (status === "Dead") {
      return <div className="statusDead"></div>;
    } else {
      return <div className="statusUnknown"></div>;
    }
  };

  const setFavorite = () => {
    axios.post(
      `${process.env.REACT_APP_HOST}/personajes/favoritos/${id}`,
      {},
      getConfig()
    );
    refresh();
  };

  const changeColor = () => {
    refresh();
    setFavorite();
    refresh();
  };
  console.log(selectFavorite?.favorite);

  return (
    <div className="detailCharacterContainer">
      <div className="detailCharacter">
        <div className="namContainer">
          <h4>{character.name}</h4>
        </div>
        <img src={character.image} alt="" />
        <div className="containerStatus">
          <div>
            <h5 className="textStatus">{character.status}</h5>
          </div>
          {buttonStatus(character.status)}
        </div>
        <h5>
          Location: <span>{character.location?.name}</span>
        </h5>
        <h5>
          Gender: <span>{character.gender}</span>
        </h5>
        <h5>
          Species: <span>{character.species}</span>
        </h5>
        <h5>
          Type: <span>{character.type}</span>
        </h5>
        <br />
        <div
          className={
            selectFavorite?.favorite ? "favoriteButtonOn" : "favoriteButton"
          }
        >
          <span> Add to favorites </span>
          <h1 className="on" onClick={() => changeColor()}>
            <FaHeart />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DetailCharacter;
