<?php
$conn = new mysqli('localhost', 'root', '', 'glttchedarchives');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'];
    $authorId = $_POST['authorName'];
    $artistId = $_POST['artistName'];
    $numOfChapters = $_POST['numOfChapters'];
    $cover = file_get_contents($_FILES['coverImage']['tmp_name']);
    $artStyle = $_POST['artStyle'];
    $plotStory = $_POST['plotStory'];
    $characters = $_POST['characters'];
    $categoryIds = $_POST['categories'];
    $status = $_POST['status']; 

    // Calculate average rating
    $averageRating = ($artStyle + $plotStory + $characters) / 3;

    // Insert the manhwa data
    $stmt = $conn->prepare("INSERT INTO manhwa (title, authorId, artistId, numOfChapters, cover, status) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("siiibs", $title, $authorId, $artistId, $numOfChapters, $cover, $status);
    $stmt->send_long_data(4, $cover);

    if ($stmt->execute()) {
        echo "Manhwa added successfully!";
        $manhwaId = $conn->insert_id;

        // Insert ratings
        $stmt = $conn->prepare("INSERT INTO rating (manhwaId, artStyle, plotStory, characters, averageRating) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("idddd", $manhwaId, $artStyle, $plotStory, $characters, $averageRating);
        if (!$stmt->execute()) {
            throw new Exception("Error inserting ratings: " . $stmt->error);
        }

        // Insert categories
        foreach ($categoryIds as $categoryId) {
            $stmt = $conn->prepare("INSERT INTO manhwa_category (manhwaId, categoryId) VALUES (?, ?)");
            $stmt->bind_param("ii", $manhwaId, $categoryId);
            if (!$stmt->execute()) {
                throw new Exception("Error inserting manhwa_category: " . $stmt->error);
            }
        }

        $conn->commit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
