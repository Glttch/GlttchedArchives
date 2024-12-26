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

// Fetch authors from the database
$authorsQuery = "SELECT authorId, authorName FROM author";
$authorsResult = mysqli_query($conn, $authorsQuery);

$authors = [];
while ($author = mysqli_fetch_assoc($authorsResult)) {
    $authors[] = $author;
}

// Fetch artists from the database
$artistsQuery = "SELECT artistId, artistName FROM artist";
$artistsResult = mysqli_query($conn, $artistsQuery);

$artists = [];
while ($artist = mysqli_fetch_assoc($artistsResult)) {
    $artists[] = $artist;
}

// Return data as JSON
echo json_encode(['authors' => $authors, 'artists' => $artists]);

$conn->close();
?>
