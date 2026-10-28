// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});

nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Opening hours, in Carbondale (US Mountain) time. Minutes since midnight.
// Same every day: 11am–8pm.
const OPEN = 11 * 60;
const CLOSE = 20 * 60;

function carbondaleNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type).value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const { day, minutes } = carbondaleNow();

const todayRow = document.querySelector(`.hours tr[data-day="${day}"]`);
if (todayRow) todayRow.classList.add("is-today");

// Only the home page has the open/closed badge.
const status = document.getElementById("open-status");

if (status && minutes >= OPEN && minutes < CLOSE) {
  status.textContent = "Open now · until 8pm";
} else if (status) {
  status.parentElement.classList.add("is-closed");
  status.textContent = minutes < OPEN ? "Opens today at 11am" : "Closed now · opens 11am";
}

document.getElementById("year").textContent = new Date().getFullYear();
