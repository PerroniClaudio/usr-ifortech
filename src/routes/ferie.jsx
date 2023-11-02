import { useNavigate } from "react-router-dom";
import FerieCalendar from "../components/ferie/FerieCalendar";
import axios from "../lib/axios";
import useSWR from "swr";

function Ferie() {
  const navigate = useNavigate();

  const {
    data: ferie,
    error,
    isLoading,
  } = useSWR("/api/time-off-request", () =>
    axios.get("/api/time-off-request").then((res) => res.data.requests)
  );

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center text-primary">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const navigateToNew = () => {
    navigate("/nuove-ferie");
  };

  const navigateToEdit = (id) => {
    navigate(`/ferie/${id}`);
  };

  return (
    <div className="pt-8 flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Ferie e Permessi</h1>
        <button className="btn btn-primary w-1/4" onClick={navigateToNew}>
          Nuova richiesta
        </button>
      </div>

      <div className="divider" />
      <FerieCalendar events={ferie} clickHandler={navigateToEdit} />
    </div>
  );
}
export default Ferie;
