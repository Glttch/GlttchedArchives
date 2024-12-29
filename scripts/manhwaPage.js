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
    fetch('/GlttchedArchives/php/fetchManhwas.php')
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
                const manhwaCard = document.createElement('button'); // Change to a button element
                manhwaCard.classList.add('manhwa-card');
                manhwaCard.innerHTML = `
                    ${manhwa.cover ? `<img src="${manhwa.cover}" alt="Cover Image">` : ''}
                    <h3>${manhwa.title}</h3>
                    <p><strong>Chapters:</strong> ${manhwa.numOfChapters}</p>
                `;
                
                
                manhwaCard.addEventListener('click', () => {
                    const manhwaId = manhwa.manhwaId; // Get the manhwaId
                    window.location.href = `manhwaInfo.html?id=${manhwaId}`;
                });
            
                manhwaList.appendChild(manhwaCard);
            });
            
            
        })
        .catch(error => {
            console.error('Error fetching manhwas:', error);
            manhwaList.innerHTML = '<p>Error loading manhwas.</p>';
        });
});
