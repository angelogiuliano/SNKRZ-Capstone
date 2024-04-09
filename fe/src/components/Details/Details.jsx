import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const Details = () => {
  const id = useParams();
  const [details, setDetails] = useState({})

  const getDetails = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/getDetails/${id.id}`)
        console.log(response);
        setDetails(response.data)
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getDetails();
  }, [])

  return (
    <div className="mx-4">
      {details && 
      <div>
        <img src={details.thumbnail} alt={details.shoeName} />
        <p>{details.shoeName}</p>    
    </div>}
    </div>
  );
};
