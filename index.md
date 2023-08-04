<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
   integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
   crossorigin=""/>

<style>
   #map img
   {
       position: absolute;
       -webkit-box-shadow: revert;
       border: revert;
       margin: 0px;
   }
   #map img.olympique { filter: hue-rotate(120deg); }
   
   #main_content
   {
    max-width: 80%;
   }
</style>
   
<!-- Make sure you put this AFTER Leaflet's CSS -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

 <div id="map" style="height:600px;"></div>


 <script>
      var map = L.map('map').setView([49.396675075193976,-70.40258940157918], 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

function addArenas(arenas){
    arenas.forEach(arena => {
        console.log(arena);
        if(arena["coordinates"] !== null && (arena["disabled"] === undefined || arena["disabled"] === false))
        {
            let marker = L.marker([arena["coordinates"]["coordinates"][1],arena["coordinates"]["coordinates"][0]]).addTo(map);
            if(arena["type"]==="olympique")
            {
                marker._icon.classList.add("olympique");
            }
        }
    });
}

function addSherbrookeArena(infra){
    infra["features"].forEach(arena => {
        if(arena["attributes"]["TYPE"]==="Aréna")
        {
            let coordinates = arena["geometry"]
            console.log(coordinates);
            L.marker([coordinates["y"], coordinates["x"]]).addTo(map);
        }
    })
}

fetch('./data/arenas.json').then((response) => response.json())
    .then((json) => addArenas(json));

fetch("https://services3.arcgis.com/qsNXG7LzoUbR4c1C/arcgis/rest/services/InstallationSportLoisir/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json").then((response) => response.json())
    .then((json) => addSherbrookeArena(json));
 </script>

<h3>Sources</h3>
<ul>
   <li><a href="https://www.aqairs.ca/bibliotheque?doc=1">Arénas du Québec | AQAIRS, 2019</a></li>
   <li><a href="https://donneesouvertes-sherbrooke.opendata.arcgis.com/datasets/b6498f3436974ecbb8fa636a7d9c0b2f_0/about">
Données ouvertes de la Ville de Sherbrooke, Installations sportives et récréatives</a></li>
</ul>
