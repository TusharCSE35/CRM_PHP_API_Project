document.addEventListener("DOMContentLoaded", function () {
    fetchLeads();
});

function fetchLeads() {
    fetch("../api/leads/get_all.php")
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("leadTableBody");
            tableBody.innerHTML = "";
            
            data.forEach(lead => {
                let row = `<tr>
                    <td>${lead.id}</td>
                    <td>${lead.name}</td>
                    <td>${lead.address}</td>
                    <td><a href="${lead.website}" target="_blank">${lead.website}</a></td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editLead(${lead.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteLead(${lead.id})">Delete</button>
                    </td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching leads:", error));
}

function deleteLead(id) {
    if (confirm("Are you sure you want to delete this lead?")) {
        fetch(`../api/leads/delete.php?id=${id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(result => {
                alert(result.message);
                fetchLeads();
            })
            .catch(error => console.error("Error deleting lead:", error));
    }
}

function editLead(id) {
    window.location.href = `lead_edit.html?id=${id}`;
}
