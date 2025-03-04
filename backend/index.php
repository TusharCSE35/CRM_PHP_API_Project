<?php
    require_once 'config/database.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Page</title>
</head>
<body>
    <h1>Welcome to CRM Backend</h1>

    <?php 
    $database = new Database();
    $db = $database->connection();

    ?>
</body>
</html>


<!-- 
CRM_API_Project/
│
├─ backend/
│   ├─ api/
│   │   ├─ lead/
│   │   │   ├─ lead_add.php
│   │   │   ├─ lead_display.php
│   │   │   ├─ lead_delete.php
│   │   │   ├─ lead_edit.php
│   │   │   └─ lead_search.php
│   │   └─ contact/
│   │       ├─ contact_add.php
│   │       ├─ contact_delete.php
│   │       ├─ contact_display.php
│   │       ├─ contact_edit.php
│   │       └─ contact_search.php
│   │   └─ lead_contact_display.php
│
├─ config/
│   └─ database.php
│
├─ models/
│   ├─ lead.php
│   └─ contact.php
│
├─ classes/
│   └─ crm.php 
 -->