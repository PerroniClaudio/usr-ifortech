import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./lib/authConfig.js";
import axios from "./lib/axios";

import Root from "./routes/Root.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const msalInstance = new PublicClientApplication(msalConfig);

import PageLayout from "./components/PageLayout";
import Presenze from "./routes/presenze.jsx";
import PresenzeCreate from "./routes/presenze-create.jsx";
import PresenzeEdit from "./routes/presenze-edit.jsx";
import Ferie from "./routes/ferie";
import FerieCreate from "./routes/ferie-create";
import FerieEdit from "./routes/ferie-edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageLayout>
        <Root />
      </PageLayout>
    ),
  },
  {
    path: "/presenze",
    element: (
      <PageLayout>
        <Presenze />
      </PageLayout>
    ),
  },
  {
    path: "/presenze/:id",
    loader: async ({ request, params }) => {
      return axios.get(`/api/attendance/${params.id}`).then((res) => res.data);
    },
    element: (
      <PageLayout>
        <PresenzeEdit />
      </PageLayout>
    ),
  },
  {
    path: "/nuova-presenza",
    element: (
      <PageLayout>
        <PresenzeCreate />
      </PageLayout>
    ),
  },
  {
    path: "/ferie",
    element: (
      <PageLayout>
        <Ferie />
      </PageLayout>
    ),
  },
  {
    path: "/nuove-ferie",
    element: (
      <PageLayout>
        <FerieCreate />
      </PageLayout>
    ),
  },
  {
    path: "/ferie/:id",
    loader: async ({ request, params }) => {
      return axios
        .get(`/api/time-off-request/${params.id}`)
        .then((res) => res.data);
    },
    element: (
      <PageLayout>
        <FerieEdit />
      </PageLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <ToastContainer
        toastStyle={{
          backgroundColor: `hsl(var(--b3))`,
          color: `hsl(var(--bc))`,
        }}
      />
      <RouterProvider router={router} />
    </MsalProvider>
  </React.StrictMode>
);
