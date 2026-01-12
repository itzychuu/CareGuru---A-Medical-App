import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Hospitals from "./pages/Hospitals";
import HospitalDetails from "./pages/HospitalDetails";
import BookAppointment from "./pages/BookAppointment";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Appointments from "./pages/Appointments";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/hospital/:id" element={<HospitalDetails />} />
        <Route path="/book/:id" element={<BookAppointment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
