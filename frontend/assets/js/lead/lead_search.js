document.getElementById("leadSearchForm").addEventListener("submit", function(event){
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    if(name){
        fetch(`http://localhost:8000/backend/api/lead/lead_search.php?name=${name}`)
        .then(response => response.json())
        .then(data => {
            const resultsTable = document.getElementById("resultsTable").getElementsByTagName("tbody")[0];
            resultsTable.innerHTML = "";

            if(data.length === 0){
                resultsTable.innerHTML = "<tr><td colspan='4' class='text-center'>No results found</td></tr>";
            }else {
                data.forEach(lead => {
                    const row = resultsTable.insertRow();
                    row.innerHTML = `
                        <td>${lead.id}</td>
                        <td>${lead.name}</td>
                        <td>${lead.address}</td>
                        <td>${lead.website}</td>
                    `;
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert("An error occurred while fetching data.");
        });
    }
});