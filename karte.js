// ===== KARTE (wie bei ImmoScout24) =====
// Eine eingebettete Karte steht MITTEN in der Liste (PC nach der 1. Reihe, Handy nach 4 Objekten) – nicht ganz oben.
// Sie, der Knopf „Karte“ in der Listenleiste und der schwebende Knopf beim Scrollen öffnen die große Karte.
// Auf der Karte stehen die Mieten als Schilder. Ein Tipp aufs Schild zeigt eine Vorschau
// (Foto, Miete, Fläche, Zimmer, Anfragen). Unten mittig geht's mit „Liste“ zurück.
// Kartenbild: OpenFreeMap (kostenlos, ohne Schlüssel) im hellen Stil „Positron“, ruhig gefärbt wie bei ImmoScout:
// keine Grenzlinien, keine Geschäfte/Symbole, Wasser hellblau, Parks hellgrün, Namen auf Deutsch.
// Die Kartenprogramme (Leaflet + MapLibre) werden erst beim ersten Öffnen geladen – die Seite bleibt schnell.
// Lage der Objekte steht in objekte.js (lat/lng, ungefähr).
(() => {
  const viewEl = document.getElementById("mapView");
  if(!viewEl) return;

  const LIBS = [
    ["css", "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"],
    ["css", "https://cdnjs.cloudflare.com/ajax/libs/maplibre-gl/4.7.1/maplibre-gl.min.css"],
    ["js", "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"],
    ["js", "https://cdnjs.cloudflare.com/ajax/libs/maplibre-gl/4.7.1/maplibre-gl.min.js"],
    ["js", "https://unpkg.com/@maplibre/maplibre-gl-leaflet@0.0.22/leaflet-maplibre-gl.js"],
  ];
  const STYLE = "https://tiles.openfreemap.org/styles/positron";
  const ATTR = '<a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> &copy; <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>';
  const WIEN = [48.2082, 16.3738];

  let libsReady = null;
  const loadLibs = () => libsReady ||= LIBS.reduce((chain, [type, url]) => chain.then(() => new Promise((ok, fail) => {
    if(type === "css"){ const l = document.createElement("link"); l.rel = "stylesheet"; l.href = url; document.head.appendChild(l); ok(); return; }
    const s = document.createElement("script"); s.src = url; s.onload = ok; s.onerror = fail; document.head.appendChild(s);
  })), Promise.resolve());

  const mobile = () => matchMedia("(max-width: 720px)").matches;
  const price = p => `${euro(p.price)} €`;
  let list = properties.slice();
  const withPos = () => list.filter(p => p.lat && p.lng);

  let map = null, mapLayer = null, markers = new Map(), active = null, popup = null, meDot = null;
  const sheet = document.getElementById("mapSheet");
  const countEl = document.getElementById("mapCount");

  // Grundkarte beruhigen (ImmoScout-Look)
  function calmStyle(gl){
    const set = (id, prop, val) => { try { gl.setPaintProperty(id, prop, val); } catch(e) {} };
    for(const l of gl.getStyle().layers){
      const id = l.id;
      if(/boundary|admin|poi|aeroway|housenumber|rail|transit|shield|ferry|building/i.test(id)){ gl.setLayoutProperty(id, "visibility", "none"); continue; }
      if(l.type === "background") set(id, "background-color", "#f4f3ef");
      if(/water/i.test(id) && l.type === "fill") set(id, "fill-color", "#cfe2f0");
      if(/waterway/i.test(id) && l.type === "line") set(id, "line-color", "#cfe2f0");
      if(/park|wood|forest|grass|landcover|cemetery|pitch/i.test(id) && l.type === "fill") set(id, "fill-color", "#dcebd6");
      if(l.type === "symbol" && l.layout && l.layout["text-field"]){
        try { gl.setLayoutProperty(id, "text-field", ["coalesce", ["get", "name:de"], ["get", "name"]]); } catch(e) {}
      }
    }
  }

  const pinIcon = p => L.divIcon({ className: "pin-wrap", html: `<span class="pin" data-id="${p.id}">${price(p)}</span>`, iconSize: null, iconAnchor: [0, 0] });

  const cardHTML = p => `
    <div class="map-card" data-id="${p.id}">
      <button type="button" class="mc-close" aria-label="Schließen">${icon("x")}</button>
      <div class="mc-img"><img src="${p.img.replace("w=1200", "w=700")}" alt="${p.title}"></div>
      <div class="mc-body">
        <div class="mc-facts"><strong>${price(p)}</strong> · ${euro(p.size)} m² · ${p.rooms} Zi.</div>
        <div class="mc-title">${p.title}</div>
        <div class="mc-loc">${icon("pin")}${p.loc}</div>
        <a href="kontakt.html" class="mc-ask">${icon("mail")}Anfragen</a>
      </div>
    </div>`;

  const wireCard = (root, p) => {
    root.querySelector(".mc-close").addEventListener("click", e => { e.stopPropagation(); select(null); });
    root.querySelector(".mc-ask").addEventListener("click", e => e.stopPropagation());
    root.querySelector(".map-card").addEventListener("click", () => openModal(p));
  };

  function select(p){
    if(active) markers.get(active.id)?.getElement()?.querySelector(".pin")?.classList.remove("on");
    active = p;
    if(popup){ map.closePopup(popup); popup = null; }
    sheet.classList.remove("open");
    if(!p) return;
    const m = markers.get(p.id);
    m.getElement()?.querySelector(".pin")?.classList.add("on");
    m.setZIndexOffset(1000);
    if(mobile()){
      sheet.innerHTML = cardHTML(p);
      wireCard(sheet, p);
      requestAnimationFrame(() => {
        sheet.classList.add("open");
        // Schild in den freien Bereich zwischen Kopfleiste und Vorschau schieben, damit es sichtbar bleibt
        const box = document.getElementById("mapCanvas").getBoundingClientRect();
        const top = viewEl.querySelector(".mv-bar").getBoundingClientRect().bottom - box.top;
        const bottom = box.height - sheet.offsetHeight - parseFloat(getComputedStyle(sheet).bottom);
        const pt = map.latLngToContainerPoint([p.lat, p.lng]);
        const wantY = top + (bottom - top) / 2;
        const dx = pt.x < 60 || pt.x > box.width - 60 ? pt.x - box.width / 2 : 0;
        if(pt.y < top + 40 || pt.y > bottom - 30 || dx) map.panBy([dx, pt.y - wantY]);
      });
    } else {
      popup = L.popup({ className: "map-pop", closeButton: false, offset: [0, -6], maxWidth: 300, minWidth: 300, autoPanPaddingTopLeft: [40, 90], autoPanPaddingBottomRight: [40, 90] })
        .setLatLng([p.lat, p.lng]).setContent(cardHTML(p)).openOn(map);
      wireCard(popup.getElement(), p);
      popup.on("remove", () => { if(active === p) select(null); });
    }
  }

  function drawMap(){
    if(!map) return;
    mapLayer.clearLayers(); markers.clear();
    withPos().forEach(p => {
      const m = L.marker([p.lat, p.lng], { icon: pinIcon(p), riseOnHover: true, keyboard: true, title: p.title })
        .on("click", () => select(active && active.id === p.id ? null : p));
      m.addTo(mapLayer); markers.set(p.id, m);
    });
    if(active && !markers.has(active.id)) select(null);
  }
  const updateCount = () => {
    const n = withPos().length;
    countEl.textContent = `${n} ${n === 1 ? "Mietobjekt" : "Mietobjekte"}`;
  };
  const fit = () => {
    const pts = withPos();
    if(pts.length) map.fitBounds(L.latLngBounds(pts.map(p => [p.lat, p.lng])), { paddingTopLeft: [50, 90], paddingBottomRight: [50, 110], maxZoom: 14 });
    else map.setView(WIEN, 12);
  };

  async function openMap(push = true){
    viewEl.classList.add("open");
    viewEl.setAttribute("aria-hidden", "false");
    document.body.classList.add("map-open");
    document.body.style.overflow = "hidden";
    updateCount();
    if(push) history.pushState({ scotiaMap: 1 }, "", "#karte");
    if(!map){
      viewEl.classList.add("loading");
      try { await loadLibs(); } catch(e) { viewEl.classList.remove("loading"); return; }
      map = L.map("mapCanvas", { zoomControl: !mobile(), attributionControl: true, zoomSnap: 0.25 }).setView(WIEN, 12);
      if(map.zoomControl) map.zoomControl.setPosition("topright");
      map.attributionControl.setPrefix(false);
      const base = L.maplibreGL({ style: STYLE, attribution: ATTR }).addTo(map);
      const gl = base.getMaplibreMap();
      gl.on("load", () => { calmStyle(gl); viewEl.classList.remove("loading"); });
      mapLayer = L.layerGroup().addTo(map);
      map.on("click", () => select(null));
    }
    await new Promise(r => requestAnimationFrame(() => { map.invalidateSize(); drawMap(); fit(); r(); }));
  }
  function closeMap(fromHistory = false){
    if(!viewEl.classList.contains("open")) return;
    if(map) select(null);
    viewEl.classList.remove("open");
    viewEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("map-open");
    document.body.style.overflow = "";
    if(!fromHistory && location.hash === "#karte") history.back();
  }

  // ---------- eingebettete Karte in der Liste ----------
  const inline = document.createElement("div");
  inline.className = "map-inline";
  inline.innerHTML = `
    <div class="mi-head"><strong>Alle Mietobjekte auf der Karte</strong><span id="miCount"></span></div>
    <div class="mi-map"><div id="miMap"></div>
      <button type="button" class="mi-open" id="miOpen"><span data-icon="map"></span>Vergrößern</button>
    </div>`;
  inline.querySelector("[data-icon]").innerHTML = icon("map");
  let mini = null, miniLayer = null, miniStarted = false;

  function drawMini(){
    const n = withPos().length;
    inline.querySelector("#miCount").textContent = `${n} ${n === 1 ? "Mietobjekt" : "Mietobjekte"}`;
    if(!mini) return;
    mini.invalidateSize();
    miniLayer.clearLayers();
    const pts = withPos();
    pts.forEach(p => L.marker([p.lat, p.lng], { icon: pinIcon(p), title: p.title })
      .on("click", async e => { L.DomEvent.stop(e); await openMap(); select(p); }).addTo(miniLayer));
    if(pts.length) mini.fitBounds(L.latLngBounds(pts.map(p => [p.lat, p.lng])), { padding: [28, 28], maxZoom: 14 });
  }
  async function startMini(){
    if(miniStarted) return; miniStarted = true;
    try { await loadLibs(); } catch(e) { return; }
    mini = L.map("miMap", { zoomControl: false, attributionControl: true, dragging: false, scrollWheelZoom: false,
      doubleClickZoom: false, boxZoom: false, keyboard: false, touchZoom: false, tap: false, zoomSnap: 0.25 }).setView(WIEN, 11);
    mini.attributionControl.setPrefix(false);
    const base = L.maplibreGL({ style: STYLE, attribution: ATTR, interactive: false }).addTo(mini);
    base.getMaplibreMap().on("load", () => calmStyle(base.getMaplibreMap()));
    miniLayer = L.layerGroup().addTo(mini);
    mini.on("click", () => openMap());
    drawMini();
  }
  // Nach der 1. Reihe (PC, 3 Spalten) bzw. nach 2 Reihen (Handy, 2 Spalten) einfügen
  function placeInline(){
    const grid = document.getElementById("grid");
    const cards = grid ? grid.querySelectorAll(".card") : [];
    if(!cards.length){ inline.remove(); return; }
    const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length || 1;
    const after = Math.min(cols >= 3 ? cols : cols * 2, cards.length);
    if(cards[after - 1].nextElementSibling !== inline) cards[after - 1].after(inline);
    drawMini();
  }
  if("IntersectionObserver" in window){
    new IntersectionObserver(([e]) => { if(e.isIntersecting) startMini(); }, { rootMargin: "400px 0px" }).observe(inline);
  } else startMini();
  inline.querySelector("#miOpen").addEventListener("click", e => { e.stopPropagation(); openMap(); });
  let rz; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(placeInline, 200); });

  ["mapOpenBtn", "mapFab"].forEach(id => document.getElementById(id)?.addEventListener("click", () => openMap()));
  document.getElementById("mapToList").addEventListener("click", () => closeMap());
  document.getElementById("mapClose").addEventListener("click", () => closeMap());
  addEventListener("popstate", () => { if(location.hash !== "#karte") closeMap(true); else openMap(false); });
  addEventListener("keydown", e => { if(e.key === "Escape" && viewEl.classList.contains("open") && !document.getElementById("modal")?.classList.contains("open")) closeMap(); });

  // Schwebender „Karte“-Knopf: nur zu sehen, solange die Objektliste im Bild ist
  const fab = document.getElementById("mapFab"), results = document.getElementById("grid");
  if(fab && results && "IntersectionObserver" in window){
    // …aber nicht, solange die eingebettete Karte selbst zu sehen ist
    let inList = false, inlineSeen = false;
    const upd = () => fab.classList.toggle("show", inList && !inlineSeen);
    new IntersectionObserver(([e]) => { inList = e.isIntersecting; upd(); }, { rootMargin: "-30% 0px -30% 0px" }).observe(results);
    new IntersectionObserver(([e]) => { inlineSeen = e.isIntersecting; upd(); }, { threshold: 0.25 }).observe(inline);
  }

  // Mein Standort
  document.getElementById("mapLocate").addEventListener("click", () => {
    if(!navigator.geolocation || !map) return;
    const btn = document.getElementById("mapLocate");
    btn.classList.add("busy");
    navigator.geolocation.getCurrentPosition(pos => {
      btn.classList.remove("busy");
      const ll = [pos.coords.latitude, pos.coords.longitude];
      if(meDot) meDot.setLatLng(ll);
      else meDot = L.marker(ll, { icon: L.divIcon({ className: "me-wrap", html: '<span class="me-dot"></span>', iconSize: [18, 18], iconAnchor: [9, 9] }), interactive: false }).addTo(map);
      map.setView(ll, 14);
    }, () => btn.classList.remove("busy"), { enableHighAccuracy: true, timeout: 10000 });
  });

  // Die Liste meldet jede neue Auswahl (Suche, Filter, Chat) → die Karte zeigt dieselben Objekte
  document.addEventListener("scotia:list", e => {
    list = e.detail; updateCount(); drawMap();
    if(map && viewEl.classList.contains("open")) fit();
    setTimeout(placeInline, 0); // erst nachdem die Liste neu gezeichnet ist
  });
  placeInline();
  if(location.hash === "#karte") history.replaceState(null, "", location.pathname + location.search);
})();
