<?php
require_once __DIR__ . '/../model/lead.php'; 

class CRM {
    private $lead;

    public function __construct() {
        $this->lead = new Lead();
    }

    public function addLead($name, $address, $website) {
        return $this->lead->addLead($name, $address, $website);
    }
}
?>
