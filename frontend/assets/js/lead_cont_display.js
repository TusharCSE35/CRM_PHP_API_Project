document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.getElementById("leadTableBody");
    const leadTable = document.getElementById("leadTable");
    const noDataMessage = document.getElementById("noDataMessage");

    // Initially hide the table and show the "No Data" message
    leadTable.style.display = "none";
    noDataMessage.style.display = "block";

    // Fetch data from the backend API
    fetch('http://localhost:8000/backend/api/lead_contact_display.php')
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                // If no data is returned, show "No Data Available" message
                noDataMessage.style.display = "block";
                leadTable.style.display = "none";
                return;
            }

            // Hide the "No Data Available" message and display the table
            noDataMessage.style.display = "none";
            leadTable.style.display = "block";

            // Loop through the fetched data (leads)
            data.forEach(lead => {
                const contacts = lead.contacts || [];
                const contactCount = contacts.length;

                // Create a row for the lead information
                const leadRow = document.createElement("tr");

                // Lead info HTML (this will always be displayed)
                leadRow.innerHTML = `
                    <td rowspan="${contactCount > 0 ? contactCount + 1 : 1}" class="lead-info">
                        <strong>Lead ID:</strong> ${lead.id} <br>
                        <strong>Name:</strong> ${lead.name} <br>
                        <strong>Website:</strong> <a href="${lead.website}" target="_blank">${lead.website}</a><br>
                        <strong>Address:</strong> ${lead.address}
                    </td>
                `;

                // If no contacts, add a "No contact available" message to the same row
                if (contactCount === 0) {
                    leadRow.innerHTML += `
                        <td colspan="4" class="text-center text-danger">No contact available for this lead</td>
                    `;
                    tableBody.appendChild(leadRow);
                } else {
                    // Otherwise, add the lead row to the table and continue to add contact rows
                    tableBody.appendChild(leadRow);

                    // Add rows for each contact
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



// ----------------------------------------------
// |  Lead Info    | ID   | Name | Email |Addres|  
// ----------------------------------------------
// |               |  1   | x    | x@    |  016 | 
// |lead 1 info    |----------------------------|
// |               | 2    | y    | y@    |  034 |
// ----------------------------------------------
// |               |                            |
// |lead 2 info    | No contact available       |
// |               |                            |
// ----------------------------------------------
// |               |                            |
// |lead 3 info    | No contact available       |
// |               |                            |
// ----------------------------------------------
// |               |  5   | xx   | xx@   |  056 | 
// |lead 4 info    |----------------------------|
// |               |  6   | yy   | yy@   |  054 |
// ----------------------------------------------
