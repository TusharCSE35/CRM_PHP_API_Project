document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("leadAddForm");

    form.addEventListener("submit", function(e){
        e.preventDefault();

        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const website = document.getElementById("website").value;

        if(name && address && website){
            const leadData = {
                name: name,
                address: address,
                website: website,
            };

            fetch("http://localhost:8000/backend/api/lead/lead_add.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(leadData),
            })
            .then(function(response){
                return response.json();
            })
            .then(function(result){
                if(result.message === "Lead added successfully"){
                    alert("Lead added successfully!");
                    form.reset();
                } else {
                    alert("Error: " + result.message);
                }
            })
            .catch(function(error){
                alert("Error adding lead: " + error);
            });
        } else {
            alert("Please fill all fields!");
        }
    });
});
