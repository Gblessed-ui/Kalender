const calendar = document.getElementById("calendar");
const monthName = document.getElementById("monthName");

let current = new Date();

// Events aus localStorage laden
let events = JSON.parse(localStorage.getItem("events")) || {};

function saveEvents() {
    localStorage.setItem("events", JSON.stringify(events));
}

function addEvent(dateKey) {
    const text = prompt("Event eintragen:");
    if (!text) return;

    if (!events[dateKey]) {
        events[dateKey] = [];
    }

    events[dateKey].push(text);
    saveEvents();
    renderCalendar();
}

function renderCalendar() {
    calendar.innerHTML = "";

    const year = current.getFullYear();
    const month = current.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const months = [
        "Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];

    monthName.textContent = `${months[month]} ${year}`;

    const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    weekdays.forEach(day => {
        const div = document.createElement("div");
        div.className = "day";
        div.style.fontWeight = "bold";
        div.textContent = day;
        calendar.appendChild(div);
    });

    // Offset für Starttag
    let startOffset = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < startOffset; i++) {
        const empty = document.createElement("div");
        empty.className = "day empty";
        calendar.appendChild(empty);
    }

    // Tage einfügen
    for (let i = 1; i <= daysInMonth; i++) {
        const div = document.createElement("div");
        div.className = "day";
        div.textContent = i;

        const dateKey = `${year}-${month}-${i}`;

        // Events anzeigen
        if (events[dateKey]) {
            events[dateKey].forEach(ev => {
                const e = document.createElement("div");
                e.className = "event";
                e.textContent = ev;
                div.appendChild(e);
            });
        }

        // Klick zum Hinzufügen
        div.onclick = () => addEvent(dateKey);

        calendar.appendChild(div);
    }
}

document.getElementById("prev").onclick = () => {
    current.setMonth(current.getMonth() - 1);
    renderCalendar();
};

document.getElementById("next").onclick = () => {
    current.setMonth(current.getMonth() + 1);
    renderCalendar();
};

renderCalendar();
