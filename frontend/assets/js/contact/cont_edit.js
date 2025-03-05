document.addEventListener('DOMContentLoaded', function(){
    const urlParams = new URLSearchParams(window.location.search);
    const contactId = urlParams.get('id');

    if(contactId){
        fetch(`http://localhost:8000/backend/api/contact/contact_single_id.php?id=${contactId}`)
        .then(response => response.json())
        .then(contact => {
            document.getElementById('contact-id').value = contact.id;
            document.getElementById('name').value = contact.name;
            document.getElementById('email').value = contact.email;
            document.getElementById('address').value = contact.address;
        })
        .catch(error => {
            console.error('Error fetching contact details:', error);
            alert('Error fetching contact details.');
        });
    }


    const editForm = document.getElementById('contactEditForm');
    if(editForm){
        editForm.addEventListener('submit', function(e){
            e.preventDefault();

            const leadData = {
                id: document.getElementById('contact-id').value,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value
            };

            fetch(`http://localhost:8000/backend/api/contact/contact_edit.php`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(leadData)
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                window.location.href = 'contact_display.html';
            })
            .catch(error=>{
                console.error('Error upadate contact:', error);
                alert('Error updatiing contact.');
            });
        });
    }
});