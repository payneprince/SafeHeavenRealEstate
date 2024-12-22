// Mocked Property Data (to replace the PHP database)
const properties = [
    {
        title: "Modern Family Home",
        description: "A beautiful family home with a large backyard.",
        price: 450000,
        location: "Tema, Accra",
        image_url: "images/property1.jpeg"
    },
    {
        title: "Luxury Penthouse",
        description: "An upscale penthouse with a stunning city view.",
        price: 1500000,
        location: "Tesano, Accra",
        image_url: "images/property2.jpeg"
    },
    {
        title: "Cozy Cottage",
        description: "A CUTE cottage perfect for weekend getaways.",
        price: 220000,
        location: "Dansoman, Accra",
        image_url: "images/property3.png"
    },
    {title: "Uphill view",
        description: "A HILL cottage perfect for weekend getaways.",
        price: 220000,
        location: "Aburi,Accra",
        image_url: "images/property4.png"
    },
    {title: "North view",
        description: "A BIG cottage perfect for weekend getaways.",
        price: 220000,
        location: "Aburi,Accra",
        image_url: "images/property 5.JPG"
    }
];

// Function to display properties dynamically
function displayProperties(propertiesToDisplay) {
    const propertyGrid = document.getElementById('property-grid');
    propertyGrid.innerHTML = '';  // Clear existing properties

    propertiesToDisplay.forEach(property => {
        const propertyCard = document.createElement('div');
        propertyCard.classList.add('property-card');

        propertyCard.innerHTML = `
            <img src="${property.image_url}" alt="${property.title}" class="property-image" />
            <h2>${property.title}</h2>
            <p>${property.description}</p>
            <p><strong>Price:</strong> $${property.price.toLocaleString()}</p>
            <p><strong>Location:</strong> ${property.location}</p>
        `;

        propertyGrid.appendChild(propertyCard);
    });
}

// Initial display of all properties
displayProperties(properties);

// Search functionality
document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const searchTitle = document.getElementById('search_title').value.toLowerCase();
    const searchLocation = document.getElementById('search_location').value.toLowerCase();
    const searchPrice = document.getElementById('search_price').value;

    // Filter properties based on search criteria
    const filteredProperties = properties.filter(property => {
        return (
            (property.title.toLowerCase().includes(searchTitle) || !searchTitle) &&
            (property.location.toLowerCase().includes(searchLocation) || !searchLocation) &&
            (property.price <= (searchPrice || Infinity))
        );
    });

    displayProperties(filteredProperties);
});

// Register functionality
document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if user already exists in localStorage
    const existingUser = localStorage.getItem(email);
    
    if (existingUser) {
        document.getElementById("registerError").textContent = "This email is already registered!";
    } else {
        // Store the new user in localStorage (password should be hashed in real-world use)
        localStorage.setItem(email, JSON.stringify({ email, password }));
        alert("Registration successful! You can now log in.");
        window.location.href = "login.html";  // Redirect to login page
    }
});

// Login functionality
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Check if user exists in localStorage
    const user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {
        // Successful login
        alert("Login successful!");
        window.location.href = "properties.html";  // Redirect to properties page
    } else {
        document.getElementById("loginError").textContent = "Invalid email or password!";
    }
});
