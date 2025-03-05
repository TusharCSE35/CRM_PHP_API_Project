<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

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
