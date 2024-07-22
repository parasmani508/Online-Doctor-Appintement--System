import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppointementForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointementDate, setAppointementDate] = useState("");
  const [departement, setDepartement] = useState("");
  const [doctorFirstName, setdoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddresses] = useState("");
  const [hasVisited, setHasVisited] = useState("");

  const departementsArray = [
    "Padiatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "ENT",
    "Radiology",
  ];
  const navigateTo = useNavigate();
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const {data} = await axios.get(
        "http://localhost:4000/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);

  const handleAppointement = async (e) => {
    e.preventDefault();
    try {
      const hasbool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointement/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointement_date: appointementDate,
          departement,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          address,
          hasVisited: hasbool,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setNic(""),
        setDob(""),
        setGender(""),
        setAppointementDate(""),
        setDepartement(""),
        setdoctorFirstName(""),
        setDoctorLastName(""),
        setHasVisited(""),
        setAddresses("");
      navigateTo("/");
    } catch (error) 
    {
      toast.error(error.response.data.message);
      // if (error.response && error.response.data) {
      //   toast.error(error.response.data.message);
      // } else {
      //   toast.error("An error occurred");
      // }
    }
  };

  return (
    <>
      <div className="container form-component register-form">
        <h1 style={{ color: "red", margin: "30px" }}>Appointement</h1>
        <form onSubmit={handleAppointement}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              type={"date"}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              placeholder="appointement date"
              value={appointementDate}
              onChange={(e) => setAppointementDate(e.target.value)}
            />
          </div>
          <div>
            <select
              value={departement}
              onChange={(e) => {
                setDepartement(e.target.value);
                setdoctorFirstName("");
                setDoctorLastName("");
              }}
            >
              {departementsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
              ;
            </select>
            <select
              value={`${doctorFirstName} ${doctorLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setdoctorFirstName(firstName);
                setDoctorLastName(lastName);
              }}
              disabled={!departement}
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartement === departement)
                .map((doctor, index) => {
                  return (
                    <option
                      value={`${doctor.firstName} ${doctor.lastName}`}
                      key={index}
                    >
                      {doctor.firstName}
                      {doctorLastName}
                    </option>
                  );
                })}
            </select>
          </div>
          <textarea
            rows="10"
            value={address}
            onChange={(e) => setAddresses(e.target.value)}
            placeholder="Address"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit"   style={{ cursor: "pointer" }}>
              GET APPOINTEMENT
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AppointementForm;
