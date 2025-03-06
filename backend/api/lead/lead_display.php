<?php
    require_once __DIR__ . '/../../include/headers.php';
    require_once __DIR__ . '/../../classes/crm.php';

    $crm = new CRM();
    $leads = $crm->getAllLeads();

    if($leads){
        echo json_encode($leads);
    }else{
        echo json_encode(["message" => "No leads found"]);
    }
?>