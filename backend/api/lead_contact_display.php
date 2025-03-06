<?php
require_once __DIR__ . '/../include/headers.php';
require_once __DIR__ . '/../classes/crm.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $crm = new CRM();
    $leads = $crm->getAllLeadsWithContacts();
    
    if (!empty($leads)) {
        echo json_encode($leads);
    } else {
        echo json_encode(["message" => "No leads found"]);
    }
} else {
    echo json_encode(["message" => "Invalid Request Method"]);
}
?>
