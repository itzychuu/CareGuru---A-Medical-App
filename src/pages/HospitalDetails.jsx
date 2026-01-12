import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import hospitals from "../data/hospitals";
import "../styles/doctors.css";

function HospitalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Light navbar for white background
  useEffect(() => {
    document.body.classList.add("light-navbar");
    return () => document.body.classList.remove("light-navbar");
  }, []);

  const hospital = hospitals.find(
    (h) => h.id === parseInt(id)
  );

  if (!hospital) {
    return (
      <>
        <Navbar />
        <div className="doctor-page">
          <h2>Hospital not found</h2>
        </div>
      </>
    );
  }

  const doctors = Array.isArray(hospital.doctors)
    ? hospital.doctors
    : [];

  return (
    <>
      <Navbar />

      <div className="doctor-page">
        <h1 className="hospital-title">
          {hospital.name}
        </h1>

        <div className="doctor-grid">
          {doctors.length === 0 ? (
            <p>No doctors available</p>
          ) : (
            doctors.map((doctor, index) => (
              <div className="doctor-card" key={index}>
                {/* Profile Image */}
                <div className="doctor-img">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                  />
                </div>

                <h2>{doctor.name}</h2>
                <p>{doctor.field}</p>

                <button
                  className="book-btn"
                  onClick={() =>
                    navigate(`/book/${hospital.id}`, {
                      state: { doctor },
                    })
                  }
                >
                  Book Appointment
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default HospitalDetails;
