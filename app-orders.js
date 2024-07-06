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




// ฟังก์ชัน fetchOrders จะทำการดึงข้อมูลคำสั่งซื้อจาก Firestoreโดยแปลง Timestamp จาก Firestore เป็นวัตถุวันที่
const fetchOrders = async () => {
  const ordersRef = collection(db, 'Orders');

  try {
    const snapshot = await getDocs(ordersRef);
    const orders = snapshot.docs.map(doc => {
      const data = doc.data();
      const timestamp = data.Timestamp ? data.Timestamp.toDate() : null; // Convert Firestore Timestamp to JavaScript Date object
      return { ...data, timestamp };
    });

    // สร้างตารางคำสั่งซื้อใหม่ใน HTML และแสดงข้อมูลคำสั่งซื้อ
    const orderListElem = document.getElementById('orderList');
    orderListElem.innerHTML = ''; // Clear existing content

    orders.forEach(order => {
      const { OrderID, timestamp, Status, total } = order;
      const formattedDate = timestamp ? timestamp.toLocaleString() : '';
      const row = `
        <tr>
          <td>${OrderID}</td>
          <td>${formattedDate}</td>
          <td>${Status}</td>
          <td>${total}</td>
        </tr>
      `;
      orderListElem.innerHTML += row;
    });

  } catch (error) {
    console.error('Error fetching orders:', error.message);
  }
};

// Fetch orders when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchOrders();
});