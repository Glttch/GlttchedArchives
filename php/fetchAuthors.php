<?php
$conn = new mysqli('localhost', 'root', '', 'glttchedarchives');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch authors and associated manhwas
$sql = "SELECT a.authorName as name, m.title as manhwaTitle, m.manhwaId as id
        FROM author a
        JOIN manhwa m ON a.authorId = m.authorId";

$result = $conn->query($sql);

$authors = [];
while ($row = $result->fetch_assoc()) {
    $authors[$row['name']]['manhwas'][] = ['id' => $row['id'], 'title' => $row['manhwaTitle']];
}

echo json_encode(array_values($authors));

$conn->close();
?>
