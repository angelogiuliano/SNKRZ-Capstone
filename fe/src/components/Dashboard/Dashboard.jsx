import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [paymentsData, setPaymentsData] = useState([]);
  const navigate = useNavigate();

  const getPayments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/payments`
      );
      setPaymentsData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const session = localStorage.getItem("auth");
    const decodedSession = jwtDecode(session);
    if (decodedSession.isAdmin) {
      getPayments();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      {paymentsData.length < 1 ? (
        <div className="d-flex justify-content-center align-items-center">
          <img
            src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif"
            alt=""
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      ) : (
        <div className="container">
          <Table className="" striped hover>
            <thead>
              <tr>
                <th>Transaction Id</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentsData.map((data, i) => {
                return (
                  <tr>
                    <td>{data.id}</td>
                    <td>{data.amount / 100}</td>
                    <td>{data.currency}</td>
                    <td>{data.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};
