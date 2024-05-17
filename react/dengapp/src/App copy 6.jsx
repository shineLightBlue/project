import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Link,
  json,
  Outlet,
  Form,
  unstable_useBlocker as useBlocker,
  useLocation,
} from "react-router-dom";
let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout></Layout>}>
      <Route index element={<h2>Index</h2>}></Route>
      <Route path="one" element={<h2>One</h2>}></Route>
      <Route path="two" element={<h2>Two</h2>}></Route>
      <Route
        path="three"
        action={(request) => {
          console.log(request);
          return json({ ok: true });
        }}
        element={
          <>
            <h2>Three</h2>
            <ImportantForm></ImportantForm>
          </>
        }
      ></Route>
      <Route path="four" element={<h2>Four</h2>}></Route>
      <Route path="five" element={<h2>Five</h2>}></Route>
    </Route>
  )
);
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
function Layout() {
  let [historyIndex, setHistoryIndex] = React.useState(
    window.history.state.idx
  );
  let location = useLocation();
  React.useEffect(() => {
    document.title = location.pathname;
  }, [location]);
  console.log(window.history.state, location);
  React.useEffect(() => {
    setHistoryIndex(window.history.state.idx);
  }, [location]);
  return (
    <>
      <h1>Navigation Blocking Example</h1>
      <nav>
        <Link to="/">Index</Link>&nbsp;&nbsp;
        <Link to="/one">One</Link>&nbsp;&nbsp;
        <Link to="/two">Two</Link>&nbsp;&nbsp;
        <Link to="/three">Three (Form with blocker)</Link>&nbsp;&nbsp;
        <Link to="/four">Four</Link>&nbsp;&nbsp;
        <Link to="/five">Five</Link>&nbsp;&nbsp;
      </nav>
      <p>
        Current location (index):{location.pathname}
        {historyIndex}
      </p>
      <Outlet></Outlet>
    </>
  );
}
function ImportantForm() {
  let [value, setValue] = React.useState("");
  let isBlocked = value !== "";
  console.log(isBlocked);
  let blocker = useBlocker(isBlocked);
  console.log(blocker);
  return (
    <>
      <p>
        Is the form dirty?{" "}
        {isBlocked ? (
          <span style={{ color: "red" }}>Yes</span>
        ) : (
          <span style={{ color: "green" }}>No</span>
        )}
      </p>
      <Form method="post">
        <label>
          Enter some important data:
          <input
            name="data"
            value={value}
            onChange={(e) => {
              console.log(e);
              setValue(e.target.value);
            }}
          />
        </label>
        <button type="submit">Save</button>
      </Form>
      {blocker ? (
        <ConfirmNavigation blocker={blocker}></ConfirmNavigation>
      ) : null}
    </>
  );
}
function ConfirmNavigation({ blocker }) {
  console.log(blocker);
  if (blocker.state === "blocked") {
    return (
      <>
        <p style={{ color: "red" }}>Blocker the last navigation to</p>
        <button onClick={() => blocker.proceed()}>Let me through</button>
        <button onClick={() => blocker.reset()}>Keep me here</button>
      </>
    );
  }
  if (blocker.state === "proceeding") {
    return (
      <p style={{ color: "orange" }}>Proceeding through blocked navigation</p>
    );
  }
  return <p style={{ color: "green" }}>Blocker is currently unblocked</p>;
}
