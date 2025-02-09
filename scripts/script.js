
// Load the menu.html file into the div
fetch('/assets/pages/menu.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading the menu:', error));

    fetch('/assets/pages/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error('Error loading the menu:', error));

// Function to dynamically fetch and load sections
function loadSections(sectionPrefix) {
    document.querySelectorAll(`[id^="${sectionPrefix}"]`).forEach(section => {
        let sectionId = section.id; // e.g., "home-section1"

            // Split the ID at "-" (e.g., ["home", "section1"])
            let parts = sectionId.split('-');
            
            if (parts.length < 2) {
                console.error(`Invalid section ID format: ${sectionId}`);
                return;
            }

            let sectionName = parts.slice(1).join('-'); // Get "section1" (or whatever comes after "home-")
            let filePath = `/assets/pages/${parts[0]}/${sectionName}.html`; // Maps to "assets/pages/home/section1.html"


        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${filePath}`);
                return response.text();
            })
            .then(data => {
                section.innerHTML = data;
            })
            .catch(error => console.error(`Error loading ${filePath}:`, error));
    });
}

function updateSectionHeight() {
    // Check if the window width is less than 900px
    // Get the height of the navbar
    let navbar = document.querySelector('.navbar');
    let navbarHeight = navbar ? navbar.offsetHeight : 0; // Ensure navbar exists before accessing its height
    console.log("Navbar Height:", navbarHeight);

    // Use visualViewport height for better mobile support
    let viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

    // Calculate the new height, ensuring a minimum of 600px
    let newHeight = Math.max(viewportHeight - navbarHeight, 600);

    // Select all sections with the class 'page-section'
    let sections = document.querySelectorAll('.page-section');
    let isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';

    sections.forEach((section, index) => {
        console.log("Section Index:", index);
        if (index === 0) {
            if (isHomePage && window.innerWidth <= 900) {
                section.style.height = `${newHeight}px`; // Set height only on homepage
            }
            section.style.marginTop = `${navbarHeight}px`; // Apply margin-top only to the first section
        } else {
            section.style.marginTop = "0px"; // Reset margin for other sections
        }
    });
}

// Call the function when the window resizes
window.addEventListener('resize', updateSectionHeight);

// Call the function on page load
window.addEventListener('load', updateSectionHeight);

window.addEventListener("load", updateSectionHeight);
window.visualViewport?.addEventListener("resize", updateSectionHeight);
window.addEventListener("scroll", updateSectionHeight); //
window.addEventListener("resize", updateSectionHeight);