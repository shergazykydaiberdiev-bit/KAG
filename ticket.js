const events = [
  {
    id: 1,
    type: "concert",
    icon: "🎤",
    title: "Kyrgyz Music Festival",
    date: "15 Август, 2026",
    time: "19:00",
    location: "Бишкек Арена",
    price: 1500
  },
  {
    id: 2,
    type: "sport",
    icon: "⚽",
    title: "Кыргызстан — Өзбекстан",
    date: "20 Август, 2026",
    time: "20:00",
    location: "Д. Өмүрзаков стадиону",
    price: 800
  },
  {
    id: 3,
    type: "theatre",
    icon: "🎭",
    title: "Ак кеме",
    date: "22 Август, 2026",
    time: "18:00",
    location: "Кыргыз драма театры",
    price: 700
  },
  {
    id: 4,
    type: "cinema",
    icon: "🎬",
    title: "KAG Cinema Night",
    date: "25 Август, 2026",
    time: "21:00",
    location: "Bishkek Park",
    price: 500
  },
  {
    id: 5,
    type: "tour",
    icon: "🏔",
    title: "Ысык-Көл — Weekend Tour",
    date: "29 Август, 2026",
    time: "07:00",
    location: "Бишкек → Ысык-Көл",
    price: 3500
  },
  {
    id: 6,
    type: "concert",
    icon: "🎵",
    title: "Kyrgyz Stars Live",
    date: "5 Сентябрь, 2026",
    time: "19:30",
    location: "Асанбай Арена",
    price: 2000
  }
];
let currentEvents = [...events];
function renderEvents(list = currentEvents) {
  const grid = document.getElementById("eventsGrid");
  grid.innerHTML = "";
  if (!list.length) {
    grid.innerHTML = `
      <p style="grid-column:1/-1;padding:40px;text-align:center">
        Иш-чара табылган жок.
      </p>
    `;
    return;
  }
  list.forEach(event => {
    grid.innerHTML += `
      <article class="event-card">
        <div class="event-image">
          ${event.icon}
        </div>
        <div class="event-content">
          <div class="event-date">
            ${event.date} • ${event.time}
          </div>
          <h3 class="event-title">
            ${event.title}
          </h3>
          <div class="event-location">
            📍 ${event.location}
          </div>
          <div class="event-bottom">
            <div class="price">
              ${event.price.toLocaleString()} сом
            </div>
            <button
              class="buy-btn"
              onclick="openEvent(${event.id})">
              Билет алуу
            </button>
          </div>
        </div>
      </article>
    `;
  });
}
function openEvent(id) {
  const event = events.find(e => e.id === id);
  localStorage.setItem(
    "selectedEvent",
    JSON.stringify(event)
  );
  window.location.href = "ticket-details.html";
}
function filterEvents(type) {
  if (type === "all") {
    currentEvents = [...events];
  } else {
    currentEvents = events.filter(
      event => event.type === type
    );
  }
  renderEvents();
}
function searchEvents() {
  const input =
    document.getElementById("searchInput").value
      .toLowerCase()
      .trim();
  currentEvents = events.filter(event =>
    event.title.toLowerCase().includes(input) ||
    event.location.toLowerCase().includes(input)
  );
  renderEvents();
}
function sortEvents() {
  const type =
    document.getElementById("sortEvents").value;
  if (type === "price") {
    currentEvents.sort(
      (a,b) => a.price - b.price
    );
  }
  renderEvents();
}
renderEvents();
