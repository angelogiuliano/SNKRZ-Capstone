import "./Footer.css";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [textCenter, setTextCenter] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 576) {
        setTextCenter(true);
      } else {
        setTextCenter(false);
      }
    });
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div
            className={`col-md-4 ${textCenter ? "text-center" : "text-left"}`}
          >
            <h5 className="d-block">Air Jordan</h5>
            <ul className="w-100">
              <li>
                <a href="/products/air-jordan">Air Jordan</a>
              </li>
              <li>
                <a href="/products/air-jordan-1">Air Jordan 1</a>
              </li>
              <li>
                <a href="/products/air-jordan-release-dates">
                  Air Jordan Release Dates
                </a>
              </li>
              <li>
                <a href="/products/womens-jordans">Womens Jordans</a>
              </li>
            </ul>
          </div>
          <div
            className={`col-md-4 ${textCenter ? "text-center" : "text-left"}`}
          >
            <h5>New Balance</h5>
            <ul>
              <li>
                <a href="/products/new-balance">New Balance</a>
              </li>
              <li>
                <a href="/products/new-balance-327">New Balance 327</a>
              </li>
              <li>
                <a href="/products/new-balance-530">New Balance 530</a>
              </li>
              <li>
                <a href="/products/new-balance-550">New Balance 550</a>
              </li>
            </ul>
          </div>
          <div
            className={`col-md-4 ${textCenter ? "text-center" : "text-left"}`}
          >
            <h5>Popular Brands</h5>
            <ul>
              <li>
                <a href="/products/nike">Nike</a>
              </li>
              <li>
                <a href="/products/supreme">Supreme</a>
              </li>
              <li>
                <a href="/products/fear-of-god-essentials">Fear of God</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
