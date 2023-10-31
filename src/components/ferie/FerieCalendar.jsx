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

function FerieCalendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      locale={locale}
    />
  );
}
export default FerieCalendar;
