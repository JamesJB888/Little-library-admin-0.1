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


const accountForm = document.getElementById("accountForm");

accountForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = accountForm.querySelector('#username').value;
  const email = accountForm.querySelector('#email').value;
  const firstname = accountForm.querySelector('#firstname').value;
  const lastname = accountForm.querySelector('#lastname').value;
  const password = accountForm.querySelector('#password').value;

  try {
    // Add document to 'Account' collection
    const docRef = await addDoc(collection(db, 'Account'), {
      Username: username,
      Email: email,
      Firstname: firstname,
      Lastname: lastname,
      Password: password  // Note: This should be handled securely in production
    });

    console.log("Document written with ID: ", docRef.id);
    alert("Account information saved successfully!");

    // Clear form fields after successful save
    accountForm.reset();
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Error saving account information. Please try again later.");
  }
});
