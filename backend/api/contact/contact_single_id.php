<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    
    require_once __DIR__ . '/../../classes/crm.php';

    if (isset($_GET['id']) && !empty($_GET['id'])) {
        $id = $_GET['id'];

        $crm = new CRM();
        $result = $crm->getContactById($id);
    
        if ($result) {
            echo json_encode($result);
        } else {
            echo json_encode(["message" => "Contact Not Found"]);
        }
    } else {
        echo json_encode(["message" => "Contact ID is Required"]);
    }
?>