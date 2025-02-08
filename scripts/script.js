
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
    // Get the height of the navbar
    let navbarHeight = document.querySelector('.navbar').offsetHeight;
    console.log(navbarHeight);
    // Calculate the new height for sections
    //let newHeight = (window.innerHeight ) - navbarHeight;
    let newHeight = Math.max(window.innerHeight - navbarHeight, 600);

    let sections = document.querySelectorAll('.page-section');
    let isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';

    sections.forEach((section, index) => {
        //
        console.log(index);
        if (index === 0) {
            if (isHomePage){
            section.style.height = `${newHeight}px`; // Set height for all sections
            }
            section.style.marginTop = `${navbarHeight}px`; // Apply margin-top only to the first section
        } else {
            section.style.marginTop = "0px"; // Reset for other sections
        }
    });
}

window.addEventListener("load", updateSectionHeight);
        // Run the function when the window is resized (for responsiveness)
window.addEventListener("resize", updateSectionHeight);