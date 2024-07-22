import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointements, setAppointements] = useState([]);
  

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointement/getall",
          { withCredentials: true }
        );
        setAppointements(data.appointements);
       
      } catch (error) {
        setAppointements({});
        console.log("Some error occur while fetching appointements", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointementId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointement/update/${appointementId}`,
        { status },
        { withCredentials: true }
      );
      setAppointements((prevAppointements) =>
        prevAppointements.map((appointement) =>
          appointement._id === appointementId
            ? { ...appointement, status }
            : appointement
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>{admin && `${admin.firstName} ${admin.lastName}`} </h5>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>524</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>10</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointements && appointements.length > 0
                ? appointements.map((appointement) => (
                    <tr key={appointement._id}>
                      <td>{`${appointement.firstName} ${appointement.lastName}`}</td>
                      <td>{appointement.appointement_date.substring(0, 16)}</td>
                      <td>{`${appointement.doctor.firstName} ${appointement.doctor.lastName}`}</td>
                      <td>{appointement.departement}</td>
                      <td>
                        <select
                          className={
                            appointement.status === "Pending"
                              ? "value-pending"
                              : appointement.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          value={appointement.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointement._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>
                        {appointement.hasVisited === true ? (
                          <GoCheckCircleFill className="green" />
                        ) : (
                          <AiFillCloseCircle className="red" />
                        )}
                      </td>
                    </tr>
                  ))
                : "No Appointments Found!"}
            </tbody>
          </table>

          {}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
