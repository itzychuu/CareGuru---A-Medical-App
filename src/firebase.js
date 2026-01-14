import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8JGkwrGyA88Rb7s6R_FUTY3Atmxm5kKk",
  authDomain: "careguru-7d6b3.firebaseapp.com",
  projectId: "careguru-7d6b3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export { auth, provider };
