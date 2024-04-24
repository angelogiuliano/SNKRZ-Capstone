import { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Navbar = () => {
  const [searchedItem, setSearchedItem] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [updatedCartItems, setUpdatedCartItems] = useState(null);

  const navigate = useNavigate();
  const session = localStorage.getItem("auth");
  const decodedSession = session ? jwtDecode(session) : "";

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
    navigate(0);
  };

  const handleSignUp = () => {
    localStorage.setItem("auth", "");
    navigate("/login?showSignUp=true");
    navigate(0);
  };

  const handleLogout = () => {
    localStorage.setItem("auth", "");
    localStorage.setItem("favorites", JSON.stringify([]));
    localStorage.setItem("alertShown", false);
    localStorage.setItem("cart", JSON.stringify([]));
    navigate("/login");
    navigate(0);
  };

  const handleFavorites = () => {
    if (session) {
      navigate("/favorites");
    } else {
      navigate("/login");
    }
    navigate(0);
  };

  const handleCart = () => {
    if (session) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
    navigate(0);
  };

  const handleDashboard = () => {
    if (session) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
    navigate(0);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchedItem) {
        navigateFunction(searchedItem);
      }
    }, 500);

    const updatedCart = JSON.parse(localStorage.getItem("cart"));
    setUpdatedCartItems(updatedCart);

    return () => clearTimeout(timeoutId);
  }, [searchedItem]);

  console.log();

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
              {decodedSession.isAdmin === true ? (
                <button onClick={() => handleDashboard()} className="log-btn">
                  Dashboard
                </button>
              ) : (
                ""
              )}
            </>
          )}
          <button
            onClick={() => handleFavorites()}
            className="log-btn favorites-handler"
          >
            Favorites
          </button>
          <button onClick={() => handleCart()} className="log-btn cart-handler">
            Cart {updatedCartItems ? updatedCartItems.length : 0}
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
            {decodedSession.isAdmin === true ? (
              <button onClick={() => handleDashboard()} className="log-btn w-50">
                Dashboard
              </button>
            ) : (
              ""
            )}
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
          Cart {updatedCartItems ? updatedCartItems.length : 0}
        </button>
      </div>
      <div className="gradient"></div>
    </div>
  );
};
