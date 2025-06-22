function toggleMenu() {
    var submenu = document.getElementById('submenu');
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
}

// Function to display the current date, time, and location
function displayDateTimeLocation() {
    const dateTimeLocation = document.getElementById('datetime-location');
    const now = new Date();

    // Options for formatting date and time
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    dateTimeLocation.innerHTML = now.toLocaleDateString('en-US', options);
}

// Initialize and add the map
function initMap() {
    const storeLocation = { lat: 7.3775, lng: 3.8964 }; // Coordinates for NNPC Depot Junction, Abeokuta Road, Apata, Ibadan

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: storeLocation
    });

    const marker = new google.maps.Marker({
        position: storeLocation,
        map: map
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Add a marker for the user's location
            const userMarker = new google.maps.Marker({
                position: userLocation,
                map: map,
                label: "You are here"
            });

            // Center the map to the user's location
            map.setCenter(userLocation);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Load the map script
function loadMapScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBc6PlrLvw02_VLYzvF0AlJPqUxNjd8Abc&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Display date, time, and location on page load
window.onload = () => {
    displayDateTimeLocation();
    loadMapScript();
};