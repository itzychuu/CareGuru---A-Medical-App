import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/profile.css";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function Profile() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [profileData, setProfileData] = useState(null);

  // ✅ Fetch profile from Firestore
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setProfileData(snap.data().profile || {});
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, [user]);

  // Light navbar
  useEffect(() => {
    document.body.classList.add("light-navbar");
    return () => document.body.classList.remove("light-navbar");
  }, []);

  if (loading) {
    return <div style={{ padding: "150px" }}>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="profile-page">
        {/* Auth buttons */}
        <div className="profile-actions">
          {user ? (
            <button
              className="signout-btn"
              onClick={async () => await signOut(auth)}
            >
              Sign Out
            </button>
          ) : (
            <button
              className="google-btn"
              onClick={async () => {
                try {
                  await signInWithPopup(auth, provider);
                } catch {
                  alert("Google login failed");
                }
              }}
            >
              Log in with google account
            </button>
          )}
        </div>

        {/* Avatar */}
        <div className="profile-avatar">
          <div className="avatar-circle">
            {profileData?.image ? (
              <img src={profileData.image} alt="Profile" />
            ) : user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" />
            ) : (
              <span className="avatar-icon">👤</span>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-title">
              <p><strong>Name:</strong> {user?.displayName || "User Name"}</p>
              <p><strong>Email:</strong> {user?.email || "User Email"}</p>
              <p><strong>Age:</strong> {profileData?.age || "—"}</p>
              <p><strong>Gender:</strong> {profileData?.gender || "—"}</p>
              <p><strong>Blood Group:</strong> {profileData?.bloodGroup || "—"}</p>
              <p><strong>Contact No:</strong> {profileData?.contact || "—"}</p>
            </div>

            <div className="profile-buttons">
              <button
                className="edit-btn"
                onClick={() => navigate("/profile/edit")}
              >
                ✏ Edit
              </button>

              <button
                className="appointments-btn"
                onClick={() => navigate("/appointments")}
              >
                Show Appointments
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
