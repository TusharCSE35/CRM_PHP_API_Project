<?php
require_once __DIR__ . '/../config/database.php';

class Lead {
    private $conn;
    private $table = "leads";  

    public function __construct() {
        $database = new Database();  
        $this->conn = $database->connection();  
    }

    public function addLead($name, $address, $website) {
        $query = "INSERT INTO " . $this->table . " (name, address, website) VALUES (:name, :address, :website)";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':website', $website);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function getAllLeads() {
        $query = "SELECT * FROM " .$this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getLeadById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateLead($id, $name, $address, $website) {
        $query = "UPDATE " . $this->table . " SET name = :name, address = :address, website = :website WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':website', $website);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function searchLeadByName($name){
        $query = "SELECT id, name, address, website FROM ". $this->table. " WHERE name LIKE :name";
        $stmt = $this->conn->prepare($query);
        
        $searchTerm = "%" . $name . "%";
        $stmt->bindParam(":name", $searchTerm, PDO::PARAM_STR);
        
        $stmt->execute();
        $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $leads; 
    }
    

    public function deleteLead($id){
        $query = "DELETE FROM ". $this->table. " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);

        if($stmt->execute()){
            return true;
        }
        return false;
    }
}
?>
