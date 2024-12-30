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

document.addEventListener('DOMContentLoaded', () => {
    const ratingContainer = document.getElementById('rating-container');
    
    // Add 5 input fields for 5-star ratings
    for (let i = 1; i <= 5; i++) {
        const label = document.createElement('label');
        label.textContent = `Rating ${i}:`;
        const input = document.createElement('input');
        input.type = 'number';
        input.name = 'ratings[]'; // Naming each rating input to submit as an array
        input.min = '1';
        input.max = '5';
        input.step = '1';
        input.required = true;

        ratingContainer.appendChild(label);
        ratingContainer.appendChild(input);
        ratingContainer.appendChild(document.createElement('br'));
    }
});
