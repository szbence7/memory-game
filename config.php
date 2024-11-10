<?php
$db_host = 'localhost';
$db_user = 'sql_memory_bence';
$db_pass = '0ff5fcbd3f4ee';
$db_name = 'sql_memory_bence';

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
