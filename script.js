let builds = [];

function calculateTotal(build) {
    return (
        build.cpu +
        build.gpu +
        build.motherboard +
        build.ram +
        build.ssd +
        build.psu +
        build.case +
        build.windows +
        build.miscellaneous
    );
}

function calculateProfit(build) {
    return build.salePrice - calculateTotal(build);
}

function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
}

function updateBuildsTable() {
    const tbody = document.getElementById('buildsTableBody');
    tbody.innerHTML = '';
    builds.forEach((build, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${build.buildId}</td>
            <td>${formatCurrency(build.cpu)}</td>
            <td>${formatCurrency(build.gpu)}</td>
            <td>${formatCurrency(build.motherboard)}</td>
            <td>${formatCurrency(build.ram)}</td>
            <td>${formatCurrency(build.ssd)}</td>
            <td>${formatCurrency(build.psu)}</td>
            <td>${formatCurrency(build.case)}</td>
            <td>${formatCurrency(build.windows)}</td>
            <td>${formatCurrency(build.miscellaneous)}</td>
            <td>${formatCurrency(calculateTotal(build))}</td>
            <td>${formatCurrency(build.salePrice)}</td>
            <td>${formatCurrency(calculateProfit(build))}</td>
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
    document.getElementById('cpu').value = build.cpu || '';
    document.getElementById('gpu').value = build.gpu || '';
    document.getElementById('motherboard').value = build.motherboard || '';
    document.getElementById('ram').value = build.ram || '';
    document.getElementById('ssd').value = build.ssd || '';
    document.getElementById('psu').value = build.psu || '';
    document.getElementById('case').value = build.case || '';
    document.getElementById('windows').value = build.windows || '';
    document.getElementById('miscellaneous').value = build.miscellaneous || '';
    document.getElementById('salePrice').value = build.salePrice || '';

    builds.splice(index, 1);
    updateBuildsTable();
}

function deleteBuild(index) {
    builds.splice(index, 1);
    updateBuildsTable();
}

document.getElementById('buildForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const build = {
        buildId: document.getElementById('buildId').value.trim(),
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
