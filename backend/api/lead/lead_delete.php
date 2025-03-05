<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

    require_once __DIR__ . '/../../classes/crm.php';

    if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        if(isset($_GET['id'])){
            $id = $_GET['id'];

            $crm = new CRM();
            $result = $crm->deleteLead($id);

            if($result){
                echo json_encode(["message" => "Lead Deleted Successfully"]);
            }else{
                echo json_encode(["message" => "Failed to Delete Lead"]);
            }
        }else{
            echo json_encode(["message" => "Lead ID Not Provided"]);
        }
    }else{
        echo json_encode(["message" => "Invalid Request Method"]);
    }
?>