// Function to toggle sidebar visibility
function toggleSidebar() {
    sidebar.classList.toggle('active');
}

// Function to close sidebar
function closeSidebar() {
    sidebar.classList.remove('active');
}

// Fetch authors and their manhwas
async function fetchAuthors() {
    try {
        const response = await fetch('/GlttchedArchives/php/fetchAuthors.php'); // PHP endpoint to fetch authors and manhwas
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const authors = await response.json(); // Parse the JSON response
        console.log('Fetched authors from JS:', authors);
        displayAuthors(authors);
    } catch (error) {
        console.error('Error fetching authors:', error);
    }
}

// Display authors and their manhwas
function displayAuthors(authors) {
    const authorsContainer = document.getElementById('authors-container');
    authorsContainer.innerHTML = ''; // Clear previous content
    
    console.log('Displaying authors:', authors); // Log authors for debugging

    authors.forEach(author => {
        const authorElement = document.createElement('li');
        authorElement.innerHTML = `<strong>${author.authorName}</strong>`;
        
        if (author.manhwas && Array.isArray(author.manhwas)) {
            const manhwaList = document.createElement('ul');
            author.manhwas.forEach(manhwa => {
                const manhwaItem = document.createElement('li');
                manhwaItem.innerHTML = `<a href="manhwaDetails.html?id=${manhwa.id}">${manhwa.title}</a>`;
                manhwaList.appendChild(manhwaItem);
            });
            authorElement.appendChild(manhwaList);
        } else {
            authorElement.innerHTML += 'No manhwas found';
        }
        
        authorsContainer.appendChild(authorElement);
    });
}


// Add event listener to menu button for sidebar toggle
menuButton.addEventListener('click', toggleSidebar);

// Add event listener to back button for closing sidebar
backButton.addEventListener('click', closeSidebar);

// Call the fetchAuthors function to load the data
fetchAuthors();
