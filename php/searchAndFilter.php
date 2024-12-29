<?php
header('Content-Type: application/json');

// Database configuration
$host = 'localhost';
$db = 'glttchedarchives';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Get filter and search parameters
$filter = $_GET['filter'] ?? 'all';
$search = $_GET['search'] ?? '';

$sql = "
    SELECT m.manhwaId, m.title, m.numOfChapters, m.cover 
    FROM manhwa m
    LEFT JOIN manhwa_category mc ON m.manhwaId = mc.manhwaId
    LEFT JOIN category c ON mc.categoryId = c.categoryId
";

$conditions = [];
if ($filter !== 'all') {
    $conditions[] = "mc.categoryId = ?";
}
if (!empty($search)) {
    $conditions[] = "m.title LIKE ?";
}

if (!empty($conditions)) {
    $sql .= " WHERE " . implode(' AND ', $conditions);
}

$stmt = $conn->prepare($sql);

if ($filter !== 'all' && !empty($search)) {
    $searchParam = "%$search%";
    $stmt->bind_param('is', $filter, $searchParam);
} elseif ($filter !== 'all') {
    $stmt->bind_param('i', $filter);
} elseif (!empty($search)) {
    $searchParam = "%$search%";
    $stmt->bind_param('s', $searchParam);
}

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(['error' => 'Query execution failed: ' . $stmt->error]);
    exit;
}

$result = $stmt->get_result();
$manhwas = [];
while ($row = $result->fetch_assoc()) {
    $row['cover'] = $row['cover']
        ? 'data:image/jpeg;base64,' . base64_encode($row['cover'])
        : null;
    $manhwas[] = $row;
}

echo json_encode($manhwas);

$stmt->close();
$conn->close();
?>
