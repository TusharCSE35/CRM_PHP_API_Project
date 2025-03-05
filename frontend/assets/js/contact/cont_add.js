document.getElementById("searchLeadForm").addEventListener("submit", function(event){
    event.preventDefault();

    const leadName = document.getElementById("lead_name").value;
    if(leadName.trim() === ""){
        alert("Please eneter a lead name to search.");
        return;
    }

    fetchLeads(leadName);
});

function fetchLeads(leadName){
    fetch(`http://localhost:8000/backend/api/lead/lead_search.php?name=${leadName}`)
    .then(response => response.json())
    .then(data => {
        if(data.length > 0){
            displayLeads(data);
        }else{
            displayNoLeadsMessage(leadName);
        }
    })
    .catch(error =>{
        console.error("Error fetching leads:", error);
    });
}

function displayLeads(leads){
    const leadResults = document.getElementById("leadResults");
    const noLeadsMessage = document.getElementById("noLeadsMessage");
    const leadsList = document.getElementById("leadsList");
    const selectLead = document.getElementById("selected_lead_id");

    leadsList.innerHTML = ''; 
    selectLead.innerHTML = ''; 

    noLeadsMessage.style.display = "none";
    leadResults.style.display = "block";

    leads.forEach(lead => {
        const leadItem = document.createElement("div");
        leadItem.classList.add("list-group-item");

        leadItem.innerHTML = `
            <p><strong>Lead ID:</strong> ${lead.id}</p>
            <p><strong>Name:</strong> ${lead.name}</p>
            <p><strong>Address:</strong> ${lead.address}</p>
            <p><strong>Website:</strong> <a href="${lead.website}" target="_blank">${lead.website}</a></p>
        `;
        leadsList.appendChild(leadItem);

        const option = document.createElement("option");
        option.value = lead.id;
        option.textContent = `${lead.name} (ID: ${lead.id})`;
        selectLead.appendChild(option);
    });
}

function displayNoLeadsMessage(leadName){
    const noLeadsMessage = document.getElementById("noLeadsMessage");
    const searchedName = document.getElementById("searchedName");

    searchedName.textContent = leadName;
    noLeadsMessage.style.display = "block";
}

// Handle Add Contact Form Submission
document.getElementById("addContactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const contactName = document.getElementById("contact_name").value;
    const contactEmail = document.getElementById("contact_email").value;
    const contactAddress = document.getElementById("contact_address").value;
    const selectedLeadId = document.getElementById("selected_lead_id").value;

    if (contactName && contactEmail && contactAddress && selectedLeadId) {
        addContact(selectedLeadId, contactName, contactEmail, contactAddress);
    } else {
        alert("Please fill in all fields.");
    }
});

function addContact(leadId, contactName, contactEmail, contactAddress) {
    const contactData = {
        lead_id: leadId,
        name: contactName,
        email: contactEmail,
        address: contactAddress
    };

    console.log("Sending data to server:", contactData); 

    fetch(`http://localhost:8000/backend/api/contact/contact_add.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data); 
        if (data.message === "Contact added successfully") {
            alert("Contact added successfully!");
            document.getElementById("addContactForm").reset();
        } else {
            alert("Failed to add contact.");
        }
    })
    .catch(error => {
        console.error("Error adding contact:", error);
    });
}
