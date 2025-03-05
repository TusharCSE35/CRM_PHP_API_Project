document.getElementById("contactSearchForm").addEventListener("submit", function(event){
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    if(name){
        fetch(`http://localhost:8000/backend/api/contact/contact_search.php?name=${name}`)
        .then(response => response.json())
        .then(data => {
            const resultsTable = document.getElementById("resultsTable").getElementsByTagName("tbody")[0];
            resultsTable.innerHTML = "";

            if(data.length === 0){
                resultsTable.innerHTML = "<tr><td colspan='4' class='text-center'>No results found</td></tr>";
            }else {
                data.forEach(contact => {
                    const row = resultsTable.insertRow();
                    row.innerHTML = `
                        <td>${contact.id}</td>
                        <td>${contact.name}</td>
                        <td>${contact.email}</td>
                        <td>${contact.address}</td>
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