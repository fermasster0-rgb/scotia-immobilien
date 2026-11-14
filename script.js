// Die Mietobjekte stehen in objekte.js

const team = [
  { name:"Markus Bauer", role:"Geschäftsführer & Inhaber", bio:"Gründete Scotia 2010 und kennt den Wiener Markt wie seine Westentasche.",
    phone:"+43 1 234 56 78", mail:"m.bauer@scotia-immobilien.at",
    img:"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" },
  { name:"Sophie Wagner", role:"Vermietungsberaterin", bio:"Ihre Expertin für Altbauwohnungen in den Innenbezirken.",
    phone:"+43 1 234 56 79", mail:"s.wagner@scotia-immobilien.at",
    img:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
  { name:"Thomas Huber", role:"Immobilienmakler", bio:"Spezialist für Häuser und Villen in Döbling, Hietzing und Währing.",
    phone:"+43 1 234 56 80", mail:"t.huber@scotia-immobilien.at",
    img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
  { name:"Elena Fischer", role:"Vermietung & Beratung", bio:"Begleitet Sie persönlich von der Besichtigung bis zum Mietvertrag.",
    phone:"+43 1 234 56 81", mail:"e.fischer@scotia-immobilien.at",
    img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80" }
];

// ===== ICONS (feine Linien statt Emojis) =====
const ICONS = {
  list:'<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.2"/><circle cx="4.5" cy="12" r="1.2"/><circle cx="4.5" cy="18" r="1.2"/>',
  locate:'<path d="M20.5 3.5 3.5 10.6l7.1 2.8 2.8 7.1z"/>',
  map:'<path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6z"/><path d="M9 4v14M15 6v14"/>',
  pin:'<path d="M12 21s-7-6.2-7-11.6A7 7 0 0 1 19 9.4C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/>',
  bed:'<path d="M2.5 5v14M2.5 9h17a2 2 0 0 1 2 2v8M2.5 16h19M6.5 9v7"/>',
  area:'<path d="M4 9V4h5M20 15v5h-5M4 4l6 6M20 20l-6-6"/>',
  bath:'<path d="M9 6 6.6 3.6A1.6 1.6 0 0 0 4 4.7V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M10 5 8 7M2 12h20M7 19v2M17 19v2"/>',
  home:'<path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1H15v-6H9v6H4.5a1 1 0 0 1-1-1z"/>',
  phone:'<path d="M21 16.5v3a2 2 0 0 1-2.2 2 19.5 19.5 0 0 1-8.5-3 19.2 19.2 0 0 1-6-6 19.5 19.5 0 0 1-3-8.6A2 2 0 0 1 3.3 1.8h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.3 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail:'<rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m22 7-10 6.5L2 7"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  message:'<path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L3.5 21l1.4-4.8A8.5 8.5 0 1 1 21 12z"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  arrow:'<path d="M4 12h16M14 6l6 6-6 6"/>',
  arrowUR:'<path d="M7 17 17 7M8 7h9v9"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  sparkles:'<path d="M10 14.6a2 2 0 0 0-1.4-1.4L3.4 11.8a.5.5 0 0 1 0-1L8.6 9.4A2 2 0 0 0 10 8l1.4-5.2a.5.5 0 0 1 1 0L13.8 8a2 2 0 0 0 1.4 1.4l5.2 1.4a.5.5 0 0 1 0 1l-5.2 1.4a2 2 0 0 0-1.4 1.4l-1.4 5.2a.5.5 0 0 1-1 0z"/><path d="M19.5 3v3.5M21.2 4.75h-3.5M5 17.5v2.5M6.25 18.75h-2.5"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  back:'<path d="M20 12H4M10 6l-6 6 6 6"/>',
  share:'<circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="m8.3 13.3 7.4 4.4M15.7 6.3l-7.4 4.4"/>',
  sliders:'<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2.2"/><circle cx="10" cy="17" r="2.2"/>'
};
function icon(name){
  return `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== HILFSFUNKTIONEN =====
function euro(n){ return n.toLocaleString("de-DE", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }); } // 1.751,93 bzw. 1.290.000
function priceHTML(p){ return `€ ${euro(p.price)} <small>/ Monat</small>`; }
// Dezente Infozeile über dem Titel statt Schildern auf dem Foto
function metaLine(p){ return ["Miete", p.cat, ...(p.tags || [])].join(" · "); }

function cardHTML(p, i){
  return `
    <article class="card" data-id="${p.id}" tabindex="0" style="--d:${(i % 3) * 0.12}s" aria-label="${p.title}">
      <div class="card-img">
        <span class="card-go">${icon("arrowUR")}</span>
        <img src="${p.img}" alt="${p.title}" loading="lazy">
      </div>
      <div class="card-body">
        <div class="price card-price">${priceHTML(p)}</div>
        <div class="card-meta">${metaLine(p)}</div>
        <div class="location">${icon("pin")}${p.loc}</div>
        <h3>${p.title}</h3>
        <div class="card-foot">
          <div class="specs">
            <span>${icon("bed")}${p.rooms} Zi.</span>
            <span>${icon("area")}${euro(p.size)} m²</span>
          </div>
        </div>
      </div>
    </article>`;
}

function renderCards(container, list){
  if(!container) return;
  // Karte (karte.js) zeigt immer dieselben Objekte wie die Liste
  if(container.id === "grid") document.dispatchEvent(new CustomEvent("scotia:list", { detail: list }));
  if(list.length === 0){
    container.innerHTML = `<div class="empty"><strong>Keine passende Immobilie gefunden</strong>Versuchen Sie einen anderen Begriff oder setzen Sie die Filter zurück.</div>`;
    return;
  }
  container.innerHTML = list.map(cardHTML).join("");
  container.querySelectorAll(".card").forEach(card => {
    const open = () => openModal(properties.find(p => p.id == card.dataset.id));
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); open(); } });
    reveal(card);
  });
}

// Bewusst ruhig: keine Einblend-Effekte beim Scrollen (Ferdinand, 2026-11-07)
function reveal(){}

// ===== KNÖPFE: Pfeil, der hineingleitet =====
function enhanceButtons(){
  document.querySelectorAll(".btn:not(.no-arrow)").forEach(btn => {
    if(btn.querySelector(".btn-icon")) return;
    const label = document.createElement("span");
    label.className = "btn-label";
    while(btn.firstChild) label.appendChild(btn.firstChild);
    btn.appendChild(label);
    btn.insertAdjacentHTML("beforeend", `<span class="btn-icon">${icon("arrow")}${icon("arrow")}</span>`);
  });
}

// ===== SUCHFELD MIT WECHSELNDEM BEISPIELTEXT =====
function initRotator(){
  const field = document.querySelector("[data-rotate]");
  if(!field) return;
  const input = field.querySelector("input");
  const ph = field.querySelector(".ph");
  const items = JSON.parse(field.dataset.rotate);
  let idx = 0;
  let current = document.createElement("span");
  current.textContent = items[0];
  ph.appendChild(current);

  const sync = () => field.classList.toggle("filled", input.value.length > 0);
  input.addEventListener("input", sync);
  field.addEventListener("click", () => input.focus());
  sync();
  if(reduceMotion) return;

  setInterval(() => {
    if(document.hidden || input.value) return;
    idx = (idx + 1) % items.length;
    const next = document.createElement("span");
    next.className = "enter";
    next.textContent = items[idx];
    ph.appendChild(next);
    current.classList.add("out");
    next.getBoundingClientRect(); // Startzustand festhalten, damit die Bewegung sichtbar ist
    next.classList.remove("enter");
    const old = current;
    setTimeout(() => old.remove(), 800);
    current = next;
  }, 3200);
}

// ===== SUCHE (versteht z. B. "3 Zimmer in Neubau" oder "Haus mit Garten") =====
const STOPWORDS = new Set(["mit","in","im","der","die","das","den","dem","und","ein","eine","einer","einem","wien","nahe","am","an","auf","für","von","zum","zur"]);
function matchesQuery(p, query){
  if(!query) return true;
  let q = query.toLowerCase();
  // "18. Bezirk", "18ter Bezirk", "Bezirk 18" -> Postleitzahl 1180 (steht bei jedem Objekt)
  const plz = n => (n >= 1 && n <= 23) ? ` 1${String(n).padStart(2, "0")}0 ` : null;
  q = q.replace(/(\d{1,2})\s*(?:\.|ter|ten|te)?\s*(?:wiener\s+)?bezirk/g, (m, n) => plz(Number(n)) || m)
       .replace(/bezirk\s+(\d{1,2})\b/g, (m, n) => plz(Number(n)) || m);
  const rooms = q.match(/(\d+)\s*-?\s*(zimmer|zi\.?)(?=\s|$|-)/);
  if(rooms){
    if(p.rooms < Number(rooms[1])) return false;
    q = q.replace(rooms[0], " ");
  }
  const hay = [p.title, p.loc, p.desc, p.cat, (p.tags || []).join(" ")].join(" ").toLowerCase();
  // Begriff muss am Wortanfang stehen: "garten" passt zu "Garten", nicht zu "Augarten"
  const atWordStart = t => new RegExp("(^|[^a-zäöüß0-9])" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).test(hay);
  return q.split(/[\s,]+/).map(t => t.replace(/^-+|-+$/g, "")).filter(t => t && !STOPWORDS.has(t)).every(atWordStart);
}

const state = { cat: "alle", rooms: 0, max: 0, q: "", sort: "neu", ids: null }; // ids: Auswahl aus dem Chat
const SORTS = {
  "neu":       (a, b) => b.id - a.id,
  "preis-auf": (a, b) => a.price - b.price,
  "preis-ab":  (a, b) => b.price - a.price,
  "groesse":   (a, b) => b.size - a.size
};
function getFiltered(){
  if(state.ids) return properties.filter(p => state.ids.includes(p.id)).sort(SORTS[state.sort] || SORTS.neu);
  return properties.filter(p =>
    (state.cat === "alle" || p.cat === state.cat) &&
    (!state.rooms || p.rooms >= state.rooms) &&
    (!state.max || p.price <= state.max) &&
    matchesQuery(p, state.q)
  ).sort(SORTS[state.sort] || SORTS.neu);
}

// Eine Seite wie bei ImmoScout24: Suche oben, Ergebnisse direkt darunter
function initSearch(){
  const form = document.getElementById("searchForm");
  const grid = document.getElementById("grid");
  if(!form || !grid) return;
  const f = {
    q: document.getElementById("f-loc"), cat: document.getElementById("f-cat"),
    rooms: document.getElementById("f-rooms"), max: document.getElementById("f-max"),
    sort: document.getElementById("f-sort")
  };
  const countEl = document.getElementById("resultCount");
  const resetBtn = document.getElementById("resetFilters");
  const chips = [...document.querySelectorAll("[data-chip]")];

  // Wert in ein Ausklappfeld setzen – fehlt die Option (z. B. "bis € 2.500"), wird sie ergänzt
  const setSelect = (sel, value, label) => {
    value = String(value);
    if(![...sel.options].some(o => o.value === value)){
      const opt = new Option(label, value);
      const after = [...sel.options].find(o => Number(o.value) > Number(value));
      sel.add(opt, after || null);
    }
    sel.value = value;
    if(sel._sync) sel._sync();
  };
  const setFilters = ({ q = "", cat = "alle", rooms = 0, max = 0 }) => {
    f.q.value = q;
    f.q.dispatchEvent(new Event("input"));
    setSelect(f.cat, ["Wohnung", "Haus"].includes(cat) ? cat : "alle", cat);
    setSelect(f.rooms, Number(rooms) || 0, `${rooms}+ Zimmer`);
    setSelect(f.max, Number(max) || 0, `€ ${euro(Number(max))} / Monat`);
  };

  // Suche aus dem Link übernehmen (z. B. vom Chat-Assistenten auf einer anderen Seite)
  const params = new URLSearchParams(location.search);
  setFilters({ q: params.get("q") || "", cat: params.get("cat") || "alle", rooms: params.get("rooms") || 0, max: params.get("max") || 0 });

  const readForm = () => {
    state.q = f.q.value.trim(); state.cat = f.cat.value;
    state.rooms = Number(f.rooms.value) || 0; state.max = Number(f.max.value) || 0;
    state.sort = f.sort ? f.sort.value : "neu";
    state.ids = null; // jede eigene Änderung ersetzt die Chat-Auswahl
  };
  const filtered = () => state.ids || state.q || state.cat !== "alle" || state.rooms || state.max;
  const update = () => {
    const list = getFiltered();
    renderCards(grid, list);
    const suffix = state.ids ? " vom Assistenten vorgeschlagen" : (filtered() ? " gefunden" : " verfügbar");
    if(countEl) countEl.textContent = `${list.length} ${list.length === 1 ? "Mietobjekt" : "Mietobjekte"}${suffix}`;
    renderActive();
    if(resetBtn) resetBtn.hidden = !filtered();
    chips.forEach(c => c.classList.toggle("on", state.q.toLowerCase() === c.dataset.chip.toLowerCase()));
  };

  // Handy: aktive Filter als Kärtchen mit × (wie in der ImmoScout-App) + Zahl am Filter-Knopf
  const activeEl = document.getElementById("activeChips");
  const badge = document.getElementById("filterBadge");
  const optLabel = sel => sel.options[sel.selectedIndex]?.text || "";
  const renderActive = () => {
    const items = [];
    if(state.ids) items.push(["ids", "Vorschläge des Assistenten"]);
    if(state.q) items.push(["q", `„${state.q}“`]);
    if(state.cat !== "alle") items.push(["cat", optLabel(f.cat)]);
    if(state.rooms) items.push(["rooms", optLabel(f.rooms)]);
    if(state.max) items.push(["max", `bis ${optLabel(f.max)}`]);
    const selectCount = ["cat", "rooms", "max"].filter(k => items.some(i => i[0] === k)).length;
    if(badge){ badge.hidden = !selectCount; badge.textContent = selectCount; }
    if(!activeEl) return;
    activeEl.innerHTML = items.map(([k, label]) =>
      `<button type="button" data-clear="${k}" aria-label="${label} entfernen">${label}${icon("x")}</button>`).join("");
  };
  if(activeEl) activeEl.addEventListener("click", e => {
    const b = e.target.closest("[data-clear]");
    if(!b) return;
    const k = b.dataset.clear;
    const cur = { q: f.q.value.trim(), cat: f.cat.value, rooms: f.rooms.value, max: f.max.value };
    if(k === "q") cur.q = "";
    if(k === "cat") cur.cat = "alle";
    if(k === "rooms") cur.rooms = 0;
    if(k === "max") cur.max = 0;
    setFilters(cur);
    readForm(); update();
  });
  const toggle = document.getElementById("filterToggle");
  if(toggle) toggle.addEventListener("click", () => {
    const open = form.classList.toggle("filters-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  const toResults = () => !document.documentElement.classList.contains("chat-lock") && document.getElementById("objekte").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

  form.addEventListener("submit", e => { e.preventDefault(); readForm(); update(); toResults(); });
  [f.cat, f.rooms, f.max, f.sort].forEach(sel => sel && sel.addEventListener("change", () => { readForm(); update(); }));
  chips.forEach(chip => chip.addEventListener("click", () => {
    const on = f.q.value.trim().toLowerCase() === chip.dataset.chip.toLowerCase();
    f.q.value = on ? "" : chip.dataset.chip;
    f.q.dispatchEvent(new Event("input"));
    readForm(); update();
  }));
  if(resetBtn) resetBtn.addEventListener("click", () => {
    setFilters({});
    readForm(); update();
  });

  // Der Chat-Assistent stellt hiermit die Suche auf der Seite ein
  window.applySearch = (filter, ids = []) => {
    setFilters({ q: filter.suchbegriff, cat: filter.objektart, rooms: filter.zimmer_ab, max: filter.miete_bis });
    readForm();
    // Ergibt der Filter nicht genau die genannten Objekte, zeigen wir die Auswahl des Assistenten direkt
    const shown = getFiltered().map(p => p.id);
    if(ids.length && !ids.every(id => shown.includes(id))){
      setFilters({});
      readForm();
      state.ids = ids.slice();
    }
    update();
    toResults();
    return getFiltered().length;
  };

  readForm(); update();
}

// ===== MODAL =====
function openModal(p){
  const modal = document.getElementById("modal");
  if(!p || !modal) return;
  document.getElementById("m-img").src = p.img;
  document.getElementById("m-img").alt = p.title;
  document.getElementById("m-tag").className = "card-meta";
  document.getElementById("m-tag").textContent = metaLine(p);
  // Knopf zum Inserat auf ImmoScout24 – nur, wenn ein Link eingetragen ist
  const portal = document.getElementById("m-portal");
  if(portal){ portal.hidden = !p.immoscout; if(p.immoscout) portal.href = p.immoscout; }
  document.getElementById("m-loc").innerHTML = icon("pin") + p.loc;
  document.getElementById("m-title").textContent = p.title;
  document.getElementById("m-price").innerHTML = priceHTML(p);
  const specs = [
    `<div>${icon("bed")}<strong>${p.rooms}</strong><small>Zimmer</small></div>`,
    `<div>${icon("area")}<strong>${euro(p.size)} m²</strong><small>Fläche</small></div>`,
    `<div>${icon("bath")}<strong>${p.bath}</strong><small>${p.bath === 1 ? "Bad" : "Bäder"}</small></div>`,
    `<div>${icon("home")}<strong>${p.cat}</strong><small>Objektart</small></div>`
  ];
  const specsEl = document.getElementById("m-specs");
  specsEl.innerHTML = specs.join("");
  specsEl.style.gridTemplateColumns = `repeat(${specs.length}, 1fr)`;
  // Beschreibung in gut lesbare Absätze teilen (je ca. 3 Sätze)
  const esc = s => s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const text = (p.details || p.desc || "").trim();
  const sentences = text.split(/(?<=[^\d\s(][.!?])\s+(?=[A-ZÄÖÜ„"])/).filter(s => s.trim());
  const paras = [];
  for(let i = 0; i < sentences.length; i += 3) paras.push(sentences.slice(i, i + 3).join(" ").trim());
  document.getElementById("m-desc").innerHTML = paras.filter(Boolean).map(t => `<p>${esc(t)}</p>`).join("");
  // Eckdaten: alles Wichtige auf einen Blick
  const factsEl = document.getElementById("m-facts");
  if(factsEl){
    const rows = [
      ["Miete / Monat", `€ ${euro(p.price)}`],
      ["Objektart", p.cat],
      ["Zimmer", p.rooms],
      ["Fläche", `${euro(p.size)} m²`],
      ["Bäder", p.bath],
      ...Object.entries(p.facts || {}),
      ["Lage", p.loc],
    ];
    factsEl.innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(String(v))}</dd></div>`).join("");
  }
  // Teilen (am Handy öffnet sich das System-Teilen-Menü, sonst wird der Link kopiert)
  const share = document.getElementById("m-share");
  if(share) share.onclick = async () => {
    const data = { title: p.title, text: `${p.title} – ${p.loc}`, url: p.immoscout || location.href };
    try {
      if(navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(data.url); share.classList.add("done"); setTimeout(() => share.classList.remove("done"), 1400); }
    } catch(e) { /* abgebrochen */ }
  };
  modal.querySelector(".modal").scrollTop = 0;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.body.classList.add("modal-open");
}
function closeModal(){
  const modal = document.getElementById("modal");
  if(!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  document.body.classList.remove("modal-open");
}

// ===== TEAM =====
function renderTeam(container){
  if(!container) return;
  container.innerHTML = team.map((m, i) => `
    <article class="member fade" style="--d:${i * 0.1}s">
      <div class="member-img"><img src="${m.img}" alt="${m.name}" loading="lazy"></div>
      <h3>${m.name}</h3>
      <div class="role">${m.role}</div>
      ${m.bio ? `<p class="bio">${m.bio}</p>` : ""}
      <div class="member-contact">
        <a href="tel:${m.phone.replace(/\s/g, "")}">${icon("phone")}${m.phone}</a>
        <a href="mailto:${m.mail}">${icon("mail")}${m.mail}</a>
      </div>
    </article>`).join("");
}

// ===== KONTAKTFORMULAR =====
function submitForm(e){
  e.preventDefault();
  const msg = document.getElementById("formMsg");
  if(msg) msg.classList.add("show");
  e.target.reset();
  e.target.querySelectorAll("select").forEach(s => s._sync && s._sync());
  setTimeout(() => { if(msg) msg.classList.remove("show"); }, 5000);
}

// ===== KOPFZEILE, MENÜ =====
function initChrome(){
  const header = document.getElementById("siteHeader");
  const onScroll = () => { if(header) header.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");
  if(toggle && links){
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("show");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
    });
  }

  const modal = document.getElementById("modal");
  if(modal){
    modal.addEventListener("click", e => { if(e.target.id === "modal") closeModal(); });
    document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });
  }
}

// ===== CHAT-ASSISTENT =====
// Antwortet vorerst mit festen Regeln und durchsucht die Objekte auf der Seite.
// Später kann hier eine echte KI (z. B. Claude) angeschlossen werden.
const CHAT_STOP = new Set(["ich","suche","such","suchen","sucht","eine","einen","bitte","gibt","es","habt","ihr","haben","sie","hätte","gerne","gern","möchte","will","würde","etwas","was","welche","welches","zum","so","noch","auch","hallo","hi","servus","€","euro","eur",
  "mir","mich","mein","meine","meinen","uns","unsere","soll","sollst","kannst","könnt","können","du","dort","da","hier","gibts","wo","neue","neuen","neues","finden","zeig","zeige","zeigen","hast","welcher"]);
const CHAT_CHIPS = ["Wohnung suchen", "Besichtigung vereinbaren", "Öffnungszeiten", "Meine Wohnung vermieten"];

function chatAnswer(text){
  const t = text.toLowerCase().trim();
  const has = (...words) => words.some(w => t.includes(w));
  const contact = `<a href="kontakt.html">Kontaktformular</a>`;

  if(has("danke")) return { html: "Sehr gerne! Wenn Sie noch Fragen haben, bin ich hier." };
  if(/^(hallo|hi|servus|grüß|guten tag|hey)/.test(t)) return { html: "Grüß Gott! Wonach suchen Sie? Schreiben Sie z. B. <em>„3 Zimmer in Neubau“</em> oder <em>„Haus mit Garten“</em>." };
  if(t === "wohnung suchen") return { html: "Gerne! Beschreiben Sie kurz, was Sie suchen – Bezirk, Zimmer, maximale Miete. Zum Beispiel: <em>„3 Zimmer unter 2.000 €“</em> oder <em>„Loft in der Leopoldstadt“</em>." };
  if(/\b(kaufen|kauf|eigentum|eigentumswohnung)\b/.test(t)) return { html: `Wir vermitteln ausschließlich <strong>Mietobjekte</strong> – Wohnungen und Häuser zum Kaufen haben wir leider nicht. Suchen Sie vielleicht etwas zur Miete? Schreiben Sie mir einfach Bezirk, Zimmer und Budget.` };
  if(has("öffnungszeit", "geöffnet", "offen", "wann seid", "wann sind")) return { html: "Unser Büro in der Kärntner Straße 10, 1010 Wien ist <strong>Mo–Fr von 9:00 bis 18:00 Uhr</strong> geöffnet – Termine gerne auch nach Vereinbarung." };
  if(has("telefon", "anrufen", "nummer", "erreich")) return { html: `Sie erreichen uns unter <strong>+43 1 234 56 78</strong> oder per E-Mail an office@scotia-immobilien.at. Schriftlich geht es am schnellsten über das ${contact}.` };
  if(has("besichtig", "termin", "anschauen", "ansehen")) return { html: `Gerne! Schicken Sie uns über das ${contact} Ihren Wunschtermin und das Objekt. Wir melden uns innerhalb von 24 Stunden persönlich.` };
  if(has("vermieten", "eigentümer", "vermieter")) return { html: `Sie möchten Ihre Wohnung oder Ihr Haus vermieten? Wir übernehmen Inserat, Besichtigungen und Mieterauswahl. Schreiben Sie uns kurz über das ${contact} – Adresse und Größe reichen für den Anfang.` };
  if(has("verkauf")) return { html: `Wir sind auf <strong>Vermietung</strong> spezialisiert und begleiten keine Verkäufe. Wenn Sie Ihre Immobilie vermieten möchten, helfen wir gerne – schreiben Sie uns über das ${contact}.` };
  if(has("provision", "kosten", "gebühr")) return { html: `Die Konditionen hängen vom Objekt ab – bei Mietwohnungen zahlt in Österreich seit 2023 meist der Vermieter die Provision (Bestellerprinzip). Details klären wir gerne persönlich über das ${contact}.` };

  // Objektsuche
  let q = t.replace(/wohnungen/g, "wohnung").replace(/häuser/g, "haus");
  q = q.replace(/\bmietwohnung\b/g, "wohnung").replace(/\b(miete|mieten|zur|monatlich|im monat|pro monat)\b/g, " ");
  let maxPrice = null;
  const pm = q.match(/(unter|bis|max\.?|maximal)\s*([\d.]+)\s*(€|euro)?/);
  if(pm){ maxPrice = Number(pm[2].replace(/\./g, "")); q = q.replace(pm[0], " "); }
  q = q.split(/[\s,!?]+/).filter(w => w && !CHAT_STOP.has(w) && /[a-zäöüß0-9]/.test(w)).join(" ");

  const hits = properties.filter(p =>
    (maxPrice === null || p.price <= maxPrice) &&
    matchesQuery(p, q)
  );
  if(hits.length === 0){
    return { html: `Dazu habe ich gerade nichts Passendes im Angebot. Schreiben Sie uns gerne über das ${contact} – wir melden uns, sobald etwas Passendes reinkommt.` };
  }
  const intro = hits.length === 1 ? "Ich habe ein passendes Objekt gefunden:" : `Ich habe ${hits.length} passende Objekte gefunden${hits.length > 3 ? ", hier die ersten drei" : ""}:`;
  return { html: intro, results: hits.slice(0, 3), more: hits.length > 3 ? q : null, query: q, maxPrice };
}

function initChat(){
  const markup = `
    <button class="chat-launch" id="chatLaunch" aria-label="Assistent öffnen" title="Assistent fragen">
      <span class="cl-core">${icon("sparkles")}</span>
    </button>
    <section class="chat-panel" id="chatPanel" aria-label="Chat mit dem Scotia Assistenten" aria-hidden="true">
      <div class="chat-inner">
        <div class="chat-head">
          <span class="chat-avatar">${icon("sparkles")}</span>
          <div><strong>Scotia Assistent</strong><small id="chatStatus">Antwortet sofort</small></div>
          <button class="chat-close" id="chatClose" aria-label="Chat schließen">${icon("x")}</button>
        </div>
        <div class="chat-body" id="chatBody" aria-live="polite"></div>
        <form class="chat-form" id="chatForm" autocomplete="off">
          <input id="chatInput" type="text" placeholder="Fragen Sie mich etwas …" aria-label="Nachricht">
          <button type="submit" aria-label="Senden">${icon("arrow")}</button>
        </form>
      </div>
      <div class="chat-morph"></div>
    </section>`;
  document.body.insertAdjacentHTML("beforeend", markup);

  const launch = document.getElementById("chatLaunch"), panel = document.getElementById("chatPanel");
  const body = document.getElementById("chatBody"), form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const hasModal = !!document.getElementById("modal");

  const scroll = () => { body.scrollTop = body.scrollHeight; };
  const addMsg = (html, who) => {
    const m = document.createElement("div");
    m.className = "msg " + who;
    if(who === "user") m.textContent = html; else m.innerHTML = html;
    body.appendChild(m); scroll();
  };
  const addResults = (list, more) => {
    const box = document.createElement("div");
    box.className = "chat-results";
    list.forEach(p => {
      const b = document.createElement(hasModal ? "button" : "a");
      b.className = "chat-obj";
      if(!hasModal) b.href = "index.html?q=" + encodeURIComponent(p.title) + "#objekte";
      b.innerHTML = `<img src="${p.img}" alt=""><div><strong>${p.title}</strong><span>${p.loc} · ${priceHTML(p).replace(/<\/?small>/g, " ").replace(/\s+/g, " ")}</span></div>`;
      if(hasModal) b.addEventListener("click", () => openModal(p));
      box.appendChild(b);
    });
    body.appendChild(box);
    if(more !== null && more !== undefined) addMsg(`<a href="index.html?q=${encodeURIComponent(more)}#objekte">Alle Treffer ansehen</a>`, "bot");
    scroll();
  };

  // ---- KI-Anbindung: Fragen gehen an den Chat-Server (Claude Haiku 5.5).
  // Ist er nicht erreichbar (z. B. Seite direkt als Datei geöffnet), antwortet das Regelwerk.
  const history = [];
  // Seite direkt als Datei geöffnet? Dann den lokalen Chat-Server direkt ansprechen.
  // Lokal antwortet chat-server.mjs, online (GitHub Pages) der KI-Server auf Vercel
  const API = location.protocol === "file:" ? "http://127.0.0.1:5250"
    : location.hostname.endsWith("github.io") ? "https://scotia-ki-api.vercel.app" : "";
  let aiAvailable = false;
  const statusEl = document.getElementById("chatStatus");
  const checkAi = () => fetch(API + "/api/health").then(r => r.ok ? r.json() : null).then(d => {
    aiAvailable = !!(d && d.ki);
    statusEl.textContent = aiAvailable ? "KI-Assistent · antwortet sofort" : "Antwortet sofort";
  }).catch(() => { aiAvailable = false; });
  checkAi();
  const escapeHtml = s => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const formatAi = s => escapeHtml(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");

  async function askAi(){
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 25000);
    try {
      const r = await fetch(API + "/api/chat", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }), signal: ctrl.signal
      });
      if(!r.ok) return null;
      return await r.json();
    } catch { return null; } finally { clearTimeout(timer); }
  }

  let busy = false;
  const reply = async text => {
    if(busy) return;
    busy = true;
    addMsg(text, "user");
    history.push({ role: "user", content: text });
    const typing = document.createElement("div");
    typing.className = "msg bot typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(typing); scroll();

    if(!aiAvailable) await checkAi(); // vielleicht wurde der Server inzwischen gestartet
    const ai = aiAvailable ? await askAi() : null;
    if(!ai) await new Promise(r => setTimeout(r, 500));
    typing.remove();

    if(ai && typeof ai.antwort === "string"){
      addMsg(formatAi(ai.antwort), "bot");
      history.push({ role: "assistant", content: ai.antwort });
      const objs = (ai.objekt_ids || []).map(id => properties.find(p => p.id === id)).filter(Boolean);
      if(objs.length) addResults(objs, null);
      if(ai.filter && ai.filter.aktiv && objs.length) showOnPage(ai.filter, objs.map(p => p.id));
      if(ai.kontakt_vorschlagen) addMsg(`<a href="kontakt.html">Zum Kontaktformular →</a>`, "bot");
    } else {
      const a = chatAnswer(text);
      addMsg(a.html, "bot");
      history.push({ role: "assistant", content: a.html.replace(/<[^>]+>/g, "") });
      if(a.results){
        addResults(a.results, null);
        showOnPage({ suchbegriff: a.query || "", objektart: "alle", zimmer_ab: 0, miete_bis: a.maxPrice || 0 }, a.results.map(p => p.id));
      }
    }
    busy = false;
  };

  // Treffer in der normalen Liste der Seite anzeigen (Filter werden automatisch gesetzt)
  function showOnPage(filter, ids){
    if(typeof window.applySearch === "function"){
      const n = window.applySearch(filter, ids);
      if(locked) returnTo = document.getElementById("objekte");
      if(window.innerWidth <= 720){
        // Auf dem Handy verdeckt der Chat die Seite – Knopf zum Hinschauen
        const b = document.createElement("button");
        b.type = "button"; b.className = "chat-show-btn";
        b.textContent = `${n} ${n === 1 ? "Treffer" : "Treffer"} auf der Seite ansehen`;
        b.addEventListener("click", () => close());
        body.appendChild(b); scroll();
      }
    } else {
      const p = new URLSearchParams({ q: filter.suchbegriff || "", cat: filter.objektart || "alle", rooms: filter.zimmer_ab || 0, max: filter.miete_bis || 0 });
      addMsg(`<a href="index.html?${p}#objekte">Alle Treffer in der Liste ansehen →</a>`, "bot");
    }
  }

  const addChips = () => {
    const row = document.createElement("div");
    row.className = "chat-chips";
    CHAT_CHIPS.forEach(c => {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = c;
      b.addEventListener("click", () => reply(c));
      row.appendChild(b);
    });
    body.appendChild(row);
  };

  let greeted = false;
  // Handy: Chat wie in Chat-Apps (Intercom & Co.)
  // 1) Seite beim Öffnen komplett einfrieren (position: fixed) – sonst schiebt Safari sie beim Antippen endlos weiter
  // 2) Fenster genau an den sichtbaren Bereich über der Tastatur anpassen
  // 3) Wischen nur im Nachrichtenbereich erlauben
  const vv = window.visualViewport;
  const phone = () => matchMedia("(max-width: 560px)").matches;
  const root = document.documentElement;
  let locked = false, savedY = 0, returnTo = null;   // returnTo: nach dem Schließen dorthin (z. B. zu den Treffern)
  const lockPage = on => {
    if(on === locked) return;
    locked = on;
    const s = document.body.style;
    if(on){
      savedY = window.scrollY;
      root.classList.add("chat-lock");
      Object.assign(s, { position: "fixed", top: `-${savedY}px`, left: "0", right: "0", width: "100%" });
    } else {
      Object.assign(s, { position: "", top: "", left: "", right: "", width: "" });
      root.classList.remove("chat-lock");
      root.style.scrollBehavior = "auto";              // ohne Animation an die alte Stelle zurück
      window.scrollTo(0, savedY);
      if(returnTo){ window.scrollTo(0, returnTo.getBoundingClientRect().top + window.scrollY - 76); returnTo = null; }
      root.style.scrollBehavior = "";
    }
  };
  let raf = 0;
  const fitChat = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const on = phone() && panel.classList.contains("open");
      lockPage(on);
      if(!on || !vv){ panel.style.removeProperty("--vv-h"); panel.style.removeProperty("--vv-top"); return; }
      if(window.scrollY !== 0) window.scrollTo(0, 0);   // eingefrorene Seite darf nicht wandern
      panel.style.setProperty("--vv-h", Math.round(vv.height) + "px");
      panel.style.setProperty("--vv-top", Math.round(Math.max(0, vv.offsetTop)) + "px");
      body.scrollTop = body.scrollHeight;
    });
  };
  if(vv){ vv.addEventListener("resize", fitChat); vv.addEventListener("scroll", fitChat); }
  window.addEventListener("resize", fitChat);
  input.addEventListener("focus", () => { fitChat(); setTimeout(fitChat, 300); });
  input.addEventListener("blur", () => setTimeout(fitChat, 100));
  // Wischen außerhalb des Nachrichtenbereichs blockieren (sonst zieht man die Seite dahinter mit)
  document.addEventListener("touchmove", e => {
    if(!locked) return;
    // erlaubt: alles, was im Chat selbst scrollen kann (Nachrichten, waagrechte Ergebnis-Leisten)
    for(let el = e.target; el && el !== panel && el.nodeType === 1; el = el.parentElement){
      const cs = getComputedStyle(el);
      if(/(auto|scroll)/.test(cs.overflowY + " " + cs.overflowX) && (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1)) return;
    }
    e.preventDefault();
  }, { passive: false });

  const open = () => {
    panel.classList.add("open"); panel.setAttribute("aria-hidden", "false");
    launch.classList.add("hidden");
    fitChat();
    if(!greeted){
      greeted = true;
      // Begrüßung erst, wenn das Fenster aufgezogen ist
      setTimeout(() => {
        addMsg("Grüß Gott! Ich bin der digitale Assistent von Scotia Immobilien. Wonach suchen Sie? Schreiben Sie z. B. <em>„3 Zimmer in Neubau“</em> – oder wählen Sie ein Thema:", "bot");
        addChips();
      }, 380);
    }
    // am Handy nicht automatisch ins Feld springen: sonst klappt sofort die Tastatur auf und iPhones zoomen hinein
    if(!matchMedia("(pointer: coarse)").matches) setTimeout(() => input.focus({ preventScroll: true }), 450);
  };
  const close = () => {
    panel.classList.remove("open"); panel.setAttribute("aria-hidden", "true");
    launch.classList.remove("hidden");
    fitChat();
  };
  document.addEventListener("keydown", e => { if(e.key === "Escape" && panel.classList.contains("open")) close(); });
  launch.addEventListener("click", open);
  document.getElementById("chatClose").addEventListener("click", close);
  form.addEventListener("submit", e => {
    e.preventDefault();
    const text = input.value.trim();
    if(!text) return;
    input.value = "";
    reply(text);
  });
  document.querySelectorAll("[data-open-chat]").forEach(el => el.addEventListener("click", e => { e.preventDefault(); open(); }));
}

// ===== EIGENE AUSKLAPP-LISTEN (statt der eckigen Browser-Listen) =====
// Das echte <select> bleibt unsichtbar erhalten, damit Suche und Formular unverändert funktionieren.
const CHEVRON = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
let csOpen = null;

function csClose(){
  if(!csOpen) return null;
  const { pop, trig } = csOpen;
  pop.remove();
  trig.classList.remove("open");
  trig.setAttribute("aria-expanded", "false");
  csOpen = null;
  return trig;
}
function csPlace(){
  if(!csOpen) return;
  const { trig, pop } = csOpen;
  const anchor = trig.closest(".field") || trig;
  const r = anchor.getBoundingClientRect();
  pop.style.minWidth = Math.max(r.width, 200) + "px";
  const h = pop.offsetHeight, w = pop.offsetWidth;
  const left = Math.max(12, Math.min(r.left, window.innerWidth - w - 12));
  const spaceBelow = window.innerHeight - r.bottom;
  const up = spaceBelow < h + 16 && r.top > h + 16;
  pop.classList.toggle("up", up);
  pop.style.left = left + "px";
  pop.style.top = (up ? r.top - h - 6 : r.bottom + 6) + "px";
}
function csSetActive(li){
  if(!csOpen || !li) return;
  csOpen.pop.querySelectorAll(".cs-opt.active").forEach(o => o.classList.remove("active"));
  li.classList.add("active");
  li.scrollIntoView({ block: "nearest" });
}
function csChoose(index){
  if(!csOpen) return;
  const { sel } = csOpen;
  sel.selectedIndex = index;
  sel.dispatchEvent(new Event("change", { bubbles: true }));
  const trig = csClose();
  if(trig) trig.focus({ preventScroll: true });
}
function csOpenList(sel, trig){
  if(csOpen && csOpen.trig === trig){ csClose(); return; }
  csClose();
  const pop = document.createElement("ul");
  pop.className = "cs-pop";
  pop.setAttribute("role", "listbox");
  [...sel.options].forEach((o, i) => {
    if(o.disabled) return;
    const li = document.createElement("li");
    li.className = "cs-opt" + (i === sel.selectedIndex ? " sel" : "");
    li.setAttribute("role", "option");
    li.setAttribute("aria-selected", i === sel.selectedIndex);
    li.dataset.index = i;
    li.innerHTML = `<span>${o.text}</span>${icon("check")}`;
    li.addEventListener("click", e => { e.stopPropagation(); csChoose(i); });
    li.addEventListener("mousemove", () => csSetActive(li));
    pop.appendChild(li);
  });
  document.body.appendChild(pop);
  csOpen = { sel, trig, pop };
  trig.classList.add("open");
  trig.setAttribute("aria-expanded", "true");
  csPlace();
  csSetActive(pop.querySelector(".sel") || pop.firstElementChild);
  requestAnimationFrame(() => pop.classList.add("show"));
}

function enhanceSelects(){
  document.querySelectorAll("select").forEach(sel => {
    if(sel._sync) return;
    const wrap = document.createElement("div");
    wrap.className = "cselect";
    sel.parentNode.insertBefore(wrap, sel);
    wrap.appendChild(sel);
    sel.classList.add("cs-native");
    sel.tabIndex = -1;

    const trig = document.createElement("button");
    trig.type = "button";
    trig.className = "cs-trigger";
    trig.setAttribute("aria-haspopup", "listbox");
    trig.setAttribute("aria-expanded", "false");
    trig.innerHTML = `<span class="cs-value"></span>${CHEVRON}`;
    wrap.appendChild(trig);
    const label = sel.id && document.querySelector(`label[for="${sel.id}"]`);
    if(label){ trig.id = sel.id + "-btn"; label.setAttribute("for", trig.id); }

    const sync = () => {
      const o = sel.options[sel.selectedIndex];
      trig.querySelector(".cs-value").textContent = o ? o.text : "";
      trig.classList.toggle("placeholder", !!o && o.disabled);
    };
    sel._sync = sync;
    sync();
    sel.addEventListener("change", sync);

    trig.addEventListener("click", e => { e.stopPropagation(); csOpenList(sel, trig); });
    trig.addEventListener("keydown", e => {
      if(!csOpen && ["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)){ e.preventDefault(); csOpenList(sel, trig); }
    });
    // Klick irgendwo in das Feld (auch auf die Beschriftung) öffnet die Liste
    const field = wrap.closest(".field");
    if(field) field.addEventListener("click", e => {
      if(trig.contains(e.target)) return;
      e.preventDefault(); e.stopPropagation(); csOpenList(sel, trig);
    });
  });

  document.addEventListener("click", () => csClose());
  window.addEventListener("resize", csPlace);
  window.addEventListener("scroll", csPlace, true);
  document.addEventListener("keydown", e => {
    if(!csOpen) return;
    const opts = [...csOpen.pop.querySelectorAll(".cs-opt")];
    const cur = opts.findIndex(o => o.classList.contains("active"));
    if(e.key === "ArrowDown"){ e.preventDefault(); csSetActive(opts[Math.min(opts.length - 1, cur + 1)]); }
    else if(e.key === "ArrowUp"){ e.preventDefault(); csSetActive(opts[Math.max(0, cur - 1)]); }
    else if(e.key === "Enter" || e.key === " "){ e.preventDefault(); if(opts[cur]) csChoose(Number(opts[cur].dataset.index)); }
    else if(e.key === "Escape"){ e.stopPropagation(); const t = csClose(); if(t) t.focus({ preventScroll: true }); }
    else if(e.key === "Tab"){ csClose(); }
  }, true);
}

// ===== START =====
function init(){
  document.querySelectorAll("[data-icon]").forEach(el => { el.innerHTML = icon(el.dataset.icon); });
  enhanceButtons();
  initChrome();

  const chipCount = document.getElementById("objCount");
  if(chipCount) chipCount.textContent = properties.length;

  const featured = document.getElementById("featuredGrid");
  if(featured) renderCards(featured, properties.slice(0, 3));
  renderTeam(document.getElementById("teamGrid"));

  initRotator();
  initSearch();
  initChat();
  enhanceSelects();
}
if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();

// ===== AUTOMATISCH NEU LADEN (nur online) =====
// Beim Veröffentlichen schreibt scotia-veroeffentlichen.mjs die Versionsnummer in <meta name="scotia-version">
// und in version.json. Ändert sich die Nummer, lädt die Seite von selbst neu – aber nicht mitten im Chat
// oder während ein Objekt offen ist.
(() => {
  const meta = document.querySelector('meta[name="scotia-version"]');
  if(!meta) return;
  const mine = meta.content;
  const busy = () => document.documentElement.classList.contains("chat-lock") ||
    document.getElementById("chatPanel")?.classList.contains("open") ||
    document.getElementById("modal")?.classList.contains("open") ||
    (document.activeElement && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName));
  let pending = null;
  const go = v => {
    const u = new URL(location.href);
    u.searchParams.set("v", v);
    location.replace(u.toString());
  };
  const check = async () => {
    if(pending){ if(!busy()) go(pending); return; }
    try {
      const r = await fetch("version.json?t=" + Date.now(), { cache: "no-store" });
      const { version } = await r.json();
      if(version && version !== mine){ pending = version; if(!busy()) go(version); }
    } catch(e) { /* offline – später nochmal */ }
  };
  setInterval(check, 15000);
  document.addEventListener("visibilitychange", () => { if(!document.hidden) check(); });
})();
