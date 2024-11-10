<?php
header('Content-Type: application/json');
require_once 'config.php';

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log the incoming data
$rawData = file_get_contents('php://input');
error_log('Received data: ' . $rawData);

$data = json_decode($rawData, true);

if (isset($data['name']) && isset($data['score']) && isset($data['moves']) && isset($data['time'])) {
    try {
        // Validate data types
        $name = trim($data['name']);
        $score = intval($data['score']);
        $moves = intval($data['moves']);
        $time = intval($data['time']);

        $stmt = $conn->prepare("INSERT INTO leaderboard (name, score, moves, time) VALUES (?, ?, ?, ?)");
        if (!$stmt) {
            error_log("Prepare failed: " . $conn->error);
            echo json_encode(['success' => false, 'error' => 'Prepare failed: ' . $conn->error]);
            exit;
        }

        $stmt->bind_param("siii", $name, $score, $moves, $time);
        
        if ($stmt->execute()) {
            $rankQuery = "SELECT COUNT(*) + 1 as rank FROM leaderboard WHERE score > ?";
            $rankStmt = $conn->prepare($rankQuery);
            $rankStmt->bind_param("i", $score);
            $rankStmt->execute();
            $result = $rankStmt->get_result();
            $rank = $result->fetch_assoc()['rank'];
            
            echo json_encode([
                'success' => true,
                'rank' => $rank
            ]);
            
            $rankStmt->close();
        } else {
            error_log("Execute failed: " . $stmt->error);
            echo json_encode(['success' => false, 'error' => 'Execute failed: ' . $stmt->error]);
        }
        $stmt->close();
    } catch (Exception $e) {
        error_log("Exception: " . $e->getMessage());
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    error_log("Missing data fields in: " . print_r($data, true));
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
}

$conn->close();
?>
