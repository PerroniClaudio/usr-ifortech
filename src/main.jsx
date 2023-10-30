import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./lib/authConfig.js";

import Root from "./routes/Root.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const msalInstance = new PublicClientApplication(msalConfig);

import PageLayout from "./components/PageLayout";
import Presenze from "./routes/presenze.jsx";
import PresenzeCreate from "./routes/presenze-create.jsx";

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
    path: "/nuova-presenza",
    element: (
      <PageLayout>
        <PresenzeCreate />
      </PageLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <RouterProvider router={router} />
    </MsalProvider>
  </React.StrictMode>
);
