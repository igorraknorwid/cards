import * as React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./index.css";
import Years from "./components/Years";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1 className='text-3xl font-bold underline'>Hello world!</h1>
        <Years />
        <Link to='about'>About Us</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById("root")
);
