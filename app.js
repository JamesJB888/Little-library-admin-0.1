
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getFirestore , collection , getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
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
const db = getFirestore(app)
const table = document.getElementById("table")


async function getAdmin (db){
   const adminCol = collection(db,'Admin')
   const empSnapshot = await  getDocs(adminCol)
   return empSnapshot

}


function showData(Admin){
const row = table.insertRow(-1)
const TitleCol = row.insertCell(0)
const Username = row.insertCell(1)
const EmailCol = row.insertCell(2)
const FirstnameCol = row.insertCell(3)
const LastnameCol = row.insertCell(4)
const RoleCol = row.insertCell(5)
TitleCol.innerHTML = Admin.data().Title
Username.innerHTML = Admin.data().Username
EmailCol.innerHTML = Admin.data().Email
FirstnameCol.innerHTML = Admin.data().Firstname
LastnameCol.innerHTML = Admin.data().Lastname
RoleCol.innerHTML = Admin.data().Role
}
//
const data = await getAdmin(db)
data.forEach(Admin=>{
    showData(Admin)
})