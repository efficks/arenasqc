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
        if(arena["coordinates"] !== null)
        {
            let marker = L.marker([arena["coordinates"]["coordinates"][1],arena["coordinates"]["coordinates"][0]]).addTo(map);
            if(arena["type"]==="olympique")
            {
                marker._icon.classList.add("olympique");
            }
        }
    });
}

fetch('./data/arenas.json').then((response) => response.json())
    .then((json) => addArenas(json));
 </script>
