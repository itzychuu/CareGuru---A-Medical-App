import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/main.css";

// 🔹 Import images from src/assets
import heroImage from "../assets/hero.jpeg";
import card1 from "../assets/card1.jpeg";
import card2 from "../assets/card2.jpeg";
import card3 from "../assets/card3.jpeg";

function Home() {
  const navigate = useNavigate();

  // 🚨 SOS Logic
  const handleSOS = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        alert(
          "🚨 Emergency Alert Sent!\n\n" +
            "Latitude: " +
            position.coords.latitude +
            "\nLongitude: " +
            position.coords.longitude +
            "\n\nNearby hospitals have been notified."
        );
      },
      () => {
        alert("Location access denied");
      }
    );
  };

  return (
    <>
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section
        className="hero"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0, 90, 160, 0.55),
              rgba(0, 90, 160, 0.55)
            ),
            url(${heroImage})
          `,
        }}
      >
        <h1>
          Welcome to <br />
          <span>CareGuru</span>
        </h1>

        <button className="sos-btn" onClick={handleSOS}>
          SOS
        </button>
      </section>

      {/* ================= CARDS SECTION ================= */}
      <section className="cards">
        <div
          className="card"
          style={{ backgroundImage: `url(${card1})` }}
          onClick={() => navigate("/hospitals")}
        >
          <h3>Book Appointments</h3>
        </div>

        <div
          className="card"
          style={{ backgroundImage: `url(${card2})` }}
          onClick={() => navigate("/hospitals")}
        >
          <h3>Find Nearby Hospitals</h3>
        </div>

        <div
          className="card"
          style={{ backgroundImage: `url(${card3})` }}
          onClick={() => navigate("/chatbot")}
        >
          <h3>Chat With Our AI</h3>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
