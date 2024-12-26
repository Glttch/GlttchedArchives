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

// Check if data is posted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $authorId = $_POST['authorId'];
    $artistId = $_POST['artistId'];
    $numOfChapters = $_POST['numOfChapters'];
    $categoryIds = $_POST['categories']; // Multiple categories

    // Start transaction
    $conn->begin_transaction();

    try {
        // Insert into manhwa table
        $stmt = $conn->prepare("INSERT INTO manhwa (title, authorId, artistId, numOfChapters) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("siii", $title, $authorId, $artistId, $numOfChapters);

        if (!$stmt->execute()) {
            throw new Exception("Error inserting manhwa: " . $stmt->error);
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

        echo "New manhwa added successfully.";
    } catch (Exception $e) {
        // Rollback transaction on error
        $conn->rollback();
        echo "Failed to add new manhwa: " . $e->getMessage();
    }

    // Close statement
    $stmt->close();
}

// Close connection
$conn->close();
?>