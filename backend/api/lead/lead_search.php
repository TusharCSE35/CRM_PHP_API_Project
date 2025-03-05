<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require_once __DIR__ . '/../../classes/crm.php';

    if (isset($_GET['name']) && !empty($_GET['name'])) {
        $name = $_GET['name'];

        $crm = new CRM();
        $leads = $crm->searchLeadsByName($name);

        if (count($leads) > 0) {
            echo json_encode($leads);
        } else {
            echo json_encode([]);
        }
    } else {
        echo json_encode(["message" => "No name parameter provided"]);
    }
?>
