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

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Document reference
const wordsDoc = doc(db, "knuckles", "pairs");

// i kind of hate that i have to initialize these like this
var index = 1;
var length = 0;

async function loadLists() {
  try {
    const snap = await getDoc(wordsDoc);
    if (snap.exists()) {
      const data = snap.data();
      // renderFists(data.right_hand || [], data.left_hand || []);
      var first = data.right_hand.concat(data.right_hand.concat(data.right_hand));
      var second = data.left_hand.concat(data.left_hand.concat(data.left_hand));
      
      length = data.left_hand.length;
      index = length + 1;

      var first_str = "";
      var second_str = "";

      for (let i = 0; i < length * 3; i++) {
        first_str += first[i] + "<br>"
        second_str += second[i] + "<br>"
      }

      const fists = document.getElementsByClassName("fist");
      fists[0].innerHTML = first_str;
      fists[1].innerHTML = second_str;
      
    } else {
      const fists = document.getElementsByClassName("fist");
      fists[0].innerHTML = "smth";
      fists[1].innerHTML = "brok";
    }
  } catch (e) {
    console.error("Error loading:", e);
  }
  spin2(); //moved into the async function so everything is initialized
}

loadLists();

function spin2() {
  //the 12 accounts for centering in the box
  let offset1 = getOffset()
  let offset2 = getOffset()
  if (offset1 == offset2) {
    offset2 = getOffset() //i know this should be a while loop but for some strange reason im averse to using one. couldnt tell you why. superstition, perhaps.
  }
  gsap.set(".fist--left", {y: ((index + offset1) * -50) - 12})
  gsap.to(".fist--left", {y: (index * -50)-12, duration: 2})
  gsap.set(".fist--right", {y: ((index + offset2) * -50) - 12})
  gsap.to(".fist--right", {y: (index * -50)-12, duration: 2})
}

function randomize() {index = Math.floor(Math.random() * (length + 1)) + length;}

function rigorousWindowHeight() {
        const viewportHeight = window.innerHeight;
        document.getElementsByClassName('gradient-box')[0].style.height = `${viewportHeight/4}px`;
        document.getElementsByClassName('gradient-box')[1].style.height = `${viewportHeight/4}px`;
    }

function getOffset() {
  let t = [-100,-90,-80,-70,-60,-50,-40,-30,-20,30,40,50,60,70,80,90,100];
  return t[Math.floor(Math.random() * 17)];
}

//unfortunately coudlnt do normal onclick cause i tested this in codepen :p
//no IDE "full web" development goes brrr
document.querySelector(".centered-box").addEventListener("click", () => {
  randomize();
  spin2();
});

window.addEventListener('load', rigorousWindowHeight);
window.addEventListener('resize', rigorousWindowHeight);

function checkWindowSize() {
  if (window.innerWidth <= 600) {
    window.location.href = "/fone/mode";
  }
}

checkWindowSize();

window.addEventListener('resize', checkWindowSize);

