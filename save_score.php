<?php
header('Content-Type: application/json');
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['name']) && isset($data['score']) && isset($data['moves']) && isset($data['time'])) {
    try {
        // Először mentsük el az új pontszámot
        $stmt = $conn->prepare("INSERT INTO leaderboard (name, score, moves, time) VALUES (?, ?, ?, ?)");
        if (!$stmt) {
            error_log("Prepare failed: " . $conn->error);
            echo json_encode(['success' => false, 'error' => 'Prepare failed: ' . $conn->error]);
            exit;
        }

        $stmt->bind_param("siii", 
            $data['name'], 
            $data['score'], 
            $data['moves'], 
            $data['time']
        );
        
        if ($stmt->execute()) {
            // Most nézzük meg, hanyadik helyen áll
            $rankQuery = "SELECT COUNT(*) + 1 as rank FROM leaderboard WHERE score > ?";
            $rankStmt = $conn->prepare($rankQuery);
            $rankStmt->bind_param("i", $data['score']);
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
    error_log("Missing data fields");
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
}

$conn->close();
?>
