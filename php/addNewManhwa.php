<?php
// Database connection
$conn = new mysqli('localhost', 'root', '', 'glttchedarchives');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'];
    $authorId = $_POST['authorName'];
    $artistId = $_POST['artistName'];
    $numOfChapters = $_POST['numOfChapters'];
    $categoryIds = $_POST['categories'];

    // Check if a file is uploaded
    if (isset($_FILES['coverImage']) && $_FILES['coverImage']['error'] == UPLOAD_ERR_OK) {
        $cover = file_get_contents($_FILES['coverImage']['tmp_name']);
    } else {
        die("Cover file not uploaded or invalid.");
    }

    // Insert into the database
    $stmt = $conn->prepare("INSERT INTO manhwa (title, authorId, artistId, numOfChapters, cover) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("siibs", $title, $authorId, $artistId, $numOfChapters, $cover);

    if ($stmt->execute()) {
        echo "Manhwa added successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Get the last inserted manhwa ID
    $manhwaId = $conn->insert_id;
    // Insert into manhwa_category table for each category
    foreach ($categoryIds as $categoryId) {
        $stmt = $conn->prepare("INSERT INTO manhwa_category (manhwaId, categoryId) VALUES (?, ?)");
        $stmt->bind_param("ii", $manhwaId, $categoryId);
        if (!$stmt->execute()) {
            throw new Exception("Error inserting manhwa_category: " . $stmt->error);
        }
    }
    // Commit transaction
    $conn->commit();

    $stmt->close();
}

$conn->close();

?>
