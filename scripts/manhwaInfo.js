document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const manhwaId = urlParams.get('id'); // Get manhwaId from the URL

    if (!manhwaId) {
        alert('No manhwa ID provided!');
        window.location.href = 'manhwasPage.html';
        return;
    }

    fetch(`/GlttchedArchives/php/manhwaInfo.php?id=${manhwaId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                window.location.href = 'manhwasPage.html';
            } else {
                document.getElementById('manhwaCover').src = `data:image/jpeg;base64,${btoa(data.cover)}` || 'style/images/default-cover.png';
                document.getElementById('manhwaTitle').textContent = data.title || 'Untitled';
                document.getElementById('manhwaAuthor').textContent = data.authorName || 'Unknown';
                document.getElementById('manhwaArtist').textContent = data.artistName || 'Unknown';
                document.getElementById('manhwaChapters').textContent = data.numOfChapters || '0';
                document.getElementById('manhwaCategories').textContent = data.categories || 'None';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to load manhwa details.');
            window.location.href = 'manhwasPage.html';
        });
});


