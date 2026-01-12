import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import hospitalsData from "../data/hospitals";
import "../styles/hospitals.css";

function Hospitals() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState(hospitalsData);

  // Light navbar for white background
  useEffect(() => {
    document.body.classList.add("light-navbar");
    return () => document.body.classList.remove("light-navbar");
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const findNearestHospital = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      const sorted = hospitalsData
        .map((h) => ({
          ...h,
          distance: calculateDistance(latitude, longitude, h.lat, h.lng),
        }))
        .sort((a, b) => a.distance - b.distance);

      setHospitals(sorted);
    });
  };

  const openMaps = (h) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${h.lat},${h.lng}`,
      "_blank"
    );
  };

  return (
    <>
      <Navbar />

      <div className="hospital-page">
        {/* TOP BAR */}
        <div className="hospital-top">
          <input
            className="search-box"
            placeholder="Search for hospitals"
          />
          <button className="nearest-btn" onClick={findNearestHospital}>
            Find Nearest Hospital
          </button>
        </div>

        {/* LIST */}
        {hospitals.map((hospital) => (
          <div className="hospital-card" key={hospital.id}>
            <div className="hospital-row">
              <div className="hospital-info">
                <h2>{hospital.name}</h2>
                {hospital.distance && (
                  <span>{hospital.distance} km away</span>
                )}
              </div>

              <div className="hospital-actions">
                <button
                  className="doctor-btn"
                  onClick={() =>
                    navigate(`/hospital/${hospital.id}`)
                  }
                >
                  Find Doctors
                </button>

                <button
                  className="route-btn"
                  onClick={() => openMaps(hospital)}
                >
                  Navigate Route ✈
                </button>
              </div>
            </div>

            <div className="hospital-desc">
              {hospital.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Hospitals;
