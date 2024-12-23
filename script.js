// Get DOM Elements
const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const backButton = document.getElementById('backButton');

// Add Event Listener to Toggle Sidebar
menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Add Event Listener to Back Button
backButton.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const manhwaList = document.getElementById('manhwaList');

    // Fetch manhwas from the server
    fetch('php/fetchManhwas.php')
        .then(response => response.json())
        .then(data => {
            // Clear existing content
            manhwaList.innerHTML = '';

            // Check if there are manhwas
            if (data.length === 0) {
                manhwaList.innerHTML = '<p>No manhwas found.</p>';
                return;
            }

            // Loop through and display manhwas
            data.forEach(manhwa => {
                const manhwaCard = document.createElement('div');
                manhwaCard.classList.add('manhwa-card');

                // Handle cover image
                const coverImg = manhwa.cover 
                    ? `<img src="${manhwa.cover}" alt="Cover Image" class="manhwa-cover">`
                    : '<div class="manhwa-placeholder">No Cover</div>';

                manhwaCard.innerHTML = `
                    ${coverImg}
                    <h3>${manhwa.title}</h3>
                    <p><strong>Author ID:</strong> ${manhwa.authorId}</p>
                    <p><strong>Artist ID:</strong> ${manhwa.artistId}</p>
                    <p><strong>Chapters:</strong> ${manhwa.numOfChapters}</p>
                `;

                manhwaList.appendChild(manhwaCard);
            });
        })
        .catch(error => {
            console.error('Error fetching manhwas:', error);
            manhwaList.innerHTML = '<p>Error loading manhwas.</p>';
        });
});
