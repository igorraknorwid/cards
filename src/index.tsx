import * as React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./index.css";
import Years from "./components/pages/year_page";
import Cards from "./components/pages/cards_page";
import CardsByCategory from "./components/pages/category_page";
import ErrorPage from "./PageError";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1 className='text-3xl font-bold underline'>
          Bibliografia Ziemi Lubuskej 1945-1989
        </h1>
        <Years />
        <Link to='about?year=1944'>O Projekcie</Link>
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "cards",
    element: <Cards />,
  },
  {
    path: "cards/category",
    element: <CardsByCategory />,
  },
  {
    path: "about",
    element: <div> Bibliografia Ziemi Lubuskej 1945-1989</div>,
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById("root")
);
