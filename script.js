// Initialize Leaflet Map for Background
const initMap = () => {
    // Create map, disable interactions since it's just a background
    const map = L.map('map-background', {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        tap: false
    }).setView([40.7128, -74.0060], 12); // Starting coordinates

    // Use a dark styled basemap (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Slowly pan the map to give a dynamic feel
    const panMap = () => {
        const currentCenter = map.getCenter();
        // Slightly move longitude for continuous panning
        map.panTo([currentCenter.lat, currentCenter.lng + 0.003], {
            animate: true,
            duration: 2.5,
            easeLinearity: 1
        });
    };

    // Start panning after map loads
    setTimeout(() => {
        setInterval(panMap, 2500);
    }, 1000);

    // Create random glowing data pings
    const createPing = () => {
        const bounds = map.getBounds();
        const lat = bounds.getSouth() + Math.random() * (bounds.getNorth() - bounds.getSouth());
        const lng = bounds.getWest() + Math.random() * (bounds.getEast() - bounds.getWest());

        const pingIcon = L.divIcon({
            className: 'pulse-ping',
            iconSize: [15, 15]
        });

        const marker = L.marker([lat, lng], { icon: pingIcon }).addTo(map);

        // Remove marker after animation completes (3 seconds)
        setTimeout(() => {
            map.removeLayer(marker);
        }, 3000);
    };

    // Generate a ping repeatedly
    setInterval(createPing, 800);
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMap();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
