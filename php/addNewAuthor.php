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
    $authorName = $_POST['authorName'];

    // Check if the author already exists
    $stmt = $conn->prepare("SELECT authorId FROM author WHERE authorName = ?");
    $stmt->bind_param("s", $authorName);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "Author already exists.";
    } else {
        $stmt->close();
        $stmt = $conn->prepare("INSERT INTO author (authorName) VALUES (?)");
        $stmt->bind_param("s", $authorName);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo "Author added successfully.";
        } else {
            echo "Error adding author.";
        }
    }
    $stmt->close();
}
?>
