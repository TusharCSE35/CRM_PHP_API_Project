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
}
?>
