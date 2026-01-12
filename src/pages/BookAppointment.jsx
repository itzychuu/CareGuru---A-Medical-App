import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/bookappointment.css";

function BookAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  const [paymentMethod, setPaymentMethod] = useState("");

  // Light navbar (white background page)
  useEffect(() => {
    document.body.classList.add("light-navbar");
    return () => document.body.classList.remove("light-navbar");
  }, []);

  // Safety guard
  if (!doctor) {
    return (
      <>
        <Navbar />
        <div className="book-page">
          <h2>Invalid booking session</h2>
          <p>Please select a doctor again.</p>
        </div>
      </>
    );
  }

  const handleProceed = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    const ticket = {
      ticketId: "OP-" + Math.floor(100000 + Math.random() * 900000),
      doctorName: doctor.name,
      field: doctor.field,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      paymentMethod,
    };

    const existing =
      JSON.parse(localStorage.getItem("tickets")) || [];

    localStorage.setItem(
      "tickets",
      JSON.stringify([...existing, ticket])
    );

    alert(
      "Appointment booked successfully!\nTicket sent to your email."
    );

    navigate("/profile");
  };

  return (
    <>
      <Navbar />

      <div className="book-page">
        {/* LEFT CARD */}
        <div className="doctor-summary">
          <div className="doctor-photo">
            <img src={doctor.image} alt={doctor.name} />
          </div>

          <h2>{doctor.name}</h2>
          <p>{doctor.field}</p>
        </div>

        {/* RIGHT PAYMENT */}
        <div className="payment-section">
          <label>
            <input
              type="radio"
              name="payment"
              value="GPay"
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            GPay
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="Credit / Debit Card"
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            Credit / Debit card
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="Other UPI"
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            Other UPI methods
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="Razorpay / Paytm"
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            Razorpay / Paytm
          </label>

          <button
            className="pay-btn"
            onClick={handleProceed}
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </>
  );
}

export default BookAppointment;
