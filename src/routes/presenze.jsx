import { useAuth } from "../hooks/useAuth";
import axios from "../lib/axios";
import useSWR from "swr";
import PresenzeTable from "../components/presenze/PresenzeTable";
import { useNavigate } from "react-router-dom";

function Presenze() {
  const navigate = useNavigate();

  const {
    data: attendances,
    error,
    isLoading,
  } = useSWR("/api/attendance", () =>
    axios.get("/api/attendance").then((res) => res.data)
  );

  const navigateToNew = () => {
    navigate("/nuova-presenza");
  };

  return (
    <div className="pt-8 flex flex-col gap-2">
      <h1 className="text-4xl font-bold">Presenze</h1>
      <div className="divider" />
      <div className="card w-96 bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">Nuova presenza</h2>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={navigateToNew}>
              Segna una nuova presenza
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="loading loading-spinner loading-lg  text-primary" />
        </div>
      ) : (
        <PresenzeTable attendances={attendances} />
      )}
    </div>
  );
}
export default Presenze;
