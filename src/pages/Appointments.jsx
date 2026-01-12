import Navbar from "../components/Navbar";

function Appointments() {
  const tickets =
    JSON.parse(localStorage.getItem("tickets")) || [];

  return (
    <>
      <Navbar />
      <div style={{ padding: "150px 80px" }}>
        <h1>My Appointments</h1>

        {tickets.length === 0 ? (
          <p>No appointments booked yet.</p>
        ) : (
          tickets.map((t, i) => (
            <div
              key={i}
              style={{
                marginTop: "20px",
                padding: "20px",
                borderRadius: "20px",
                boxShadow:
                  "0 6px 14px rgba(0,0,0,0.25)",
              }}
            >
              <p><strong>Ticket:</strong> {t.ticketId}</p>
              <p><strong>Doctor:</strong> {t.doctorName}</p>
              <p><strong>Field:</strong> {t.field}</p>
              <p><strong>Date:</strong> {t.date}</p>
              <p><strong>Time:</strong> {t.time}</p>
              <p><strong>Payment:</strong> {t.paymentMethod}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Appointments;
