import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ SAFE Firebase config (Auth only)
const firebaseConfig = {
  apiKey: "AIzaSyD8JGkwrGyA88Rb7s6R_FUTY3Atmxm5kKk",
  authDomain: "careguru-7d6b3.firebaseapp.com",
  projectId: "careguru-7d6b3",
};

const app = initializeApp(firebaseConfig);

// ✅ Auth exports
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
