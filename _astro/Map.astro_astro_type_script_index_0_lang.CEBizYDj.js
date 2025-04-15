document.addEventListener("DOMContentLoaded",()=>{const t=41.48170428168492,n=-71.31039491769528,o=L.map("map",{zoomControl:!1}).setView([t,n],15);L.control.zoom({position:"bottomright"}).addTo(o),L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',maxZoom:19}).addTo(o);const e=L.icon({iconUrl:"/src/assets/icon-location.svg",iconSize:[66,88],iconAnchor:[18,36],popupAnchor:[14,-36]});L.marker([t,n],{icon:e}).addTo(o).bindPopup(`
      <div class="gallery-popup">
        <h3>Art Gallery</h3>
        <p>99 King Street</p>
        <p>Newport<br>RI 02840<br>United States</p>
      </div>
    `,{className:"gallery-popup-container"}),document.getElementById("map").classList.add("map-with-custom-controls")});
