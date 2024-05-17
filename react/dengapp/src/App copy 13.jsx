import React from "react";
import { createBrowserRouter } from "react-router-dom";
let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
  },
]);
export default function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<p>Loading</p>}
    ></RouterProvider>
  );
}
function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
