<?php
header('Content-Type: application/json');
require_once 'config.php';

$query = "SELECT * FROM leaderboard ORDER BY score DESC LIMIT 10";
$result = $conn->query($query);

$leaderboard = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $leaderboard[] = $row;
    }
}

echo json_encode($leaderboard);
$conn->close();
?>
