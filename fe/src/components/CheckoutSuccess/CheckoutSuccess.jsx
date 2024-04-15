import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CheckoutSuccess = () => {
  const [timer, setTimer] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify([]));
    const timeoutId = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        navigate("/");
      }
    }, 1000);

    return () => clearTimeout(timeoutId)
  }, [timer]);

  return (
    <div className="container">
      <h4 className="text-center">Grazie per il tuo acquisto!</h4>
      <p className="text-center">Verrai reindirizzato alla pagina home tra {timer} secondi..</p>
    </div>
  );
};
