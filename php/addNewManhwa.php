<?php
// Database connection
$conn = new mysqli('localhost', 'root', '', 'glttchedarchives');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch authors and artists for the dropdowns
$authors = $conn->query("SELECT authorId, authorName FROM author");
$artists = $conn->query("SELECT artistId, artistName FROM artist");

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'];
    $authorId = $_POST['authorName'];
    $artistId = $_POST['artistName'];
    $numOfChapters = $_POST['numOfChapters'];

    // Insert into manhwa
    $stmt = $conn->prepare("INSERT INTO manhwa (title, authorId, artistId, numOfChapters) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("siii", $title, $authorId, $artistId, $numOfChapters);

    if ($stmt->execute()) {
        echo "Manhwa added successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
    $conn->close();
}
?>
