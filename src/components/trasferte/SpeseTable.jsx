import { PlusIcon } from "lucide-react";
import axios from "../../lib/axios";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useGeolocation } from "../../hooks/useGeolocation";
import { toast } from "react-toastify";

const paymentTypes = [
  "Carta di credito aziendale",
  "Carta di credito personale",
  "Bancomat aziendale",
  "Bancomat personale",
  "Anticipo contante",
  "Contante personale",
];

const expenseTypes = ["Pasto", "Pedaggio", "Parcheggio", "Trasporto"];

function SpeseTable({ trasfertaId }) {
  const {
    data: expenses,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/business-trip/${trasfertaId}/expense`, () =>
    axios
      .get(`/api/business-trip/${trasfertaId}/expense`)
      .then((res) => res.data.expenses)
  );

  const {
    data: companies,
    error: companiesError,
    isLoading: companiesIsLoading,
  } = useSWR("/api/companies", () =>
    axios.get("/api/companies").then((res) => res.data.companies)
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [formData, setFormData] = useState({
    company_id: "",
    payment_type: "",
    expense_type: "",
    amount: "",
    date: "",
    time: "",
    address: "",
    province: "",
    city: "",
    zip_code: "",
  });

  const { latitude, longitude } = useGeolocation(
    formData.address,
    formData.city,
    formData.zip_code
  );

  useEffect(() => {
    if (
      formData.company_id &&
      formData.payment_type &&
      formData.expense_type &&
      formData.amount &&
      formData.date &&
      formData.time &&
      formData.address &&
      formData.province &&
      formData.city &&
      formData.zip_code
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [formData]);

  const submitExpense = () => {
    axios
      .post(`/api/business-trip/${trasfertaId}/expense`, {
        ...formData,
        business_trip_id: trasfertaId,
        datetime: `${formData.date} ${formData.time}`,
        latitude,
        longitude,
      })
      .then((res) => {
        toast.success("Spesa creata con successo");
        setIsFormOpen(false);
        mutate();
      })
      .catch((err) => {
        toast.error("Errore nella creazione della spesa");
      });
  };

  return (
    <>
      <div className="flex justify-between items-center mt-8">
        <h1 className="text-2xl font-bold">Spese</h1>
        <button
          className="btn btn-primary w-1/12 "
          onClick={() => setIsFormOpen(true)}>
          <PlusIcon />
        </button>
      </div>
      <div className="divider" />

      {isFormOpen && (
        <div className="card w-full bg-neutral text-neutral-content">
          <div className="card-body">
            <h2 className="card-title">Crea nuova</h2>

            <div className="grid grid-cols-4 gap-2">
              <div className="form-control col-span-4">
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

              <div className="divider col-span-4" />

              <div className="form-control col-span-2">
                <label htmlFor="" className="label">
                  <span className="label-text">Pagamento</span>
                </label>
                <select
                  className="select select-bordered"
                  value={formData.payment_type}
                  onChange={(e) =>
                    setFormData({ ...formData, payment_type: e.target.value })
                  }>
                  <option value="">Seleziona un'opzione</option>

                  {paymentTypes.map((paymentType, index) => (
                    <option key={index} value={index}>
                      {paymentType}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label htmlFor="" className="label">
                  <span className="label-text">Categoria</span>
                </label>
                <select
                  className="select select-bordered"
                  value={formData.expense_type}
                  onChange={(e) =>
                    setFormData({ ...formData, expense_type: e.target.value })
                  }>
                  <option value="">Seleziona un'opzione</option>
                  {expenseTypes.map((expenseTypes, index) => (
                    <option key={index} value={index}>
                      {expenseTypes}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label htmlFor="" className="label">
                  <span className="label-text">Importo</span>
                </label>
                <input
                  type="number"
                  placeholder="Importo"
                  className="input input-bordered"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
              </div>

              <div className="divider col-span-4" />

              <div className="form-control col-span-2">
                <label className="label">
                  <span className="label-text">Data</span>
                </label>
                <input
                  type="date"
                  placeholder="Data"
                  className="input input-bordered"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>

              <div className="form-control col-span-2">
                <label className="label">
                  <span className="label-text">Ora</span>
                </label>
                <input
                  type="time"
                  placeholder="Ora"
                  className="input input-bordered"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
              </div>

              <div className="divider col-span-4" />

              <div className="form-control col-span-4">
                <label className="label">
                  <span className="label-text">Indirizzo</span>
                </label>
                <input
                  type="text"
                  placeholder="Indirizzo"
                  className="input input-bordered"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <div className="form-control col-span-2">
                <label htmlFor="" className="label">
                  <span className="label-text">Provincia</span>
                </label>
                <select
                  className="select select-bordered"
                  value={formData.province}
                  onChange={(e) =>
                    setFormData({ ...formData, province: e.target.value })
                  }>
                  <option value="">Seleziona un'opzione</option>
                  {expenseTypes.map((expenseTypes, index) => (
                    <option key={index} value={index}>
                      {expenseTypes}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control col-span-1">
                <label className="label">
                  <span className="label-text">Comune</span>
                </label>
                <input
                  type="text"
                  placeholder="Comune"
                  className="input input-bordered"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>

              <div className="form-control col-span-1">
                <label className="label">
                  <span className="label-text">CAP</span>
                </label>
                <input
                  type="text"
                  placeholder="CAP"
                  className="input input-bordered"
                  value={formData.zip_code}
                  onChange={(e) =>
                    setFormData({ ...formData, zip_code: e.target.value })
                  }
                />
              </div>

              <div className="form-control col-span-2">
                <label className="label">
                  <span className="label-text">Latitudine</span>
                </label>
                <input
                  type="text"
                  placeholder="Latitudine"
                  className="input input-bordered disabled"
                  disabled={true}
                  value={latitude}
                />
              </div>

              <div className="form-control col-span-2">
                <label className="label">
                  <span className="label-text">Longitudine</span>
                </label>
                <input
                  type="text"
                  placeholder="Longitudine"
                  className="input input-bordered disabled"
                  disabled={true}
                  value={longitude}
                />
              </div>
            </div>

            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={submitExpense}
                disabled={isSubmitDisabled}>
                Salva
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setIsFormOpen(false)}>
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Azienda</th>
            <th>Data</th>
            <th>Indirizzo</th>
            <th>Comune</th>
            <th>Pagamento</th>
            <th>Categoria</th>
            <th>Importo</th>
            <th></th>
          </tr>
        </thead>

        {isLoading ? (
          <tbody>
            <tr>
              <td colSpan="9">
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="loading loading-spinner loading-lg  text-primary" />
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{expense.company.name}</td>
                <td>
                  {new Date(expense.date).toLocaleDateString({
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  &nbsp;
                  {new Date(expense.date).toLocaleTimeString("it-IT", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>{expense.address}</td>
                <td>{expense.city}</td>
                <td>{paymentTypes[expense.payment_type]}</td>
                <td>{expenseTypes[expense.expense_type]}</td>
                <td>{expense.amount}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
}
export default SpeseTable;
