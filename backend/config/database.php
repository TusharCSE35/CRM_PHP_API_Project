<?php
    class Database{
        private $host = "localhost";
        private $dbname = "crm_php_api_project";
        private $username = "tushar";
        private $password = "password";
        public $conn;

        public function connection(){
            $this->conn = null;

            try{
                $this->conn = new PDO("mysql:host=".$this->host.";dbname=".$this->dbname,$this->username,$this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // echo "Databse Connection Successfully";
            }catch(PDOException $er){
                echo "Database connection Error: ".$er->getMessage();
            }

            return $this->conn;
        }
    }
?>