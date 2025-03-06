
document.addEventListener('DOMContentLoaded', function(){
    fetchLeads();

    function fetchLeads(){
        fetch(`http://localhost:8000/backend/api/lead/lead_display.php`)
        .then(response => response.json())
        .then(data => {
            const leadList = document.getElementById('leadDisplay');
            leadList.innerHTML = '';

            data.forEach(lead =>{
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${lead.id}</td>
                    <td>${lead.name}</td>
                    <td>${lead.address}</td>
                    <td>${lead.website}</td>
                    <td>
                        <a href="lead_edit.html?id=${lead.id}" class="btn btn-warning btn-sm">Edit</a>
                        <button class="btn btn-danger btn-sm" onclick="deleteLead(${lead.id})">Delete</button>
                    </td>
                `;
                leadList.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching leads:', error);
            alert('Error fetching leads data.');
        });
    }

    window.deleteLead = function(id){
        if(confirm('Are you sure want to delete this leads?')){
            fetch(`http://localhost:8000/backend/api/lead/lead_delete.php?id=${id}`,{
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                fetchLeads();
            })
            .catch(error => {
                console.error('Error deleting leads:', error);
                alert('Error deleting leads.')
            });
        }
    }
});