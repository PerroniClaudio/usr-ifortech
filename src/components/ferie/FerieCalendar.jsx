import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const locale = {
  code: "it",
  week: {
    dow: 1,
    doy: 4,
  },
  buttonText: {
    prev: "Prec",
    next: "Succ",
    today: "Oggi",
    month: "Mese",
    week: "Settimana",
    day: "Giorno",
    list: "Agenda",
  },
};

function FerieCalendar({ events, clickHandler }) {
  const eventTypeColors = {
    11: "#d50000",
    12: "#2962ff ",
    13: "#01579b",
    14: "#6200ea",
    15: "#1b5e20",
  };

  const eventsFormatted = events.map((event) => ({
    id: event.id,
    title: `${event.type.name} - ${event.user.name}`,
    start: event.date_from,
    end: event.date_to,
    original: event,
    color: eventTypeColors[event.type.id],
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      locale={locale}
      events={eventsFormatted}
      eventClick={(info) => clickHandler(info.event.extendedProps.original.id)}
    />
  );
}
export default FerieCalendar;
