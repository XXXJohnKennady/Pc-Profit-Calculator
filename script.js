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

// Display feedback messages
function displayFeedback(message, success = true) {
    const feedbackEl = document.getElementById("feedback");
    feedbackEl.textContent = message;
    feedbackEl.style.color = success ? "green" : "red";
    setTimeout(() => feedbackEl.textContent = "", 3000);
}

// Validate form input
function validateInput(inputs) {
    for (let key in inputs) {
        if (isNaN(inputs[key]) || inputs[key] < 0) {
            displayFeedback("Please enter valid values for all fields.", false);
            return false;
        }
    }
    return true;
}

// Add new PC build to Firestore
function addPcBuild() {
    const inputs = {
        cpuCost: parseFloat(document.getElementById("cpuCost").value),
        gpuCost: parseFloat(document.getElementById("gpuCost").value),
        motherboardCost: parseFloat(document.getElementById("motherboardCost").value),
        ramCost: parseFloat(document.getElementById("ramCost").value),
        storageCost: parseFloat(document.getElementById("storageCost").value),
        fansCost: parseFloat(document.getElementById("fansCost").value),
        miscCost: parseFloat(document.getElementById("miscCost").value),
        salePrice: parseFloat(document.getElementById("salePrice").value),
        shippingCost: parseFloat(document.getElementById("shippingCost").value)
    };

    // Validate and calculate costs
    if (!validateInput(inputs)) return;
    const totalCost = inputs.cpuCost + inputs.gpuCost + inputs.motherboardCost + inputs.ramCost +
                      inputs.storageCost + inputs.fansCost + inputs.miscCost;
    const netProfit = inputs.salePrice - (totalCost + inputs.shippingCost);

    db.collection("pc_builds").add({ ...inputs, totalCost, netProfit })
        .then(() => {
            displayFeedback("Build added successfully!");
            displayBuilds();
        })
        .catch((error) => {
            console.error("Error adding build:", error);
            displayFeedback("Failed to add build. Check console for details.", false);
        });
}

// Fetch and display builds from Firestore
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
                <p><strong>Misc Cost:</strong> $${data.miscCost}</ &#8203;:contentReference[oaicite:0]{index=0}&#8203;
