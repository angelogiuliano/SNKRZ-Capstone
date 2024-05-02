import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

export const Welcome = (props) => {
  const { firstName, isAdmin } = props.userInfo;

  const [timer, setTimer] = useState(4);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const alertShown = JSON.parse(localStorage.getItem("alertShown"));
    if (!alertShown) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
    const timeoutId = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        localStorage.setItem("alertShown", true);
        setShowAlert(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [timer, showAlert]);

  return (
    <div>
      {!isAdmin && <div className={showAlert ? "container" : "d-none"}>
        <Alert variant="success">Buono shopping, {firstName}!</Alert>
      </div>}
    </div>
  );
};
