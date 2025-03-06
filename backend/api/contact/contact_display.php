<?php
    require_once __DIR__ . '/../../include/headers.php';
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