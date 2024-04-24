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
    <div className="container">
      <Table className="" striped hover >
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
  );
};
