<?php
// Database configuration
$host = '127.0.0.1'; // Database host
$db = 'glttchedarchives'; // Database name
$user = 'root'; // Database username
$pass = ''; // Database password (leave blank if none)

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if data is posted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $authorId = $_POST['authorId'];
    $artistId = $_POST['artistId'];
    $numOfChapters = $_POST['numOfChapters'];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO manhwa (title, authorId, artistId, numOfChapters) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("siii", $title, $authorId, $artistId, $numOfChapters);

    // Execute the statement
    if ($stmt->execute()) {
        echo "New manhwa added successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement
    $stmt->close();
}

// Close connection
$conn->close();
?>
