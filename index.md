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
    excludedCity = [
        "Québec",
        "Sherbrooke",
        "Laval",
        "Saguenay"
    ]
    arenas.forEach(arena => {
        if(
            arena["coordinates"] !== null &&
            (arena["disabled"] === undefined || arena["disabled"] === false) &&
            (excludedCity.indexOf(arena["city"])==-1 || arena["opendata"]===false)
        )
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
            L.marker([coordinates["y"], coordinates["x"]]).addTo(map);
        }
    })
}

function addQuebecArena(infra){
    infra["features"].forEach(arena => {
        if(arena["properties"]["DESCRIPTION"]==="Arénas")
        {
            let coordinates = arena["geometry"]["coordinates"]
            L.marker([coordinates[1],coordinates[0]]).addTo(map);
        }
    })
}

function addLavalArena(infra){
    infra.forEach(arena => {
        if(arena["type-commun"]==="Aréna")
        {
            L.marker([arena["latitude"],arena["longitude"]]).addTo(map);
        }
    })
}

function addSaguenayArena(infra){
    infra["features"].forEach(arena => {
        if(arena["properties"]["type_instal"]==="Aréna")
        {
            let coordinates = arena["geometry"]["coordinates"]
            L.marker([coordinates[1], coordinates[0]]).addTo(map);
        }
    })
}

fetch('./data/arenas.json').then((response) => response.json())
    .then((json) => addArenas(json));

fetch("https://services3.arcgis.com/qsNXG7LzoUbR4c1C/arcgis/rest/services/InstallationSportLoisir/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json").then((response) => response.json())
    .then((json) => addSherbrookeArena(json));

fetch("https://www.donneesquebec.ca/recherche/dataset/daa10606-5fdd-4c9b-b5ef-235081690b6e/resource/8902c982-bbb6-4e84-814a-550d094c0bae/download/vdq-lieupublic.geojson").then((response) => response.json())
    .then((json) => addQuebecArena(json));

fetch("https://www.donneesquebec.ca/recherche/dataset/fddf1658-248e-49d6-99ed-4899a737f14a/resource/d870514a-0117-4155-8a88-cb2fbf60a330/download/lieux.json").then((response) => response.json())
    .then((json) => addLavalArena(json));

//fetch("https://www.gatineau.ca/upload/donneesouvertes/LIEU_PUBLIC.json", { mode: 'no-cors'}).then((response) => response.json())
//    .then((json) => addSherbrookeArena(json));

fetch("https://www.donneesquebec.ca/recherche/dataset/c78f9d21-d074-43e9-b406-6a0122836c73/resource/d332e2a1-5d12-43c2-802e-d4fdd0ed893c/download/sagarenastade.json").then((response) => response.json())
    .then((json) => addSaguenayArena(json));
 </script>

<h3>Sources</h3>
<ul>
   <li><a href="https://www.aqairs.ca/bibliotheque?doc=1">Arénas du Québec | AQAIRS, 2019</a></li>
   <li><a href="https://donneesouvertes-sherbrooke.opendata.arcgis.com/datasets/b6498f3436974ecbb8fa636a7d9c0b2f_0/about">
Données ouvertes de la Ville de Sherbrooke, Installations sportives et récréatives</a></li>
<li><a href="https://www.donneesquebec.ca/recherche/dataset/vque_14/resource/8902c982-bbb6-4e84-814a-550d094c0bae">Cartographie des lieux et infrastructures administrés par la Ville de Québec et certaines institutions privées. | Données Québec</a></li>
<li><a href="https://www.donneesquebec.ca/recherche/dataset/lieux-et-edifices-municipaux">Lieux et édifices municipaux de la ville de Laval | Données Québec</a></li>
<li><a href="https://www.donneesquebec.ca/recherche/dataset/sag_arena-et-batiment-sportif">Aréna et bâtiment sportif de la ville de Saguenay | Données Québec</a></li>
</ul>
