import axios from "../lib/axios";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import TrasferteTable from "../components/trasferte/TrasferteTable";

function Trasferte() {
  const navigate = useNavigate();

  const {
    data: businessTrips,
    error,
    isLoading,
  } = useSWR("/api/business-trip", () =>
    axios.get("/api/business-trip").then((res) => res.data.businessTrips)
  );

  const navigateToNew = () => {
    navigate("/nuova-trasferta");
  };

  return (
    <div className="pt-8 flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Trasferte</h1>
        <button className="btn btn-primary w-1/4" onClick={navigateToNew}>
          Nuova trasferta
        </button>
      </div>
      <div className="divider" />
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="loading loading-spinner loading-lg  text-primary" />
        </div>
      ) : (
        <TrasferteTable businessTrips={businessTrips} />
      )}
    </div>
  );
}
export default Trasferte;
