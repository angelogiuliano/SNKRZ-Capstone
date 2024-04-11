import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

export const Welcome = (props) => {
  const { firstName, lastName } = props.userInfo;
  const [timer, setTimer] = useState(6);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
      console.log(timer);
    }, 1000);

    return () => clearTimeout(timeoutId);
  });

  return (
    <div className={timer > 0 ? "mx-5" : "d-none"}>
      <Alert variant="success">Welcome, {firstName + " " + lastName}</Alert>
    </div>
  );
};
