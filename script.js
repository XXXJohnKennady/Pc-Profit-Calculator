let builds = [];

function calculateTotal(build) {
    return build.cpu + build.gpu + build.motherboard + build.ram + build.ssd + build.psu + build.case + build.windows + build.miscellaneous;
}

function calculateProfit(build) {
    return build.salePrice - calculateTotal(build);
}

function updateBuildsTable() {
    const tbody = document.getElementById('buildsTableBody');
    tbody.innerHTML = '';
    builds.forEach((build, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${build.buildId}</td>
            <td>${build.cpu}</td>
            <td>${build.gpu}</td>
            <td>${build.motherboard}</td>
            <td>${build.ram}</td>
            <td>${build.ssd}</td>
            <td>${build.psu}</td>
            <td>${build.case}</td>
            <td>${build.windows}</td>
            <td>${build.miscellaneous}</td>
            <td class="total-cell">${calculateTotal(build)}</td>
            <td>${build.salePrice}</td>
            <td class="total-cell">${calculateProfit(build)}</td>
            <td>
                <button onclick="editBuild(${index})">Edit</button>
                <button onclick="deleteBuild(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editBuild(index) {
    const build = builds[index];
    document.getElementById('buildId').value = build.buildId;
    document.getElementById('cpu').value = build.cpu;
    document.getElementById('gpu').value = build.gpu;
    document.getElementById('motherboard').value = build.motherboard;
    document.getElementById('ram').value = build.ram;
    document.getElementById('ssd').value = build.ssd;
    document.getElementById('psu').value = build.psu;
    document.getElementById('case').value = build.case;
    document.getElementById('windows').value = build.windows;
    document.getElementById('miscellaneous').value = build.miscellaneous;
    document.getElementById('salePrice').value = build.salePrice;

    // Remove the build from the array so that it can be re-added when saved
    builds.splice(index, 1);
    updateBuildsTable();
}

function deleteBuild(index) {
    builds.splice(index, 1);
    updateBuildsTable();
}

document.getElementById('buildForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const build = {
        buildId: document.getElementById('buildId').value,
        cpu: parseFloat(document.getElementById('cpu').value) || 0,
        gpu: parseFloat(document.getElementById('gpu').value) || 0,
        motherboard: parseFloat(document.getElementById('motherboard').value) || 0,
        ram: parseFloat(document.getElementById('ram').value) || 0,
        ssd: parseFloat(document.getElementById('ssd').value) || 0,
        psu: parseFloat(document.getElementById('psu').value) || 0,
        case: parseFloat(document.getElementById('case').value) || 0,
        windows: parseFloat(document.getElementById('windows').value) || 0,
        miscellaneous: parseFloat(document.getElementById('miscellaneous').value) || 0,
        salePrice: parseFloat(document.getElementById('salePrice').value) || 0,
    };

    builds.push(build);
    updateBuildsTable();
    this.reset();
});
