import { useParams, useLoaderData } from "react-router-dom";
import { useState } from "react";
import useSWR from "swr";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

function PresenzeEdit() {
  const params = useLoaderData();
  const navigate = useNavigate();

  const {
    data: companies,
    error: companiesError,
    isLoading: companiesIsLoading,
  } = useSWR("/api/companies", () =>
    axios.get("/api/companies").then((res) => res.data.companies)
  );

  const {
    data: presenzeType,
    error: presenzeTypeError,
    isLoading: presenzeTypeIsLoading,
  } = useSWR("/api/presenze-type", () =>
    axios.get("/api/presenze-type").then((res) => res.data.types)
  );

  const [formData, setFormData] = useState({
    date: params.date,
    time_in: params.time_in,
    time_out: params.time_out,
    company_id: params.company_id,
    attendance_type_id: params.attendance_type_id,
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const updatePresenza = (e) => {
    e.preventDefault();

    axios
      .patch(`/api/attendance/${params.id}`, formData)
      .then((res) => {
        navigate("/presenze");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };

  useEffect(() => {
    const checkFormDisabled = () => {
      return (
        formData.date === "" ||
        formData.time_in === "" ||
        formData.time_out === "" ||
        formData.company_id === "" ||
        formData.attendance_type_id === ""
      );
    };

    setButtonDisabled(checkFormDisabled());
  }, [formData]);

  return (
    <div className="pt-8 flex flex-col">
      <h1 className="text-4xl font-bold">Modifica Presenza</h1>
      <div className="divider" />
      <form onSubmit={updatePresenza}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Data</span>
          </label>
          <input
            type="date"
            placeholder="Data"
            className="input input-bordered"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Orario Inizio</span>
          </label>
          <input
            type="time"
            placeholder="Orario"
            className="input input-bordered"
            value={formData.time_in}
            onChange={(e) =>
              setFormData({ ...formData, time_in: e.target.value })
            }
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Orario Fine</span>
          </label>
          <input
            type="time"
            placeholder="Orario"
            className="input input-bordered"
            value={formData.time_out}
            onChange={(e) =>
              setFormData({ ...formData, time_out: e.target.value })
            }
          />
        </div>

        <div className="form-control">
          <label htmlFor="" className="label">
            <span className="label-text">Azienda</span>
          </label>
          <select
            className="select select-bordered"
            value={formData.company_id}
            onChange={(e) =>
              setFormData({ ...formData, company_id: e.target.value })
            }>
            <option value="">Seleziona un'azienda</option>
            {companies &&
              companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="" className="label">
            <span className="label-text">Tipo</span>
          </label>
          <select
            className="select select-bordered"
            value={formData.attendance_type_id}
            onChange={(e) =>
              setFormData({ ...formData, attendance_type_id: e.target.value })
            }>
            <option value="">Seleziona un tipo</option>
            {presenzeType &&
              presenzeType.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={buttonDisabled}>
            Salva
          </button>
        </div>
      </form>
    </div>
  );
}
export default PresenzeEdit;
