<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "glttchedarchives";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    $sql = "SELECT 
                m.manhwaId,
                m.title,
                m.numOfChapters,
                m.cover,
                a.authorName,
                ar.artistName,
                GROUP_CONCAT(c.category SEPARATOR ', ') AS categories
            FROM manhwa m
            JOIN author a ON m.authorId = a.authorId
            JOIN artist ar ON m.artistId = ar.artistId
            LEFT JOIN manhwa_category mc ON m.manhwaId = mc.manhwaId
            LEFT JOIN category c ON mc.categoryId = c.categoryId
            WHERE m.manhwaId = $id
            GROUP BY m.manhwaId";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data = $result->fetch_assoc();

        // Encode the cover image as Base64
        if (isset($data['cover'])) {
            $data['cover'] = base64_encode($data['cover']);
        }

        echo json_encode($data);
    } else {
        echo json_encode(['error' => 'Invalid request']);
    }
    $conn->close();
} else {
    echo json_encode(['error' => 'No ID provided']);
}
?>
