import useSWR from "swr";
import axios from "../lib/axios";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function FerieCreate() {
  const navigate = useNavigate();

  const {
    data: requestTypes,
    error: requestTypesError,
    isLoading: requestTypesIsLoading,
  } = useSWR("/api/time-off-type", () => {
    return axios.get("/api/time-off-type").then((res) => res.data.types);
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [events, setEvents] = useState([]);

  const today = new Date();

  useEffect(() => {
    if (startDate !== "" && endDate !== "") {
      setEvents([]);

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end - start >= 0) {
        const diffTime = Math.abs(end - start);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        for (let i = 0; i < diffDays; i++) {
          const newDate = new Date(start);
          newDate.setDate(newDate.getDate() + i);

          setEvents((prev) => [
            ...prev,
            {
              date: newDate,
              start_time: "08:00",
              end_time: "12:00",
              type: 11,
            },
          ]);

          setEvents((prev) => [
            ...prev,
            {
              date: newDate,
              start_time: "13:00",
              end_time: "17:00",
              type: 11,
            },
          ]);
        }
      } else {
        setEndDate("");
      }
    }
  }, [startDate, endDate]);

  const submitTimeOffRequest = () => {
    const formattedEvents = events.map((event) => ({
      date_from: `${event.date.toISOString().slice(0, 10)} ${
        event.start_time
      }:00`,
      date_to: `${event.date.toISOString().slice(0, 10)} ${event.end_time}:00`,
      time_off_type_id: event.type,
    }));

    axios
      .post("/api/time-off-request/batch", {
        requests: JSON.stringify(formattedEvents),
      })
      .then((res) => {
        toast.success("Richiesta inviata con successo");
        navigate("/ferie");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };

  return (
    <div className="pt-8 flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Nuova Richiesta</h1>
        <button
          className="btn btn-primary w-1/4"
          onClick={submitTimeOffRequest}>
          Invia Richiesta
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

      <div className="divider" />
      <table className="table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Orario Inizio</th>
            <th>Orario Fine</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {events.map((singleEvent, index) => (
            <tr key={index}>
              <td>
                {singleEvent.date.toLocaleDateString("it-IT", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td>
                <input
                  type="time"
                  name=""
                  id=""
                  className="input input-bordered w-full"
                  value={events[index].start_time}
                  onChange={(e) => {
                    const newEvents = [...events];
                    newEvents[index].start_time = e.target.value;
                    setEvents(newEvents);
                  }}
                />
              </td>
              <td>
                <input
                  type="time"
                  name=""
                  id=""
                  className="input input-bordered w-full"
                  value={events[index].end_time}
                  onChange={(e) => {
                    const newEvents = [...events];
                    newEvents[index].end_time = e.target.value;
                    setEvents(newEvents);
                  }}
                />
              </td>
              <td>
                <select
                  className="select select-bordered w-full"
                  value={events[index].type}
                  onChange={(e) => {
                    const newEvents = [...events];
                    newEvents[index].type = e.target.value;
                    setEvents(newEvents);
                  }}>
                  {requestTypes &&
                    requestTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default FerieCreate;
