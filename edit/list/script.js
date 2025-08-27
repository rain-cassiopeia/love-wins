import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// all of this is necessary all of the time to make firebase firebase
const firebaseConfig = {
  apiKey: "AIzaSyCOV4iAQziteXkvOjF6ZBlNFsYTYDwECSw",
  authDomain: "raindocs-a679e.firebaseapp.com",
  projectId: "raindocs-a679e",
  storageBucket: "raindocs-a679e.appspot.com",
  messagingSenderId: "25079591688",
  appId: "1:25079591688:web:03cabb5eaea9707c86f2bd",
  measurementId: "G-TGE4W3YEQN"
};

// Init ong
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const wordsDoc = doc(db, "knuckles", "pairs");

// turn one phrase into two hands
function parseText(input) {
  const lines = input.split("\n");
  const right_hand = [];
  const left_hand = [];

  lines.forEach(line => {
    const parts = line.trim().split(/\s+/);
    if (parts.length === 2) {
      right_hand.push(parts[0]);
      left_hand.push(parts[1]);
    } else if (parts.length === 3) {
      right_hand.push(parts[0]);
      left_hand.push(parts[1] + " " + parts[2]);
    }
    // do nothing for 4 < n < 2
  });

  return { right_hand, left_hand };
}

// Save handler
document.getElementById("saveBtn").addEventListener("click", async () => {
  const editorText = document.getElementById("editor").innerText;
  const { right_hand, left_hand } = parseText(editorText);

  try {
    await setDoc(wordsDoc, { right_hand, left_hand });
    alert("Saved successfully!");
    renderLists(right_hand, left_hand);
  } catch (e) {
    console.error("Error saving:", e);
  }
});


function renderLists(right_hand, left_hand) {
  const listsDiv = document.getElementById("lists");

  // Show lists in the "Saved Lists" div
  // listsDiv.innerHTML = `
  //   <strong>List A:</strong> ${right_hand.join(", ")}<br>
  //   <strong>List B:</strong> ${left_hand.join(", ")}
  // `;

  const editor = document.getElementById("editor");
  const lines = right_hand.map((a, i) => `${a} ${left_hand[i] || ""}`);
  editor.innerText = lines.join("\n");
}

// get the lists on page load and show themm
async function loadLists() {
  try {
    const snap = await getDoc(wordsDoc);
    if (snap.exists()) {
      const data = snap.data();
      renderLists(data.right_hand || [], data.left_hand || []);
    } else {
      renderLists([], []);
    }
  } catch (e) {
    console.error("Error loading:", e);
  }
}

loadLists();
