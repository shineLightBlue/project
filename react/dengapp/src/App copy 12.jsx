import * as React from "react";
import {
  Outlet,
  Link,
  createBrowserRouter,
  RouterProvider,
  useNavigation,
} from "react-router-dom";
import Test, { loader } from "./pages/Test";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "about",
        // lazy: () => import("./pages/About"),
        async lazy() {
          let { About, aboutLoader } = await import("./pages/About");
          return { loader: aboutLoader, Component: About };
        },
      },
      {
        path: "test",
        element: <Test></Test>,
        loader: loader,
      },
      {
        path: "dashboard",
        async lazy() {
          let { DashboardLayout } = await import("./pages/Dashboard");
          return { Component: DashboardLayout };
        },
        children: [
          {
            index: true,
            async lazy() {
              let { DashboardIndex } = await import("./pages/Dashboard");
              return { Component: DashboardIndex };
            },
          },
          {
            path: "messages",
            async lazy() {
              let { dashboardMessagesLoader, DashboardMessages } = await import(
                "./pages/Dashboard"
              );
              return {
                loader: dashboardMessagesLoader,
                Component: DashboardMessages,
              };
            },
          },
        ],
      },
      {
        path: "*",
        element: <NoMatch></NoMatch>,
      },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
function Layout() {
  return (
    <div>
      <h1>Lazy Loading Example using RouterProvider</h1>

      <p>
        This example demonstrates how to lazily load route definitions using{" "}
        <code>route.lazy()</code>. To get the full effect of this demo, be sure
        to open your Network tab and watch the new bundles load dynamically as
        you navigate around.
      </p>

      <p>
        The "About" and "Dashboard" pages are not loaded until you click on the
        link. When you do, the code is loaded via a dynamic{" "}
        <code>import()</code> statement during the <code>loading</code> phase of
        the navigation. Once the code loads, the route loader executes, and then
        the element renders with the loader-provided data.
      </p>
      <p>
        This works for all data-loading/rendering related properties of a route,
        including <code>action</code>, <code>loader</code>, <code>element</code>
        , <code>errorElement</code>, and <code>shouldRevalidate</code>. You
        cannot return path-matching properties from <code>lazy()</code> such as{" "}
        <code>path</code>, <code>index</code>, <code>children</code>, and{" "}
        <code>caseSensitive</code>.
      </p>
      <div style={{ position: "fixed", top: 0, right: 0 }}>
        <p>Navigation in progress...</p>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
          <li>
            <Link to="/dashboard/messages">Messages (Dashboard)</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet></Outlet>
    </div>
  );
}
function Home() {
  console.log("Home");
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
