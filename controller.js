
function getMaxData(dataArray) {
    max = Number.MIN_VALUE
    dataArray.forEach(function(item) {
        if (max < item.count) {
            max = item.count
        }
    })
    return max
}

data = [
    [
        {lat: 49.12, lng: -110.20, count: 75},
        { lat: 49.50, lng: -112.10, count: 10}
    ],
    [
        { lat: 49.12, lng: -110.20, count: 20},
        { lat: 49.50, lng: -112.10, count: 100}
    ]
]
// -- leaflet only
// var map = L.map('heatmap').setView([51.505, -0.09], 13);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 19,
//         attribution: '© OpenStreetMap'
//     }).addTo(map);
// --


// -- leaflet plugin with heatmap.js
// don't forget to include leaflet-heatmap.js
var testData1 = {
    data:     [
        { lat: 49.1301, lng: -110.607, count: 74.88},
        { lat: 49.1299, lng: -110.207, count: 74.82},
        { lat: 49.3921, lng: -111.015, count: 50.66}
    ],
    max: 74.88
};
var testData2 = {
    data:     [
        { lat: 49.1301, lng: -110.607, count: 40.56},
        { lat: 49.1299, lng: -110.207, count: 99.10},
        { lat: 49.3921, lng: -111.015, count: 36.10}
    ],
    max: 99.10
};
var baseLayer = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '...',
    maxZoom: 18
}
);

var cfg = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    // if scaleRadius is false it will be the constant radius used in pixels
    "radius": 1,
    "maxOpacity": 1,
    // scales the radius based on map zoom
    "scaleRadius": true,
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtrema": false,
    // which field name in your data represents the latitude - default "lat"
    latField: 'lat',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'lng',
    // which field name in your data represents the data value - default "value"
    valueField: 'count'
};


var heatmapLayer = new HeatmapOverlay(cfg);

var map = new L.Map('map-canvas', {
    center: new L.LatLng(50, -110),
    zoom: 5,
    layers: [baseLayer, heatmapLayer]
});

heatmapLayer.setData(testData1);


i = 0
var slider = document.getElementById("myRange")
slider.onchange = function() {
    if (i == 0) {
        heatmapLayer.setData(testData2)
        i = 1
    } else {
        heatmapLayer.setData(testData1)
        i = 0
    }
}
