import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "../styles/user.css";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import getConfig from "../utils/getConfig";

const User = () => {
  const { handleSubmit } = useForm();

  const { id } = useParams();
  const [characters, setCharacters] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [favoriteList, setFavoriteList] = useState();
  //const [arrayFavorites,setArrayFavorites]=useState()
  let array = [];
  const [as, setAs] = useState();

  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [adress, setAdress] = useState("");
  const [city, setCity] = useState("");

  const handleClose = () => setShow(false);

  const handleShow = (user) => {
    setName(user.name);
    setBirthdate(user.birthdate);
    setAdress(user.adress);
    setCity(user.city);
    setShow(true);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST}/personajes`, getConfig())
      .then((res) => setFavoriteList(res.data.data))
      .catch((error) => console.error(error));

    axios
      .get(`https://rickandmortyapi.com/api/character/?page=2`)
      .then((res) => setCharacters(res.data.results));

    axios
      .get(`${process.env.REACT_APP_HOST}/usuarios/${id}`, getConfig())
      .then((res) => setUser(res.data.data.user));
  }, []);

  const buttonStatus = (status) => {
    if (status === "Alive") {
      return <div className="statusAlived"></div>;
    } else if (status === "Dead") {
      return <div className="statusDead"></div>;
    } else {
      return <div className="statusUnknown"></div>;
    }
  };

  const userEdit = {
    name: name,
    city,
    birthdate,
    adress,
  };

  const onSubmit = (data) => {
    axios
      .patch(
        `${process.env.REACT_APP_HOST}/usuarios/${id}`,
        userEdit,
        getConfig()
      )
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${process.env.REACT_APP_HOST}/usuarios/${id}`, getConfig())
      .then((res) => setUser(res.data.data.user));
    alert("se ha modificado el usuario con exito!");
    handleClose();
  };

  const arrayCharacteres = () => {
    favoriteList?.map((favorite) => {
      const character = favorite.ref_api;
      array.push(character);
    });
    axios
      .get(`${process.env.REACT_APP_HOST}/personajes`, getConfig())
      .then((res) => setFavoriteList(res.data.data))
      .catch((error) => console.error(error));
  };

  const toFavorites = (e) => {
    arrayCharacteres();
    const list = array.toString();

    axios
      .get(`https://rickandmortyapi.com/api/character/${list}`)
      .then((res) => {
        setAs(res.data);
        console.log(as);
        setCharacters(as);
      });
    
  };

  const refreshList = () => {
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=2`)
      .then((res) => setCharacters(res.data.results));
  };

  return (
    <div className="containerCharacterPage">
      <div className="containerUser">
        <div className="containerBanner">
          <div className="banner"></div>
        </div>
        <div className="secondBar">
          <div className="user">
            <div className="userIcon">
              <AiOutlineUser />
            </div>
            <h5 className="userInSession">{user?.name}</h5>
          </div>

          <div className="controlBar">
            <button className="selectPersonaje" onClick={toFavorites}>
              Favoritos
            </button>
          </div>
          <div className="controlBar">
            <button className="selectPersonaje" onClick={refreshList}>
              Todos{" "}
            </button>
          </div>
          <div className="editUserForm">
            <Button
              className="buttonEdit"
              variant="primary"
              onClick={handleShow}
            >
              Edit User
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Editar informacion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={user?.name}
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Label>Adress</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={
                        !user.adress ? "CARRERA 50 # 3-28" : user.adress
                      }
                      autoFocus
                      value={adress}
                      onChange={(e) => setAdress(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput3"
                  >
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={!user.city ? "Cali" : user.city}
                      autoFocus
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Birthdate</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder={
                          !user.birthdate ? "YYYY-MM-DD" : user.birthdate
                        }
                        autoFocus
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                      />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit" onClick={onSubmit}>
                      Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
      <div className="containerCharacter">
        {characters?.map((character) => (
          <div className="character" key={character.id}>
            <img
              src={character.image}
              alt=""
              onClick={() => navigate(`/user/${character.id}`)}
            />
            <h5>{character.name}</h5>
            <div className="containerStatus">
              <div>
                <p>{character.status}</p>
              </div>
              {buttonStatus(character.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
