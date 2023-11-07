import { useNavigate, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../lib/axios";
import useSWR from "swr";
import { toast } from "react-toastify";
import { PlusIcon } from "lucide-react";
import SpeseTable from "../components/trasferte/SpeseTable";
import SpostamentiTable from "../components/trasferte/SpostamentiTable";
function TrasferteEdit() {
  const params = useLoaderData();
  const navigate = useNavigate();

  const submitTrasferta = () => {};
  const today = new Date();

  const [formData, setFormData] = useState(params);

  return (
    <div className="pt-8 flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Modifica Trasferta</h1>
        <button className="btn btn-primary w-1/4" onClick={submitTrasferta}>
          Salva
        </button>
      </div>
      <div className="divider" />

      <div className="flex gap-2">
        <div className="form-control flex-1">
          <label className="label">
            <span className="label-text">Data Inizio</span>
          </label>
          <input
            type="date"
            placeholder="Data Inizio"
            className="input input-bordered"
            value={formData.date_from}
            onChange={(e) =>
              setFormData({ ...formData, date_from: e.target.value })
            }
          />
        </div>

        <div className="form-control flex-1">
          <label className="label">
            <span className="label-text">Data Fine</span>
          </label>
          <input
            type="date"
            placeholder="Data Fine"
            className="input input-bordered"
            value={formData.date_to}
            onChange={(e) => setEndDate(e.target.value)}
            min={formData.date_from}
          />
        </div>

        <div className="form-control flex-1">
          <label htmlFor="" className="label">
            <span className="label-text">Spese conteggiate</span>
          </label>
          <select
            className="select select-bordered"
            value={formData.expense_type}
            onChange={(e) =>
              setFormData({ ...formData, expense_type: e.target.value })
            }>
            <option value="">Seleziona un'opzione</option>
            <option value="0">Personali</option>
            <option value="1">Aziendali</option>
          </select>
        </div>
      </div>

      <SpeseTable trasfertaId={params.id} />
      <SpostamentiTable trasfertaId={params.id} />
    </div>
  );
}
export default TrasferteEdit;
