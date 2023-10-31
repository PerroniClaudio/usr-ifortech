import FerieCalendar from "../components/ferie/FerieCalendar";
import swr from "swr";

function Ferie() {
  return (
    <div className="pt-8 flex flex-col">
      <h1 className="text-4xl font-bold">Ferie e Permessi</h1>
      <div className="divider" />
      <FerieCalendar />
    </div>
  );
}
export default Ferie;
