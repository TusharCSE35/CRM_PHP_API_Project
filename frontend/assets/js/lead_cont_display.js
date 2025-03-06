document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.getElementById("leadTableBody");
    const leadTable = document.getElementById("leadTable");
    const noDataMessage = document.getElementById("noDataMessage");

    leadTable.style.display = "none";
    noDataMessage.style.display = "block";

    fetch('http://localhost:8000/backend/api/lead_contact_display.php')
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                
                noDataMessage.style.display = "block";
                leadTable.style.display = "none";
                return;
            }

            noDataMessage.style.display = "none";
            leadTable.style.display = "block";

            data.forEach(lead => {
                const contacts = lead.contacts || [];
                const contactCount = contacts.length;

                const leadRow = document.createElement("tr");
                leadRow.innerHTML = `
                    <td rowspan="${contactCount > 0 ? contactCount + 1 : 1}" class="lead-info">
                        <strong>Lead ID:</strong> ${lead.id} <br>
                        <strong>Name:</strong> ${lead.name} <br>
                        <strong>Website:</strong> <a href="${lead.website}" target="_blank">${lead.website}</a><br>
                        <strong>Address:</strong> ${lead.address}
                    </td>
                `;

                if (contactCount === 0) {
                    leadRow.innerHTML += `
                        <td colspan="4" class="text-center text-danger">No contact available for this lead</td>
                    `;
                    tableBody.appendChild(leadRow);
                } else {
                    tableBody.appendChild(leadRow);
                    contacts.forEach(contact => {
                        const contactRow = document.createElement("tr");
                        contactRow.innerHTML = `
                            <td>${contact.id}</td>
                            <td>${contact.name}</td>
                            <td>${contact.email}</td>
                            <td>${contact.address}</td>
                        `;
                        tableBody.appendChild(contactRow);
                    });
                }
            });
        })
        .catch(error => {
            // Handle error if the API fails
            console.error('Error fetching lead data:', error);
            noDataMessage.textContent = "Error loading data.";
            noDataMessage.style.display = "block";
            leadTable.style.display = "none";
        });
});

