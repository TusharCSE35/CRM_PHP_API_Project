<?php
    require_once __DIR__ . '/../../include/headers.php';
    require_once __DIR__ . '/../../classes/crm.php';

    if (isset($_GET['id']) && !empty($_GET['id'])) {
        $id = $_GET['id'];

        $crm = new CRM();
        $result = $crm->getLeadById($id);
    
        if ($result) {
            echo json_encode($result);
        } else {
            echo json_encode(["message" => "Lead Not Found"]);
        }
    } else {
        echo json_encode(["message" => "Lead ID is Required"]);
    }
?>