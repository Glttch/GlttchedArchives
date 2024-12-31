<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "glttchedarchives";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['error' => 'Connection failed: ' . $conn->connect_error]);
    exit;
}

$sql = "SELECT title, cover FROM manhwa ORDER BY manhwaId DESC LIMIT 8;";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(['error' => 'Query failed: ' . $conn->error]);
    exit;
}

$manhwas = [];
while ($row = $result->fetch_assoc()) {
    $manhwas[] = [
        'title' => $row['title'],
        'cover' => $row['cover'] ? base64_encode($row['cover']) : null,
    ];
}

if (empty($manhwas)) {
    echo json_encode(['message' => 'No recent manhwas found']);
} else {
    echo json_encode($manhwas);
}

$conn->close();
?>
