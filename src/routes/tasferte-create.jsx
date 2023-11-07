import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function TrasferteCreate() {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const today = new Date();

  const submitTrasferta = () => {
    axios
      .post("/api/business-trip", {
        date_from: startDate,
        date_to: endDate,
      })
      .then((res) => {
        toast.success("Trasferta creata con successo");
        navigate(`/trasferte/${res.data.businessTrip.id}`);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="pt-8 flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Nuova Trasferta</h1>
        <button className="btn btn-primary w-1/4" onClick={submitTrasferta}>
          Salva
        </button>
      </div>
      <div className="divider" />

      <div className="flex gap-2">
        <div className="w-1/2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Data Inizio</span>
            </label>
            <input
              type="date"
              placeholder="Data Inizio"
              className="input input-bordered"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={today.toISOString().slice(0, 10)}
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Data Fine</span>
            </label>
            <input
              type="date"
              placeholder="Data Fine"
              className="input input-bordered"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default TrasferteCreate;
