import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home/Home";
import ErrorPage from "./components/Error/error-page";
import CardTransfert from "./components/CardTransfert/CardTransfert";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/buy",
    element: <CardTransfert />,
  },
  {
    path: "/sell",
    element: <CardTransfert />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
