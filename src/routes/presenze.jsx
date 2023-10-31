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
    <div className="pt-8 flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Presenze</h1>
        <button className="btn btn-primary w-1/4" onClick={navigateToNew}>
          Nuova presenza
        </button>
      </div>

      <div className="divider" />

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
