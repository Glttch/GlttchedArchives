<?php
// Database configuration
$host = 'localhost'; // Database host
$db = 'glttchedarchives'; // Database name
$user = 'root'; // Database username
$pass = ''; // Database password (leave blank if none)

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $artistName = $_POST['artistName'];

    // Check if the artist already exists
    $stmt = $conn->prepare("SELECT artistId FROM artist WHERE artistName = ?");
    $stmt->bind_param("s", $artistName);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "Artist already exists.";
    } else {
        $stmt->close();
        $stmt = $conn->prepare("INSERT INTO artist (artistName) VALUES (?)");
        $stmt->bind_param("s", $artistName);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo "Artist added successfully.";
        } else {
            echo "Error adding artist.";
        }
    }
    $stmt->close();
}
?>
