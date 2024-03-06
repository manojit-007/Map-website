mapboxgl.accessToken = `pk.eyJ1IjoiZGVsdGEtc3R1ZHVlbnQiLCJhIjoiY2xvMDk0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VU1wvxc7rFVt5E4KLOQ`;

// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/standard',
//     center: [ 72.877426, 19.076090], // [lang, lat]
//     zoom: 5,
//     maxZoom: 9
// });

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
        'top-left'
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