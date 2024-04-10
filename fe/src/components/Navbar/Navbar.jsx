import { useEffect, useState } from "react";
import "./Navbar.css";
import {useNavigate} from 'react-router-dom'

export const Navbar = () => {
  const [searchedItem, setSearchedItem] = useState('')
  const navigate = useNavigate();

  const onChange = async (e) => {
    if (e.target.value !== '') {
      setSearchedItem(e.target.value)
    } else {
      navigate('/')
    }
  };

  const navigateFunction = () => {
    navigate(`/products/${searchedItem}`)
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchedItem) {
        navigateFunction(searchedItem)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchedItem])

  return (
    <div className="w-100">
      <nav className="navbar">
        <div className="d-flex align-items-center">
          <a href="/" className="m-0 ms-4 oswald-font">
            SNKRZ
          </a>
          <div className="input-container ms-4 ">
            <ion-icon name="search"></ion-icon>
            <input
              onChange={onChange}
              name="navbar-input"
              placeholder="Cerca.."
              type="text"
            />
          </div>
        </div>
        <div className="login-signup d-flex me-4 gap-2">
          <button className="log-btn">Login</button>
          <button className="log-btn">Registrati</button>
        </div>
      </nav>
      <div className="gradient"></div>
    </div>
  );
};
