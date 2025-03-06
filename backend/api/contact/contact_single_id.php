<?php
    require_once __DIR__ . '/../../include/headers.php';
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