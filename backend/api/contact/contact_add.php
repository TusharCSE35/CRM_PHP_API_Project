<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    
    require_once __DIR__ . '/../../classes/crm.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"));
        // echo $data;
    
        if (!empty($data->lead_id) && !empty($data->name) && !empty($data->email) && !empty($data->address)) {
            $crm = new CRM();
            $result = $crm->addContact($data->lead_id, $data->name, $data->email, $data->address);
    
            if ($result) {
                echo json_encode(["message" => "Contact added successfully"]);
            } else {
                echo json_encode(["message" => "Failed to Add Contact"]);
            }
        } else {
            echo json_encode(["message" => "All Fields Are Required"]);
        }
    } else {
        echo json_encode(["message" => "Invalid Request Method"]);
    }

?>