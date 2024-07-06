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
const addressForm = document.getElementById("addressForm");
const addressList = document.getElementById("addressList");

// Function to fetch addresses from Firestore
async function fetchAddresses() {
  try {
    const querySnapshot = await getDocs(collection(db, "Addresses"));
    addressList.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const row = `
        <tr>
          <td>${data.Address}</td>
          <td>${data.City}</td>
          <td>${data.State}</td>
          <td>${data.ZIPCode}</td>
          <td>${data.Country}</td>
        </tr>
      `;
      addressList.innerHTML += row;
    });
  } catch (error) {
    console.error("Error fetching addresses: ", error);
  }
}

// Initial fetch of addresses
fetchAddresses();

// Add event listener for form submission
addressForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const address = addressForm.querySelector('#address').value;
  const city = addressForm.querySelector('#city').value;
  const state = addressForm.querySelector('#state').value;
  const zipcode = addressForm.querySelector('#zipcode').value;
  const country = addressForm.querySelector('#country').value;

  try {
    // Add document to 'Addresses' collection
    await addDoc(collection(db, 'Addresses'), {
      Address: address,
      City: city,
      State: state,
      ZIPCode: zipcode,
      Country: country
    });

    console.log("Address added successfully!");
    alert("Address added successfully!");

    // Fetch updated addresses and update UI
    fetchAddresses();

    // Clear form fields after successful save
    addressForm.reset();
  } catch (error) {
    console.error("Error adding address: ", error);
    alert("Error adding address. Please try again later.");
  }
});