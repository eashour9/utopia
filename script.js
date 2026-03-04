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

function initMap() {
  var map = L.map("nac-map", {
    center: [30.01379579488688, 31.730987992935404],
    zoom: 11,
    zoomControl: false,
    scrollWheelZoom: true,
    dragging: true,
    minZoom: 8,
    maxZoom: 25,
    doubleClickZoom: true,
    touchZoom: true,
    attributionControl: false,
  });

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 18,
    subdomains: "abcd",
  }).addTo(map);

  var bounds = L.latLngBounds(
    [29.97, 31.63], // southwest corner
    [30.07, 31.83], // northeast corner
  );

  map.setMaxBounds(bounds);
  map.options.maxBoundsViscosity = 1.0; // hard stop

  var dotIcon = L.divIcon({
    className: "leaflet-dot-icon",
    html: '<div class="lmap-pin"></div>',
    iconSize: [10, 10],
    iconAnchor: [5, 5],
    popupAnchor: [0, -8],
  });

  L.marker([30.01379579488688, 31.730987992935404], { icon: dotIcon })
    .addTo(map)
    .bindPopup("NAC site - construction began 2017", {
      className: "lmap-popup",
    });

  L.marker([30.0444, 31.2357], { icon: dotIcon })
    .addTo(map)
    .bindPopup("Cairo", { className: "lmap-popup" });

  L.marker([30.01, 31.45], { icon: dotIcon })
    .addTo(map)
    .bindPopup("New Cairo", {
      className: "lmap-popup",
    });
}
