import { UserCheck, CarFront, CalendarDays } from "lucide-react";

function Sidenav() {
  return (
    <div className="drawer-side">
      <label
        htmlFor="drawer-main"
        aria-label="close sidebar"
        className="drawer-overlay"></label>

      <div className="p-4 w-80 min-h-full bg-base-200 text-base-content">
        <div className="flex flex-col">
          <a href="/" className="btn btn-ghost normal-case text-xl">
            <img src="/logo.png" alt="ifortech" className="h-8" />
          </a>
          <div className="divider" />
        </div>
        <ul className="menu">
          <li>
            <a href="/presenze">
              <UserCheck />
              Presenze
            </a>
          </li>
          <li>
            <a href="/trasferte">
              <CarFront />
              Trasferte
            </a>
          </li>
          <li>
            <a href="/ferie">
              <CalendarDays />
              Ferie e Permessi
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Sidenav;
