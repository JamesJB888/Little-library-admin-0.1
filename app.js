import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const table = document.getElementById("table");
const form = document.getElementById("addForm");

async function getAdmin(db) {
  try {
    const adminCol = collection(db, 'Admin');
    const empSnapshot = await getDocs(adminCol);
    return empSnapshot.docs; // Return the documents array
  } catch (error) {
    console.error("Error fetching documents: ", error);
    alert("Error fetching data. Please check the console for details.");
  }
}

function showData(Admin) {
  try {
    const row = table.insertRow(-1);
    const TitleCol = row.insertCell(0);
    const UsernameCol = row.insertCell(1);
    const EmailCol = row.insertCell(2);
    const FirstnameCol = row.insertCell(3);
    const LastnameCol = row.insertCell(4);
    const RoleCol = row.insertCell(5);
    const ActionCol = row.insertCell(6); // Add column for actions

    TitleCol.innerHTML = Admin.data().Title;
    UsernameCol.innerHTML = Admin.data().Username;
    EmailCol.innerHTML = Admin.data().Email;
    FirstnameCol.innerHTML = Admin.data().Firstname;
    LastnameCol.innerHTML = Admin.data().Lastname;
    RoleCol.innerHTML = Admin.data().Role;

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', async () => {
      await deleteAdmin(Admin.id);
      table.deleteRow(row.rowIndex);
    });
    ActionCol.appendChild(deleteButton);
  } catch (error) {
    console.error("Error displaying document: ", error);
    alert("Error displaying data. Please check the console for details.");
  }
}

async function deleteAdmin(id) {
  try {
    await deleteDoc(doc(db, 'Admin', id));
    alert("ลบข้อมูลเรียบร้อย");
  } catch (error) {
    console.error("Error deleting document: ", error);
    alert("Error deleting data. Please check the console for details.");
  }
}

// Fetch and display data
(async () => {
  const data = await getAdmin(db);
  if (data) {
    data.forEach(Admin => {
      showData(Admin);
    });
  }
})();

// Add form data to Firestore
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const title = form.querySelector('#title').value;
    const username = form.querySelector('#username').value;
    const email = form.querySelector('#email').value;
    const firstname = form.querySelector('#firstname').value;
    const lastname = form.querySelector('#lastname').value;
    const role = form.querySelector('#role').value;

    await addDoc(collection(db, 'Admin'), {
      Title: title,
      Username: username,
      Email: email,
      Firstname: firstname,
      Lastname: lastname,
      Role: role
    });

    form.reset();
    alert("บันทึกข้อมูลเรียบร้อย");
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Error adding data. Please check the console for details.");
  }
});
