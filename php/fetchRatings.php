<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "glttchedarchives";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$manhwaId = intval($_POST['manhwaId']);

$sql = "SELECT plotStory, artStyle, characters FROM rating WHERE manhwaId = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $manhwaId);
$stmt->execute();
$stmt->bind_result($plotStory, $artStyle, $characters);
$stmt->fetch();

$response = [
    'plotStory' => $plotStory,
    'artStyle' => $artStyle,
    'characters' => $characters
];

echo json_encode($response);

$stmt->close();
$conn->close();
?>
