<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "glttchedarchives";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$manhwaId = intval($_POST['manhwaId']);

// Fetch plotStory, artStyle, characters, and averageRating
$sql = "SELECT plotStory, artStyle, characters, 
               (artStyle + plotStory + characters) / 3 AS averageRating 
        FROM rating 
        WHERE manhwaId = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $manhwaId);
$stmt->execute();
$stmt->bind_result($plotStory, $artStyle, $characters, $averageRating);
$stmt->fetch();

$response = [
    'plotStory' => $plotStory,
    'artStyle' => $artStyle,
    'characters' => $characters,
    'averageRating' => round($averageRating, 2) // Round to 2 decimal places
];

echo json_encode($response);

$stmt->close();
$conn->close();
?>
