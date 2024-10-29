
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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Add new PC build to Firestore with improved error handling
function addPcBuild() {
    const cpuCost = parseFloat(document.getElementById("cpuCost").value) || 0;
    const gpuCost = parseFloat(document.getElementById("gpuCost").value) || 0;
    const motherboardCost = parseFloat(document.getElementById("motherboardCost").value) || 0;
    const ramCost = parseFloat(document.getElementById("ramCost").value) || 0;
    const storageCost = parseFloat(document.getElementById("storageCost").value) || 0;
    const fansCost = parseFloat(document.getElementById("fansCost").value) || 0;
    const miscCost = parseFloat(document.getElementById("miscCost").value) || 0;
    const salePrice = parseFloat(document.getElementById("salePrice").value) || 0;
    const shippingCost = parseFloat(document.getElementById("shippingCost").value) || 0;

    // Calculate total cost and net profit
    const totalCost = cpuCost + gpuCost + motherboardCost + ramCost + storageCost + fansCost + miscCost;
    const netProfit = salePrice - (totalCost + shippingCost);

    // Add to Firestore and handle any errors
    db.collection("pc_builds").add({
        cpuCost, gpuCost, motherboardCost, ramCost, storageCost, fansCost, miscCost,
        salePrice, shippingCost, totalCost, netProfit
    }).then(() => {
        alert("Build added successfully!");
        displayBuilds();
    }).catch((error) => {
        console.error("Error adding build: ", error);
        alert("Failed to add build. Check console for details.");
    });
}

// Display builds from Firestore with enhanced error handling
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
                <p><strong>Shipping Cost:</strong> $${data.shippingCost}</p>
                <p><strong>Net Profit:</strong> $${data.netProfit}</p>
                <hr>
            </div>`;
        });
    }).catch((error) => {
        console.error("Error fetching builds: ", error);
        alert("Failed to load builds. Check console for details.");
    });
}

// Load builds on startup
window.onload = displayBuilds;
