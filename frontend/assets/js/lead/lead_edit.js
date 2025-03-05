document.addEventListener('DOMContentLoaded', function(){
    const urlParams = new URLSearchParams(window.location.search);
    const leadId = urlParams.get('id');

    if(leadId){
        fetch(`http://localhost:8000/backend/api/lead/lead_single_id.php?id=${leadId}`)
        .then(response => response.json())
        .then(lead => {
            document.getElementById('lead-id').value = lead.id;
            document.getElementById('name').value = lead.name;
            document.getElementById('address').value = lead.address;
            document.getElementById('website').value = lead.website;
        })
        .catch(error => {
            console.error('Error fetching lead details:', error);
            alert('Error fetching lead details.');
        });
    }


    const editForm = document.getElementById('leadEditForm');
    if(editForm){
        editForm.addEventListener('submit', function(e){
            e.preventDefault();

            const leadData = {
                id: document.getElementById('lead-id').value,
                name: document.getElementById('name').value,
                address: document.getElementById('address').value,
                website: document.getElementById('website').value
            };

            fetch(`http://localhost:8000/backend/api/lead/lead_edit.php`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(leadData)
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                window.location.href = 'lead_display.html';
            })
            .catch(error=>{
                console.error('Error upadate lead:', error);
                alert('Error updatiing lead.');
            });
        });
    }
});