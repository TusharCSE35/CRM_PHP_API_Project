<?php
require_once __DIR__ . '/../model/lead.php'; 
require_once __DIR__ . '/../model/contact.php'; 

class CRM {
    private $lead;
    private $contact;

    public function __construct() {
        $this->lead = new Lead();
        $this->contact = new Contact();
    }
    
    // ** Lead Methods ** 
    public function addLead($name, $address, $website) {
        return $this->lead->addLead($name, $address, $website);
    }

    public function getLeadById($id){
        return $this->lead->getLeadById($id);
    }

    public function updateLead($id, $name, $address, $website){
        return $this->lead->updateLead($id, $name, $address, $website);
    }

    public function getAllLeads(){
        return $this->lead->getAllLeads();
    }
    
    public function searchLeadsByName($name) {
        return $this->lead->searchLeadByName($name);
    }

    public function deleteLead($id){
        return $this->lead->deleteLead($id);
    }


    // ** Contact Methods ** 
    public function addContact($lead_id, $name, $email, $address) {
        return $this->contact->addContact($lead_id, $name, $email, $address);
    }

    public function getContactById($id){
        return $this->contact->getContactById($id);
    }

    public function updateContact($id, $name, $email, $address){
        return $this->contact->updateContact($id, $name, $email, $address);
    }

    public function getAllContacts(){
        return $this->contact->getAllContacts();
    }

    public function searchContactsByName($name) {
        return $this->contact->searchContactsByName($name);
    }

    public function deleteContact($id){
        return $this->contact->deleteContact($id);
    }

    // Lead Contact Display
    public function getAllLeadsWithContacts() {
        $leads = $this->lead->getAllLeads();
        foreach ($leads as &$lead) {
            $lead['contacts'] = $this->contact->getContactsByLeadId($lead['id']);
        }
        return $leads;
    }
}
?>
