<?php
$conn = new mysqli('localhost', 'root', '', 'glttchedarchives');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT m.title, r.averageRating 
        FROM manhwa m 
        JOIN rating r ON m.manhwaId = r.manhwaId 
        ORDER BY r.averageRating DESC 
        LIMIT 5;";
$result = $conn->query($sql);

$manhwas = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $manhwas[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($manhwas);

$conn->close();
?>
