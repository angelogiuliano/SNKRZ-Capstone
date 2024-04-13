import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUpForm = ({ toggleShowForm, setToggleShowForm }) => {
  const [signUpData, setSignUpData] = useState({});
  const navigate = useNavigate();

  const onChangeFn = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const newValue = name === "age" ? Number(value) : value;
    setSignUpData({
      ...signUpData,
      [name]: newValue,
      favorites: [],
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/createUser`,
        signUpData
      );
      setToggleShowForm(!toggleShowForm);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="card-body text-center justify-center cardbody-color p-lg-5"
    >
      <div id="emailHelp" className="form-text text-center mb-5 text-dark">
        Sei già registrato?
        <button
          type="button"
          className="btn btn-dark px-5 ms-2 rounded-0"
          onClick={() => setToggleShowForm(!toggleShowForm)}
        >
          Fai il login
        </button>
      </div>
      <div className="mb-3">
        <input
          className="form-control shadow-none rounded-0 border-0 border-bottom border-gray"
          onChange={onChangeFn}
          placeholder="Name"
          type="text"
          name="firstName"
        />
      </div>

      <div className="mb-3">
        <input
          className="form-control shadow-none rounded-0 border-0 border-bottom border-gray"
          onChange={onChangeFn}
          placeholder="Last Name"
          type="text"
          name="lastName"
        />
      </div>

      <div className="mb-3">
        <input
          className="form-control shadow-none rounded-0 border-0 border-bottom border-gray"
          onChange={onChangeFn}
          placeholder="Email"
          type="email"
          name="email"
        />
      </div>

      <div className="mb-3">
        <input
          className="form-control shadow-none rounded-0 border-0 border-bottom border-gray"
          onChange={onChangeFn}
          placeholder="Password"
          type="password"
          name="password"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="btn btn-dark px-5 mb-5 w-100 rounded-0"
        >
          Registrati
        </button>
      </div>
    </form>
  );
};
