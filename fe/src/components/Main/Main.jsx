import { TrendingProducts } from "../TrendingProducts/TrendingProducts";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { Welcome } from "../Welcome/Welcome";

export const Main = () => {
  const [userInfo, setUserInfo] = useState({})
  const session = localStorage.getItem('auth')

  useEffect(() => {
    const decodedSession = jwtDecode(session)
    setUserInfo(decodedSession)
  }, [])

  return (
    <>
    <Welcome userInfo={userInfo}/>
    <div className="trending">
      <h1 className="mx-4">Trending</h1>
      <TrendingProducts shuffleArray={false} limit={10}/>
    </div>

    <div className="main-cont mt-5">
      <h1 className="mx-4">Check our new products</h1>
      <TrendingProducts shuffleArray={true} limit={50}/>
    </div>
    </>
  );
};
