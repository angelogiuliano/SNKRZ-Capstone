import { LoginForm } from "./LoginForm/LoginForm";
import { SignUpForm } from "./SignUpForm/SignUpForm";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Login = () => {
  const [toggleShowForm, setToggleShowForm] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const showSignUp = params.get("showSignUp");
    if (showSignUp === "true") {
      setToggleShowForm(false);
    } else {
      setToggleShowForm(true);
    }
  }, [location]);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center text-dark mt-5">SNKRZ Login</h2>
          <div className="card my-5">
            {!toggleShowForm && (
              <SignUpForm
                toggleShowForm={toggleShowForm}
                setToggleShowForm={setToggleShowForm}
              />
            )}
            {toggleShowForm && (
              <LoginForm
                toggleShowForm={toggleShowForm}
                setToggleShowForm={setToggleShowForm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
