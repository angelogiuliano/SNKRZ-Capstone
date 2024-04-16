import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import "./LoginForm.css";
import banner from "../../../imgs/Welcome.png";
import { jwtDecode } from "jwt-decode";

export const LoginForm = ({ toggleShowForm, setToggleShowForm }) => {
  const [formData, setFormData] = useState({});
  const [errorLogin, setErrorLogin] = useState();

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/login`,
        formData
      );
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("auth", JSON.stringify(response.data.token));
        localStorage.setItem(
          "favorites",
          JSON.stringify(jwtDecode(response.data.token).favorites)
        );
        localStorage.setItem("alertShown", false);
        localStorage.setItem("cart", JSON.stringify([]));
        navigate("/");
        navigate(0);
      }
    } catch (error) {
      setErrorLogin(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="card-body cardbody-color p-lg-5 text-dark"
    >
      <div className="d-flex align-items-center justify=content-center">
        <img src={banner} className="my-4 w-100" alt="welcome banner" />
      </div>

      {errorLogin && (
        <Alert variant="danger">
          {errorLogin} <br /> Please sign up
        </Alert>
      )}

      <div className="mb-3">
        <input
          onChange={onChangeInput}
          type="email"
          className="form-control shadow-none rounded-0 border-0 border-bottom border-gray"
          name="email"
          aria-describedby="emailHelp"
          placeholder="Inserisci la tua email..."
        />
      </div>

      <div className="mb-3">
        <input
          onChange={onChangeInput}
          type="password"
          className="form-control shadow-none rounded-0 border-0 border-bottom border-gray"
          name="password"
          placeholder="Inserisci la tua password"
        />
      </div>

      <div className="text-center">
        <button
          as={Link}
          to="/home"
          type="submit"
          className="btn btn-dark px-5 mb-5 w-100 rounded-0"
        >
          Login
        </button>
      </div>

      <div id="emailHelp" className="form-text text-center mb-5 text-dark">
        Non sei registrato?
        <button
          type="button"
          className="ms-2 btn btn-dark rounded-0"
          onClick={() => setToggleShowForm(!toggleShowForm)}
        >
          Registrati ora!
        </button>
      </div>
    </form>
  );
};
