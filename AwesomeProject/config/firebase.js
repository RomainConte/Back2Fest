// ./config/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';



// Votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDHO9dnOTJxT40Jiq9M7jR9vvCJGcXSCtE",
  authDomain: "back2fest-dae2e.firebaseapp.com",
  databaseURL: "https://back2fest-dae2e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "back2fest-dae2e",
  storageBucket: "back2fest-dae2e.appspot.com",
  messagingSenderId: "298482831843",
  appId: "1:298482831843:web:2d8feaa99d1ca0ade3d0d6"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);



const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
export default app;