// Fetch the contact data from the API and display it in the table
document.addEventListener("DOMContentLoaded", function() {
    const contactDisplayElement = document.getElementById("contactDisplay");
    fetchContacts();

    function fetchContacts(){
        fetch(`http://localhost:8000/backend/api/contact/contact_display.php`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const contacts = data.data;
                let rows = '';
                contacts.forEach(contact => {
                    rows += `
                        <tr>
                            <td>${contact.id}</td>
                            <td>${contact.name}</td>
                            <td>${contact.email}</td>
                            <td>${contact.address}</td>
                            <td>${contact.lead_id}</td>
                            <td>${contact.lead_name}</td>
                            <td>
                                <a href="contact_edit.html?id=${contact.id}" class="btn btn-warning btn-sm">Edit</a>
                                <button class="btn btn-danger btn-sm" onclick="deleteContact(${contact.id})">Delete</button>
                            </td>
                        </tr>
                    `;
                });
                contactDisplayElement.innerHTML = rows;
            } else {
                contactDisplayElement.innerHTML = `<tr><td colspan="7">${data.message}</td></tr>`;
            }
        })
        .catch(error => {
            console.error('Error fetching contacts:', error);
            contactDisplayElement.innerHTML = `<tr><td colspan="7">Error loading data.</td></tr>`;
        });
    }

     
    window.deleteContact = function(id){
        if(confirm('Are you sure want to delete this contacts?')){
            fetch(`http://localhost:8000/backend/api/contact/contact_delete.php?id=${id}`,{
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                fetchContacts();
            })
            .catch(error => {
                console.error('Error deleting contacts:', error);
                alert('Error deleting contacts.')
            });
        }
    }
});
