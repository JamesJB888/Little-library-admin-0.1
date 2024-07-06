import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5MHSeMlRY1TlXCQ1buIoRNZWGLyskxok",
  authDomain: "little-library-cfad5.firebaseapp.com",
  databaseURL: "https://little-library-cfad5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "little-library-cfad5",
  storageBucket: "little-library-cfad5.appspot.com",
  messagingSenderId: "1018795200494",
  appId: "1:1018795200494:web:6d19ace3b71614161048ff",
  measurementId: "G-CMQPGZKJ8C"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

const profileForm = document.getElementById("profileForm");

profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = profileForm.querySelector('#username').value;
  const email = profileForm.querySelector('#email').value;
  const firstname = profileForm.querySelector('#firstname').value;
  const lastname = profileForm.querySelector('#lastname').value;

  try {
    // Add document to 'Profile' collection
    const docRef = await addDoc(collection(db, 'Profile'), {
      Username: username,
      Email: email,
      Firstname: firstname,
      Lastname: lastname
    });

    console.log("Document written with ID: ", docRef.id);
    alert("Profile information saved successfully!");
    // You can redirect or perform any other actions here after successful save
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Error saving profile information. Please try again later.");
  }
});
