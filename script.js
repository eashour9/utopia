// script.js

function setIndicator(index) {
  const el = document.getElementById("page-indicator");
  if (el) el.textContent = String(index + 1).padStart(2, "0") + " / 04";
}

function setNavActive(index) {
  document.querySelectorAll(".nav-item").forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

function initPage(index) {
  setIndicator(index);
  setNavActive(index);
}

// bread

function initBudgetCounter() {
  const el = document.getElementById("budget-counter");
  const bar = document.getElementById("progress-bar");
  if (!el) return;

  const TARGET = 2_911_020_000_000;
  const duration = 2000;
  const start = performance.now();

  function countUp(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * TARGET).toLocaleString("en-US");
    if (progress < 1) requestAnimationFrame(countUp);
  }

  requestAnimationFrame(countUp);

  setTimeout(() => {
    if (bar) bar.style.width = "30%";
  }, 300);
}

function initLoaves() {
  const grid = document.getElementById("loaves-grid");
  if (!grid) return;

  for (let i = 0; i < 32; i++) {
    const loaf = document.createElement("div");
    loaf.className = "loaf";
    loaf.textContent = "عيش";
    grid.appendChild(loaf);
  }

  grid.querySelectorAll(".loaf").forEach((l, i) => {
    if (i < 22) setTimeout(() => l.classList.add("consumed"), i * 50 + 400);
  });
}

// freedom

function revealToggle(el) {
  if (el.classList.contains("revealed")) {
    el.classList.remove("revealed");
    el.textContent = "████████████████";
    el.classList.add("re-concealed");
    setTimeout(() => el.classList.remove("re-concealed"), 900);
  } else {
    el.textContent = el.dataset.text;
    el.classList.add("revealed");
    setTimeout(() => {
      if (!el.classList.contains("revealed")) return;
      el.classList.remove("revealed");
      el.textContent = "████████████████";
      el.classList.add("re-concealed");
      setTimeout(() => el.classList.remove("re-concealed"), 900);
    }, 3400);
  }
}

// leaflet map

const mapPins = [
  { latlng: [30.01379579488688, 31.730987992935404], img: "img/nac.webp" },
  { latlng: [30.0444, 31.2357], img: "img/cairo.webp" },
  { latlng: [30.01, 31.45], img: "img/newcairo.jpg" },
];

function openMapModal(index) {
  document.querySelector(".map-modal-img").src = mapPins[index].img;
  document.getElementById("map-modal").classList.add("open");
}

function closeMapModal() {
  document.getElementById("map-modal").classList.remove("open");
}

function initMap() {
  const map = L.map("nac-map", {
    zoomControl: false,
    scrollWheelZoom: true,
    dragging: true,
    minZoom: 7,
    maxZoom: 25,
    doubleClickZoom: true,
    touchZoom: true,
    attributionControl: false,
  });

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 18,
    subdomains: "abcd",
  }).addTo(map);

  map.fitBounds(L.latLngBounds(mapPins.map((p) => p.latlng)), {
    padding: [48, 48],
  });

  map.setMaxBounds(L.latLngBounds([29.8, 31.0], [30.2, 32.0]));
  map.options.maxBoundsViscosity = 1.0;

  const dotIcon = L.divIcon({
    className: "leaflet-dot-icon",
    html: '<div class="lmap-pin-wrapper"><div class="lmap-pin-ring"></div><div class="lmap-pin-ring lmap-pin-ring-2"></div><div class="lmap-pin"></div></div>',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  mapPins.forEach((pin, i) => {
    L.marker(pin.latlng, { icon: dotIcon })
      .addTo(map)
      .on("click", () => openMapModal(i));
  });
}
