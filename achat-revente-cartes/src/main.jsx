import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home/Home";
import ErrorPage from "./components/Error/error-page";
import CardTransfert from "./components/CardTransfert/CardTransfert";
import Auth from "./components/Auth/Auth";
import { Provider } from "react-redux";
import { createStore } from "redux";
import globalReducer from "./core/reducers";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";

const user = { id: 8, surName: "Bobby", accountUser: 1000 };
const store = createStore(globalReducer);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home user={user} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/buy",
    element: <CardTransfert user={user} transac="buy" />,
  },
  {
    path: "/sell",
    element: <CardTransfert user={user} transac="sell" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
