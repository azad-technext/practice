import Home from "../pages/Home";
import PageTwo from "../pages/PageTwo";
import PageThree from "../pages/PageThree";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/page-two",
    element: <PageTwo />,
  },
  {
    path: "/page-three",
    element: <PageThree />,
  },
]);
