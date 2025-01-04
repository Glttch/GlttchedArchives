<?php
$host = 'localhost'; // Database host
$db = 'glttchedarchives'; // Database name
$user = 'root'; // Database username
$pass = ''; // Database password

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);
$manhwaId = $data['manhwaId'];
$numOfChapters = $data['numOfChapters'];

// Update the number of chapters
$sql = "UPDATE manhwa SET numOfChapters = ? WHERE manhwaId = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $numOfChapters, $manhwaId);

$response = [];
if ($stmt->execute()) {
    $response['success'] = true;
    $response['message'] = 'Chapters updated successfully.';
} else {
    $response['success'] = false;
    $response['message'] = 'Failed to update chapters.';
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);

// Close connection
$stmt->close();
$conn->close();
?>
