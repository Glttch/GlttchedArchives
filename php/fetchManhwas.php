<?php
// Database configuration
$host = 'localhost'; // Database host
$db = 'glttchedarchives'; // Database name
$user = 'root'; // Database username
$pass = ''; // Database password

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch all manhwas with status filtering
$sql = "SELECT manhwaId, title, authorId, artistId, numOfChapters, cover, status FROM manhwa WHERE status = 'Ongoing' OR status = 'Finished'";
$result = $conn->query($sql);

$manhwas = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Encode the cover as base64
        $row['cover'] = $row['cover'] 
        ? 'data:image/jpeg;base64,' . base64_encode($row['cover']) 
        : null;
        $manhwas[] = $row;
    }
}

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($manhwas);

// Close connection
$conn->close();
?>
