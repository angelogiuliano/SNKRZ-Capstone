import { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const [searchedItem, setSearchedItem] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(true);

  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem('cart'))
  const session = localStorage.getItem("auth");

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const onChange = async (e) => {
    if (e.target.value !== "") {
      setSearchedItem(e.target.value);
    } else {
      navigate("/");
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
    navigate("/login?showSignUp=true");
  };

  const handleLogout = () => {
    localStorage.setItem("auth", "");
    localStorage.setItem("favorites", []);
    localStorage.setItem("alertShown", false);
    navigate("/login");
  };

  const handleFavorites = () => {
    if (session) {
      navigate("/favorites");
    } else {
      navigate("/login");
    }
  };

  const handleCart = () => {
    if (session) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchedItem) {
        navigateFunction(searchedItem);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchedItem, cartItems]);

  return (
    <div className="w-100 container">
      <nav className="navbar">
        <div className="d-flex align-items-center">
          <a href="/" className="m-0 oswald-font">
            SNKRZ
          </a>
          <div className="input-container ms-4 d-none d-lg-flex align-items-center">
            <ion-icon name="search"></ion-icon>
            <input
              onChange={onChange}
              name="navbar-input"
              placeholder="Cerca.."
              type="text"
            />
          </div>
        </div>
        <div className={"login-signup d-flex gap-2 d-none d-lg-flex"}>
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
            <>
              <button onClick={() => handleLogout()} className="log-btn">
                Logout
              </button>{" "}
            </>
          )}
          <button
            onClick={() => handleFavorites()}
            className="log-btn favorites-handler"
          >
            Favorites
          </button>
          <button onClick={() => handleCart()} className="log-btn cart-handler">
            Cart {cartItems.length}
          </button>
        </div>

        <button
          className="navbar-toggler d-md-block d-lg-none"
          onClick={toggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
      <div
        className={
          !isNavOpen
            ? "login-signup d-flex flex-wrap gap-2 d-lg-none justify-content-center w-100"
            : "d-none"
        }
      >
        <div className="input-container w-50">
          <ion-icon name="search"></ion-icon>
          <input
            onChange={onChange}
            name="navbar-input"
            placeholder="Cerca.."
            type="text"
          />
        </div>
        {!session ? (
          <>
            <button onClick={() => handleLogin()} className="log-btn w-50">
              Login
            </button>
            <button onClick={() => handleSignUp()} className="log-btn w-50">
              Registrati
            </button>
          </>
        ) : (
          <>
            <button onClick={() => handleLogout()} className="log-btn w-50">
              Logout
            </button>{" "}
          </>
        )}
        <button
          onClick={() => handleFavorites()}
          className="log-btn favorites-handler w-50"
        >
          Favorites
        </button>
        <button
          onClick={() => handleCart()}
          className="log-btn cart-handler w-50"
        >
          Cart {cartItems.length}
        </button>
      </div>
      <div className="gradient"></div>
    </div>
  );
};
