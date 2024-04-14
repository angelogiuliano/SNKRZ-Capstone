import { TrendingProducts } from "../TrendingProducts/TrendingProducts";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { Welcome } from "../Welcome/Welcome";

export const Main = () => {
  const [userInfo, setUserInfo] = useState({});
  const session = localStorage.getItem("auth");

  useEffect(() => {
    if (session) {
      const decodedSession = jwtDecode(session);
      setUserInfo(decodedSession);
    }
  }, []);

  return (
    <>
      {userInfo.firstName && <Welcome userInfo={userInfo} />}
      <div className="trending">
        <TrendingProducts shuffleArray={false} limit={8} text={"Trending"} />
      </div>

      <div className="main-cont mt-5">
        <TrendingProducts
          shuffleArray={true}
          limit={50}
          text={"Check our new products"}
        />
      </div>
    </>
  );
};
