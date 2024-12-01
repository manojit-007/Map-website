mapboxgl.accessToken = `pk.eyJ1IjoidnZvb3Z2IiwiYSI6ImNq0G9ybXBnMTA3bzkyd21rYm53cXFtYjgifQ.YB29KWAgF4E0296w`;



const defaultPosition = [72.877426, 19.076090]
function ShowMap(position) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: position, // [lang, lat]
        zoom: 15,
        maxZoom: 100
    });
    // new mapboxgl.Marker().setLngLat(position).addTo(map);
    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.style.width = '50px';
    markerElement.style.height = '25px';

    // Add the custom marker to the map
    new mapboxgl.Marker(markerElement, { draggable: false })
        .setLngLat(position)
        .addTo(map);
    const nav = new mapboxgl.NavigationControl()
    map.addControl(nav, "bottom-right");

    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: {
            color: 'blue'
        },
        mapboxgl: mapboxgl
    });

    map.addControl(geocoder)

    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken
        }),
        'bottom-left'
    );

}


navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
});
function successLocation(position) {
    const userPosition = [position.coords.longitude, position.coords.latitude];
    ShowMap(userPosition);
}

function errorLocation(error) {
    console.log("Error getting geolocation:", error.message);
    ShowMap(defaultPosition);
}



function update() {
    let trafficLabel = document.querySelector('label[for="mapbox-directions-profile-driving-traffic"]');
    if (trafficLabel) {
        trafficLabel.innerHTML = '🚥';
    }
    let drivingLabel = document.querySelector('label[for="mapbox-directions-profile-driving"]');
    if (trafficLabel) {
        drivingLabel.innerHTML = '🚗';
    }
    let walkingLabel = document.querySelector('label[for="mapbox-directions-profile-walking"]');
    if (trafficLabel) {
        walkingLabel.innerHTML = '🚶🏻';
    }
    let cyclingLabel = document.querySelector('label[for="mapbox-directions-profile-cycling"]');
    if (trafficLabel) {
        cyclingLabel.innerHTML = '🚴';
    }
}

setTimeout(update, 1000)

