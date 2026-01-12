import { Link, useNavigate } from "react-router-dom";

function Navbar({ variant = "dark" }) {
  const navigate = useNavigate();
  const isLight = variant === "light";

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="nav-wrapper">
      <nav className={`navbar ${isLight ? "navbar-light" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/hospitals">Book OP</Link>
        <Link to="/about">About</Link>
        <Link to="/chatbot">ChatBot</Link>

        <button className="nav-btn" onClick={scrollToContact}>
          Contact Us
        </button>
      </nav>

      <div
        className={`profile-icon ${isLight ? "profile-light" : ""}`}
        onClick={() => navigate("/profile")}
        title="Profile"
      >
        👤
      </div>
    </div>
  );
}

export default Navbar;
