<?php
require_once __DIR__ . '/../../include/headers.php';
require_once __DIR__ . '/../../classes/crm.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->name) && !empty($data->address) && !empty($data->website)) {
        $crm = new CRM();
        $result = $crm->addLead($data->name, $data->address, $data->website);

        if ($result) {
            echo json_encode(["message" => "Lead added successfully"]);
        } else {
            echo json_encode(["message" => "Failed to Add Lead"]);
        }
    } else {
        echo json_encode(["message" => "All Fields Are Required"]);
    }
} else {
    echo json_encode(["message" => "Invalid Request Method"]);
}
?>
