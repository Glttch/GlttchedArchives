document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const manhwaId = urlParams.get('id'); // Get manhwaId from the URL

    if (!manhwaId) {
        alert('No manhwa ID provided!');
        window.location.href = 'manhwasPage.html';
        return;
    }

    // Fetch manhwa details
    fetch(`/GlttchedArchives/php/manhwaInfo.php?id=${manhwaId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                window.location.href = 'manhwasPage.html';
            } else {
                document.getElementById('manhwaCover').src = data.cover ? `data:image/jpeg;base64,${data.cover}` : 'style/images/default-cover.png';
                document.getElementById('manhwaTitle').textContent = data.title || 'Untitled';
                document.getElementById('manhwaAuthor').textContent = data.authorName || 'Unknown';
                document.getElementById('manhwaArtist').textContent = data.artistName || 'Unknown';
                document.getElementById('manhwaChapters').textContent = data.numOfChapters || '0';
                document.getElementById('manhwaCategories').textContent = data.categories || 'None';

                // Fetch and display ratings
                fetchRating(manhwaId);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to load manhwa details.');
            window.location.href = 'manhwasPage.html';
        });
});

// Function to fetch ratings
function fetchRating(manhwaId) {
    fetch(`/GlttchedArchives/php/fetchRatings.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `manhwaId=${manhwaId}`
    })
    .then(response => response.json())
    .then(data => {
        displayStars('storyplot-rating', data.plotStory);
        displayStars('artstyle-rating', data.artStyle);
        displayStars('character-rating', data.characters);
    })
    .catch(error => console.error('Error fetching rating:', error));
}

// Function to display stars
function displayStars(containerClass, starsCount) {
    const container = document.querySelector(`.${containerClass}`);
    container.innerHTML = ''; // Clear existing stars

    for (let i = 0; i < Math.floor(starsCount); i++) {
        const star = document.createElement('div');
        star.classList.add('rating-star');
        star.classList.add('full-star'); // Class for full star
        container.appendChild(star);
    }

    if (starsCount % 1 >= 0.5) {
        const halfStar = document.createElement('div');
        halfStar.classList.add('rating-star');
        halfStar.classList.add('half-star'); // Class for half star
        container.appendChild(halfStar);
    }

    // Populate transparent stars for the remaining
    const remainingStars = 5 - Math.ceil(starsCount);
    for (let i = 0; i < remainingStars; i++) {
        const emptyStar = document.createElement('div');
        emptyStar.classList.add('rating-star'); // Class for empty star
        container.appendChild(emptyStar);
    }
}

