<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    
    require_once __DIR__ . '/../../classes/crm.php';

    $crm = new CRM();
    $contacts = $crm->getAllContacts();

    if (!empty($contacts)) {
        echo json_encode([
            'status' => 'success',
            'data' => $contacts
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'No contacts found.'
        ]);
    }
?>