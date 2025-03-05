<?php
require_once __DIR__ . '/../config/database.php';

class Contact {
    private $conn;
    private $table = "contacts";  

    public function __construct() {
        $database = new Database();  
        $this->conn = $database->connection();  
    }

    public function addContact($lead_id, $name, $email, $address) {
        $query = "INSERT INTO " . $this->table . " (lead_id, name, email, address) VALUES (:lead_id, :name, :email, :address)";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':lead_id', $lead_id);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':address', $address);
       
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function getContactById($id){
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateContact($id, $name, $email, $address) {
        $query = "UPDATE " . $this->table . " SET name = :name, email = :email, address = :address WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':address', $address);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function getAllContacts() {
        $query = "SELECT c.id, c.name, c.email, c.address, c.lead_id, l.name AS lead_name
            FROM " . $this->table . " c
            LEFT JOIN leads l ON c.lead_id = l.id";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $contacts;
    }

    public function searchContactsByName($name) {
        $query = "SELECT id, name, email, address FROM ".$this->table." WHERE name LIKE :name";
        $stmt = $this->conn->prepare($query);
        
        $searchTerm = "%" . $name . "%";
        $stmt->bindParam(":name", $searchTerm, PDO::PARAM_STR);
        
        $stmt->execute();
        $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $leads; 
    }

    public function deleteContact($id){
        $query = "DELETE FROM ". $this->table. " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);

        if($stmt->execute()){
            return true;
        }
        return false;
    }

    public function getContactsByLeadId($lead_id) {
        $query = "SELECT * FROM " . $this->table . " WHERE lead_id = :lead_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':lead_id', $lead_id);
        $stmt->execute();

        $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $contacts;
    }
}
?>
