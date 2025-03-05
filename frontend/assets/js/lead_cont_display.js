document.addEventListener("DOMContentLoaded", function() {
    // Fetch leads and contacts data from the API
    fetch(`http://localhost:8000/backend/api/lead_contact_display.php`) // Change this to the correct path to your PHP API
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("leadTableBody");
            const leadTable = document.getElementById("leadTable");
            const noDataMessage = document.getElementById("noDataMessage");

            // If there are no leads, show the "No Lead Data Available" message
            if (data.length === 0) {
                noDataMessage.style.display = "block";
                leadTable.style.display = "none";
                return;
            }

            // Otherwise, populate the table with the lead data
            noDataMessage.style.display = "none";
            leadTable.style.display = "block";

            data.forEach(lead => {
                const contacts = lead.contacts || []; // Assuming each lead has an array of contacts
                const contactCount = contacts.length;

                // Create the first row for lead information
                const leadRow = document.createElement("tr");
                leadRow.innerHTML = `
                    <td rowspan="${Math.max(contactCount, 1)}">
                        <strong>Lead ID:</strong> ${lead.id} <br>
                        <strong>Name:</strong> ${lead.name} <br>
                        <strong>Website:</strong> <a href="${lead.website}" target="_blank">${lead.website}</a><br>
                        <strong>Address:</strong> ${lead.address}
                    </td>
                `;
                tableBody.appendChild(leadRow);

                // Add contact rows for the current lead
                if (contactCount > 0) {
                    contacts.forEach((contact, index) => {
                        const contactRow = document.createElement("tr");

                        if (index === 0) {
                            // For the first contact, add the lead's contact information
                            contactRow.innerHTML = `
                                <td>${contact.id}</td>
                                <td>${contact.name}</td>
                                <td>${contact.email}</td>
                                <td>${contact.address}</td>
                            `;
                        } else {
                            // For additional contacts, add rows without the lead info
                            contactRow.innerHTML = `
                                <td>${contact.id}</td>
                                <td>${contact.name}</td>
                                <td>${contact.email}</td>
                                <td>${contact.address}</td>
                            `;
                        }

                        tableBody.appendChild(contactRow);
                    });
                } else {
                    // If no contacts, show a message in the contact columns
                    const noContactRow = document.createElement("tr");
                    noContactRow.innerHTML = `<td colspan="4" class="text-center">No contact added in this lead</td>`;
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
