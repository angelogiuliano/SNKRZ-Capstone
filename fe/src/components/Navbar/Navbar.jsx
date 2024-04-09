import "./Navbar.css";

export const Navbar = () => {
  return (
    <div className="w-100">
      <nav className="navbar">
        <div className="d-flex align-items-center">
          <a href="/" className="m-0 ms-4 oswald-font">
            SNKRZ
          </a>
          <div className="input-container ms-4 ">
            <ion-icon name="search"></ion-icon>
            <input name="navbar-input" placeholder="Cerca.." type="text" />
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
