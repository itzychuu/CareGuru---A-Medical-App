import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/profileEdit.css";
import { useNavigate } from "react-router-dom";


function ProfileEdit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    contact: "",
    image: ""   // ✅ MUST exist
  });


  // light navbar
  useEffect(() => {
    document.body.classList.add("light-navbar");
    return () => document.body.classList.remove("light-navbar");
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result, // ✅ Base64 stored
      }));
    };
    reader.readAsDataURL(file);
  };



  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(formData));
    navigate("/profile");
  };




  return (
    <>
      <Navbar />

      <div className="profile-edit-page">
        {/* Avatar */}
        <div className="edit-avatar">
          <div className="edit-avatar-circle">
            {formData.image ? (
              <img src={formData.image} alt="Profile" />
            ) : (
              <span>👤</span>
            )}
          </div>

          <label className="camera-upload">
            📷
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>


          <label className="camera-upload">
            📷
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* FORM */}
        <div className="edit-form">
          <div className="form-row">
            <label>Name</label>
            <input
              name="name"
              placeholder="Enter Your Name"
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Age</label>
            <input
              name="age"
              placeholder="Enter Your Age"
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Gender</label>
            <select name="gender" onChange={handleChange}>
              <option value="">Male / Female</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-row">
            <label>Blood Group</label>
            <select name="bloodGroup" onChange={handleChange}>
              <option value="">User Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          <div className="form-row">
            <label>Contact</label>
            <input
              name="contact"
              placeholder="Contact No"
              onChange={handleChange}
            />
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Info
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileEdit;
