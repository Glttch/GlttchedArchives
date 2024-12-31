<?php
// Database configuration
$host = 'localhost'; // Database host
$db = 'glttchedarchives'; // Database name
$user = 'root'; // Database username
$pass = ''; // Database password

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch manhwas with their categories
$categoryIds = [6, 9]; // 6 for Finished, 9 for Ongoing
$categoryIdList = implode(',', $categoryIds);

$sql = "SELECT manhwa.manhwaId, manhwa.title, manhwa.cover, manhwa_category.categoryId
        FROM manhwa
        JOIN manhwa_category ON manhwa.manhwaId = manhwa_category.manhwaId
        WHERE manhwa_category.categoryId IN ($categoryIdList)";
$result = $conn->query($sql);

$manhwas = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['cover'] = $row['cover'] 
        ? 'data:image/jpeg;base64,' . base64_encode($row['cover']) 
        : null;
        $manhwas[] = $row;
    }
}

// Group manhwas by categoryId
$groupedManhwas = [
    'completed' => array_filter($manhwas, fn($manhwa) => $manhwa['categoryId'] === 6),
    'ongoing' => array_filter($manhwas, fn($manhwa) => $manhwa['categoryId'] === 9),
];

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($groupedManhwas);

// Close connection
$conn->close();
?>
