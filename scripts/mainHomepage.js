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

document.addEventListener("DOMContentLoaded", async () => {
    const completedManhwas = document.getElementById("completedManhwas");
    const ongoingManhwas = document.getElementById("ongoingManhwas");

    // Helper function to fetch data from PHP
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            console.error("Fetch error:", error);
            return [];
        }
    };

    const categories = await fetchData("/GlttchedArchives/php/getCategories.php");
    categories.slice(0, 6).forEach(category => {
        const button = document.createElement("button");
        button.textContent = category.category; // Use the category name
        categoriesButtons.appendChild(button);
    });

    // Fetch manhwas
    // const manhwas = await fetchData("/GlttchedArchives/php/fetchManhwas.php");
    const completed = await fetchData("/GlttchedArchives/php/fetchCompleted.php");
    const ongoing = await fetchData("/GlttchedArchives/php/fetchOngoing.php");

    // Separate completed and ongoing manhwas
    // const completed = manhwas.filter(manhwa => manhwa.status === 'Finished');
    // const ongoing = manhwas.filter(manhwa => manhwa.status === 'Ongoing');

    // Populate completed manhwas (random 5)
    const randomCompleted = completed.sort(() => 0.5 - Math.random()).slice(0, 5);
    randomCompleted.forEach(manhwa => {
        const div = document.createElement("div");
        div.setAttribute("data-title", manhwa.title); // Set the title as data-title
        div.innerHTML = `
            <img src="${manhwa.cover}" alt="${manhwa.title}" />
            <div class="manhwa-title">${manhwa.title}</div> <!-- Title displayed on hover -->
        `;
        div.classList.add('manhwa-card'); // Add a class for styling or targeting
        
        // Add click event listener to redirect to manhwaInfo.html
        div.addEventListener('click', () => {
            window.location.href = `manhwaInfo.html?id=${manhwa.manhwaId}`; // Redirect to manhwaInfo.html with manhwaId
        });

        completedManhwas.appendChild(div);
    });

    // Populate ongoing manhwas (random 5)
    const randomOngoing = ongoing.sort(() => 0.5 - Math.random()).slice(0, 5);
    randomOngoing.forEach(manhwa => {
        const div = document.createElement("div");
        div.setAttribute("data-title", manhwa.title); // Set the title as data-title
        div.innerHTML = `
            <img src="${manhwa.cover}" alt="${manhwa.title}" />
            <div class="manhwa-title">${manhwa.title}</div> <!-- Title displayed on hover -->
        `;
        div.classList.add('manhwa-card'); // Add a class for styling or targeting
        
        // Add click event listener to redirect to manhwaInfo.html
        div.addEventListener('click', () => {
            window.location.href = `manhwaInfo.html?id=${manhwa.manhwaId}`; // Redirect to manhwaInfo.html with manhwaId
        });

        ongoingManhwas.appendChild(div);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const carouselRow = document.getElementById('recentManhwas');

    const fetchRecentManhwas = async () => {
        try {
            const response = await fetch('/GlttchedArchives/php/recentManhwas.php');
            const data = await response.json();

            if (!Array.isArray(data)) throw new Error('Invalid data format');

            data.forEach(manhwa => {
                const card = document.createElement('div');
                card.classList.add('manhwa-card');
                card.innerHTML = `
                    <img src="data:image/jpeg;base64,${manhwa.cover}" alt="${manhwa.title}">
                    <h3>${manhwa.title}</h3>
                `;
                carouselRow.appendChild(card);
            });

        } catch (error) {
            console.error('Error fetching recent manhwas:', error);
        }
    };

    fetchRecentManhwas();
});

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#currentlyReadingTable tbody');

    // Fetch ongoing manhwas
    fetch('/GlttchedArchives/php/fetchOngoing.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(manhwa => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${manhwa.title}</td>
                    <td>
                        <input type="number" value="${manhwa.numOfChapters}" data-id="${manhwa.manhwaId}" class="num-of-chapters-input" />
                    </td>
                    <td>
                        <button class="update-btn" data-id="${manhwa.manhwaId}">Update</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching ongoing manhwas:', error));

    // Event delegation for updating chapters
    tableBody.addEventListener('click', event => {
        if (event.target.classList.contains('update-btn')) {
            const manhwaId = event.target.dataset.id;
            const input = document.querySelector(`.num-of-chapters-input[data-id="${manhwaId}"]`);
            const numOfChapters = input.value;

            // Update the number of chapters via API
            fetch('/GlttchedArchives/php/updateChapters.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ manhwaId, numOfChapters })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Number of chapters updated successfully.');
                    } else {
                        alert('Failed to update chapters.');
                    }
                })
                .catch(error => console.error('Error updating chapters:', error));
        }
    });
});





