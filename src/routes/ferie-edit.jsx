import useSWR from "swr";
import axios from "../lib/axios";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLoaderData, useNavigate } from "react-router-dom";

function FerieEdit() {
  const params = useLoaderData();
  const navigate = useNavigate();

  const [events, setEvents] = useState(
    params.requests.map((req) => ({
      id: req.id,
      date: new Date(req.date_from.split(" ")[0]),
      start_time: req.date_from.split(" ")[1],
      end_time: req.date_to.split(" ")[1],
      type: req.type,
    }))
  );

  const {
    data: requestTypes,
    error: requestTypesError,
    isLoading: requestTypesIsLoading,
  } = useSWR("/api/time-off-type", () => {
    return axios.get("/api/time-off-type").then((res) => res.data.types);
  });

  const submitTimeOffRequest = () => {
    const isEndTimeGreaterThanStartTime = events.every(
      (event) => event.end_time > event.start_time
    );

    if (!isEndTimeGreaterThanStartTime) {
      toast.error("L'ora di fine deve essere maggiore dell'ora di inizio");
      return;
    }

    const formattedEvents = events.map((event) => ({
      id: event.id,
      date_from: `${event.date.toISOString().slice(0, 10)} ${event.start_time}`,
      date_to: `${event.date.toISOString().slice(0, 10)} ${event.end_time}`,
      time_off_type_id: event.type,
    }));

    axios
      .patch("/api/time-off-request/batch", {
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
        <h1 className="text-4xl font-bold">Modifica Richiesta</h1>
        <button
          className="btn btn-primary w-1/4"
          onClick={submitTimeOffRequest}>
          Salva Modifiche
        </button>
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
                  className="select select-bordered w-full disabled"
                  disabled={true}
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
export default FerieEdit;
