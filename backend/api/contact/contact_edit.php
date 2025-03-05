<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Methods: PUT");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require_once __DIR__ . '/../../classes/crm.php';

    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->id) && !empty($data->name) && !empty($data->email) && !empty($data->address)) {
        $crm = new CRM();
        $result = $crm->updateContact($data->id, $data->name, $data->email, $data->address);
        
        if ($result) {
            echo json_encode(["message" => "Contact Updated Successfully"]);
        } else {
            echo json_encode(["message" => "Failed to Update Contact"]);
        }
    } else {
        echo json_encode(["message" => "Incomplete Data"]);
    }
?>
