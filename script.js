
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBe8TI9DO04EOhriFxU27tOMdGeIF4zzzY",
    authDomain: "pc-profit-calculator-52b5d.firebaseapp.com",
    projectId: "pc-profit-calculator-52b5d",
    storageBucket: "pc-profit-calculator-52b5d.appspot.com",
    messagingSenderId: "32362015246",
    appId: "1:32362015246:web:90027c8502268bb29dea5f",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Add new PC build to Firestore
function addPcBuild() {
    const partCost = document.getElementById("partCost").value;
    const salePrice = document.getElementById("salePrice").value;
    const profit = salePrice - partCost;

    db.collection("pc_builds").add({
        partCost: parseFloat(partCost),
        salePrice: parseFloat(salePrice),
        profit: profit
    }).then(() => {
        alert("Build added successfully!");
        displayBuilds();
    }).catch((error) => {
        console.error("Error adding build: ", error);
    });
}

// Display builds
function displayBuilds() {
    const buildList = document.getElementById("build-list");
    buildList.innerHTML = "";

    db.collection("pc_builds").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            buildList.innerHTML += `<div>
                <p>Cost of Parts: $${data.partCost}</p>
                <p>Sale Price: $${data.salePrice}</p>
                <p>Profit: $${data.profit}</p>
                <hr>
            </div>`;
        });
    }).catch((error) => {
        console.error("Error fetching builds: ", error);
    });
}

// Initial display of builds
window.onload = displayBuilds;
