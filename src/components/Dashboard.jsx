import { useAuth } from "../hooks/useAuth";
import { UserCheck, CarFront, CalendarDays, ArrowBigRight } from "lucide-react";

function Dashboard() {
  const { user } = useAuth({
    middleware: "auth",
  });

  return (
    <div className="pt-8 flex flex-col gap-2">
      <h1 className="text-4xl font-bold">Benvenuto {user.name}</h1>
      <div className="divider" />

      <div className="grid grid-cols-3 gap-2">
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">
              <UserCheck />
              Presenze
            </h2>
            <div className="card-actions justify-end">
              <a href="/presenze" className="btn">
                <ArrowBigRight />
              </a>
            </div>
          </div>
        </div>
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">
              <CarFront />
              Trasferte
            </h2>
            <div className="card-actions justify-end">
              <a href="/trasferte" className="btn">
                <ArrowBigRight />
              </a>
            </div>
          </div>
        </div>
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">
              <CalendarDays />
              Ferie e Permessi
            </h2>
            <div className="card-actions justify-end">
              <a href="/ferie" className="btn">
                <ArrowBigRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
