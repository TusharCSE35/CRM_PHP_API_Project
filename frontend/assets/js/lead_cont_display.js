document.addEventListener("DOMContentLoaded", function() {
    fetch(`http://localhost:8000/backend/api/lead_contact_display.php`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("leadTableBody");
            const leadTable = document.getElementById("leadTable");
            const noDataMessage = document.getElementById("noDataMessage");

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

                // lead information row
                const leadRow = document.createElement("tr");
                leadRow.innerHTML = `
                    <td rowspan="${Math.max(contactCount, 1)}" class="lead-info">
                        <strong>Lead ID:</strong> ${lead.id} <br>
                        <strong>Name:</strong> ${lead.name} <br>
                        <strong>Website:</strong> <a href="${lead.website}" target="_blank">${lead.website}</a><br>
                        <strong>Address:</strong> ${lead.address}
                    </td>
                `;
                tableBody.appendChild(leadRow);

                if (contactCount > 0) {
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
                } else {
                    // If no contacts, add a message in the same row as the lead
                    const noContactRow = document.createElement("tr");
                    noContactRow.innerHTML = `<td colspan="4" class="text-center">No contact added for this lead</td>`;
                    tableBody.appendChild(noContactRow);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching lead data:', error);
            const noDataMessage = document.getElementById("noDataMessage");
            noDataMessage.textContent = "Error loading data.";
        });
});
