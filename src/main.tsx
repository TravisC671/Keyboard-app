import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page.tsx";
import Edit from "./edit/Edit.tsx";

import { loader as editLoader } from "./edit/Edit.tsx";

const router = createBrowserRouter([
  {
    path: "/index.html",
    element:<App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/index.html/key/:keyid",
    element: <Edit />,
    loader: editLoader,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
