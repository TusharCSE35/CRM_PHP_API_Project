<?php
    require_once __DIR__ . '/../../include/headers.php';
    require_once __DIR__ . '/../../classes/crm.php';

    if (isset($_GET['name']) && !empty($_GET['name'])) {
        $name = $_GET['name'];

        $crm = new CRM();
        $contacts = $crm->searchContactsByName($name);

        if (count($contacts) > 0) {
            echo json_encode($contacts);
        } else {
            echo json_encode([]);
        }
    } else {
        echo json_encode(["message" => "No name parameter provided"]);
    }
?>
