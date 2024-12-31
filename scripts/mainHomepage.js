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
    const categoriesButtons = document.getElementById("categoriesButtons");
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

    // Fetch categories
    const categories = await fetchData("/GlttchedArchives/php/getCategories.php");
    categories.slice(0, 6).forEach(category => {
        const button = document.createElement("button");
        button.textContent = category.category; // Use the category name
        categoriesButtons.appendChild(button);
    });

    // Fetch manhwas
    const manhwas = await fetchData("/GlttchedArchives/php/fetchManhwas.php");

    // Separate completed and ongoing manhwas
    const completed = manhwas.filter(manhwa => !manhwa.finished); // Adjust filter logic if needed
    const ongoing = manhwas.filter(manhwa => !manhwa.finished); // Adjust filter logic if needed

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

