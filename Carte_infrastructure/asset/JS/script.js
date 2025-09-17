
// Initialisation de la carte
var map = L.map('map').setView([46.160329, -1.151139], 13);


// Ajout d'un calque OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    layers: [Banc, parkingHandicap, Defibrilateur, Corbeille],
    attribution: 'BTS Sio Slam2 - TP Carte Handicap'
}).addTo(map);



// Ajout d'une icône personnalisée
  // ParkingIcon
var parkingIcon = L.icon({
    iconUrl: 'asset/icone/1228044-200.png',

    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
   // BancIcon
var bancIcon = L.icon({
    iconUrl: 'asset/icone/bancicone.png',

    iconSize:     [45, 45], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

    // DefibrilateurIcon
var defibrilateurIcon = L.icon({
    iconUrl: 'asset/icone/defibrilateur.png',
    iconSize:     [45, 45], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
    // CorbeilleIcon
var corbeilleIcon = L.icon({
    iconUrl: 'asset/icone/corbeille.png',
    iconSize:     [45, 45], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// Parcours du tableau datas
var parkingHandicap = L.layerGroup([]);
datas.forEach(
    (data) => {
        let adresse = data.fields.adresse;
        let obs = data.fields.obs;
        let longitude = data.fields.geo_point_2d[1];
        let latitude = data.fields.geo_point_2d[0];
        var marker = L.marker([longitude,latitude], {icon: parkingIcon}).addTo(map);
        marker.bindPopup(" adresse de la place :<br>"+adresse+"</br> \n observation : "+obs).openPopup();
        parkingHandicap.addLayer(marker);
    }
);

//  Parcours du tableau bancs
var Banc = L.layerGroup([]);
bancs.forEach(
    (banc) => {
        let banc_id = banc.fields.banc_id;
        let banc_nbre = banc.fields.banc_nbre;
        let longitude = banc.fields.coordinates[1];
        let latitude = banc.fields.coordinates[0];
        var marker = L.marker([longitude,latitude], {icon: bancIcon}).addTo(map);
        marker.bindPopup("Id du banc :<br>"+banc_id+"</br> \n  nombre de place : "+banc_nbre).openPopup();
        Banc.addLayer(marker);
    }
    
);

// Parcours du tableau defibrilateurs
var Defibrilateur = L.layerGroup([]);
defibrilateurs.forEach(
    (defibrilateur) => {
        let defibrilateur_adresse = defibrilateur.fields.adr_voie;
        let accessibilite = defibrilateur.fields.acc;
        let longitude = defibrilateur.fields.long_coor1;
        let latitude = defibrilateur.fields.lat_coor1;
        var marker = L.marker([latitude,longitude], {icon: defibrilateurIcon}).addTo(map);
        marker.bindPopup("Adresse du défibrilateur :<br>"+defibrilateur_adresse+"</br> \n  Accessibilité : "+accessibilite).openPopup();
        Defibrilateur.addLayer(marker);
    }
);

// Parcours du tableau corbeilles
var Corbeille = L.layerGroup([]);
corbeilles.forEach(
    (corbeille) => {
        let corbeille_id = corbeille.fields.corb_id;
        let longitude = corbeille.fields.coordinates[1];
        let latitude = corbeille.fields.coordinates[0];
        var marker = L.marker([longitude,latitude], {icon: corbeilleIcon}).addTo(map);
        marker.bindPopup("Id de la corbeille :<br>"+corbeille_id+"</br>").openPopup();
        Corbeille.addLayer(marker);
    }
);

var overlayMaps = {
    "Banc": Banc,
    "Place handicapé": parkingHandicap,
    "Défibrilateur": Defibrilateur,
    "Corbeille": Corbeille
};

var layerControl = L.control.layers(null,overlayMaps).addTo(map);



