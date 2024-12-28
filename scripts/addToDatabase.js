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

document.addEventListener('DOMContentLoaded', () => {
    const categoryContainer = document.getElementById('category-buttons-container');
    
    fetch('/GlttchedArchives/php/getCategories.php')
        .then(response => response.json())
        .then(categories => {
            if (categories.length > 0) {
                categories.forEach(category => {
                    const label = document.createElement('label');
                    label.classList.add('category-label');
                    
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = 'categories[]'; // Name the checkboxes to submit as an array
                    checkbox.value = category.categoryId;
                    
                    label.appendChild(checkbox);
                    label.appendChild(document.createTextNode(category.category));
                    
                    categoryContainer.appendChild(label);
                });
            } else {
                console.error('No categories found.');
            }
        })
        .catch(error => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    const authorSelect = document.getElementById('authorName');
    const artistSelect = document.getElementById('artistName');

    if (authorSelect && artistSelect) {
        fetch('/GlttchedArchives/php/fetchAuthorsArtists.php')
            .then(response => response.json())
            .then(data => {
                // Populate authors dropdown
                data.authors.forEach(author => {
                    const option = document.createElement('option');
                    option.value = author.authorId;
                    option.textContent = author.authorName;
                    authorSelect.appendChild(option);
                });

                // Populate artists dropdown
                data.artists.forEach(artist => {
                    const option = document.createElement('option');
                    option.value = artist.artistId;
                    option.textContent = artist.artistName;
                    artistSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching authors and artists:', error));
    }
});
