
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
    const cpuCost = parseFloat(document.getElementById("cpuCost").value);
    const gpuCost = parseFloat(document.getElementById("gpuCost").value);
    const motherboardCost = parseFloat(document.getElementById("motherboardCost").value);
    const ramCost = parseFloat(document.getElementById("ramCost").value);
    const storageCost = parseFloat(document.getElementById("storageCost").value);
    const fansCost = parseFloat(document.getElementById("fansCost").value);
    const miscCost = parseFloat(document.getElementById("miscCost").value);
    const salePrice = parseFloat(document.getElementById("salePrice").value);

    const totalCost = cpuCost + gpuCost + motherboardCost + ramCost + storageCost + fansCost + miscCost;
    const profit = salePrice - totalCost;

    db.collection("pc_builds").add({
        cpuCost,
        gpuCost,
        motherboardCost,
        ramCost,
        storageCost,
        fansCost,
        miscCost,
        salePrice,
        totalCost,
        profit
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
            buildList.innerHTML += `<div class="build-item">
                <p><strong>CPU Cost:</strong> $${data.cpuCost}</p>
                <p><strong>GPU Cost:</strong> $${data.gpuCost}</p>
                <p><strong>Motherboard Cost:</strong> $${data.motherboardCost}</p>
                <p><strong>RAM Cost:</strong> $${data.ramCost}</p>
                <p><strong>Storage Cost:</strong> $${data.storageCost}</p>
                <p><strong>Fans Cost:</strong> $${data.fansCost}</p>
                <p><strong>Miscellaneous Cost:</strong> $${data.miscCost}</p>
                <p><strong>Total Cost:</strong> $${data.totalCost}</p>
                <p><strong>Selling Price:</strong> $${data.salePrice}</p>
                <p><strong>Profit:</strong> $${data.profit}</p>
                <hr>
            </div>`;
        });
    }).catch((error) => {
        console.error("Error fetching builds: ", error);
    });
}

// Initial display of builds
window.onload = displayBuilds;
