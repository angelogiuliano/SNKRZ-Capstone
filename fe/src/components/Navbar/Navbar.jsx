import { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [searchedItem, setSearchedItem] = useState("");
  const navigate = useNavigate();

  const session = localStorage.getItem("auth");

  const onChange = async (e) => {
    if (e.target.value !== "") {
      setSearchedItem(e.target.value);
    } else {
      navigate("/home");
    }
  };

  const navigateFunction = () => {
    navigate(`/products/${searchedItem}`);
  };

  const handleLogin = () => {
    localStorage.setItem("auth", "");
    navigate("/login");
  };

  const handleSignUp = () => {
    localStorage.setItem("auth", "");
    navigate("/?showSignUp=true");
  };

  const handleLogout = () => {
    localStorage.setItem("auth", "");
    navigate("/login");
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchedItem) {
        navigateFunction(searchedItem);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchedItem]);

  return (
    <div className="w-100">
      <nav className="navbar">
        <div className="d-flex align-items-center">
          <a href="/home" className="m-0 ms-4 oswald-font">
            SNKRZ
          </a>
          {session && (
            <div className="input-container ms-4 ">
              <ion-icon name="search"></ion-icon>
              <input
                onChange={onChange}
                name="navbar-input"
                placeholder="Cerca.."
                type="text"
              />
            </div>
          )}
        </div>
        <div className="login-signup d-flex me-4 gap-2">
          {!session ? (
            <>
              <button onClick={() => handleLogin()} className="log-btn">
                Login
              </button>
              <button onClick={() => handleSignUp()} className="log-btn">
                Registrati
              </button>
            </>
          ) : (
            <button onClick={() => handleLogout()} className="log-btn">
              Logout
            </button>
          )}
        </div>
      </nav>
      <div className="gradient"></div>
    </div>
  );
};
