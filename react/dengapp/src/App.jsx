import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
  useLocation,
  useLoaderData,
  useNavigation,
  ScrollRestoration,
} from "react-router-dom";
import "./index.css";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: <h2>Home</h2>,
      },
      {
        path: "restore-by-key",
        loader: getArrayLoader,
        element: <LongPage></LongPage>,
      },
      {
        path: "restore-by-pathname",
        loader: getArrayLoader,
        element: <LongPage></LongPage>,
        handle: { scrollMode: "pathname" },
      },
      {
        path: "link-to-hash",
        loader: getArrayLoader,
        element: <LongPage></LongPage>,
      },
    ],
  },
]);
export default function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<p>Loading...</p>}
    ></RouterProvider>
  );
}
function Layout() {
  let navigation = useNavigation();
  let getKey = React.useCallback((location, matches) => {});
  return (
    <div>
      <style>
        {`
        .wrapper {
          display: grid;
          padding: 1rem;
          grid-template-columns: 1fr 2fr;
        }
        .fixed {
          position: fixed;
          padding: 1rem;
          max-width: 20%;
          height: 100%;
        }
        .navitem {
          margin: 1rem 0;
        }
        .spinner {
          position: fixed;
          top: 0;
          right: 0;
          padding: 5px;
          background-color: lightgreen;
        }
        `}
      </style>
      <div className="wrapper">
        <div className="left">
          <div className="fixed">
            <nav>
              <ul>
                <li className="navitem">
                  <Link to="/">Home</Link>
                </li>
                <li className="navitem">
                  <Link to="/restore-by-key">
                    This page restores by location.key
                  </Link>
                </li>
                <li className="navitem">
                  <Link to="/restore-by-pathname">
                    This page restores by location.pathname
                  </Link>
                </li>
                <li className="navitem">
                  <Link to="/link-to-hash">
                    This link will link to a nested heading via hash
                  </Link>
                </li>
                <li className="navitem">
                  <Link to="/restore-by-key">
                    This page restores by location.key
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="right">
          <Outlet></Outlet>
        </div>
      </div>
      <ScrollRestoration
        getKey={(location, matches) => {
          console.log(location, matches);
          const paths = ["/restore-by-pathname"];
          return paths.includes(location.pathname)
            ? location.pathname
            : location.key;
        }}
      ></ScrollRestoration>
    </div>
  );
}

async function getArrayLoader() {
  await new Promise((r) => setTimeout(r, 1000));
  return {
    arr: new Array(100).fill(null).map((_, i) => i),
  };
}
function LongPage() {
  let data = useLoaderData();
  let location = useLocation();
  return (
    <>
      <h2>Long Page</h2>
      {data.arr.map((n) => (
        <p key={n}>
          Item {n} on {location.pathname}
        </p>
      ))}
      <h3>This is a linkable heading</h3>
      {data.arr.map((n) => (
        <p key={n}>
          Item {n + 100} on {location.pathname}
        </p>
      ))}
    </>
  );
}
