import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
  useResolvedPath,
  useMatch,
} from "react-router";
import { Link } from "react-router-dom";
import * as React from "react";

function App() {
  return (
    <div>
      <h1>Custom Link Example</h1>
      <p>
        This example demonstrates how to create a custom{" "}
        <code>&lt;Link&gt;</code> component that knows whether or not it is
        "active" using the low-level <code>useResolvedPath()</code> and{" "}
        <code>useMatch()</code> hooks.
      </p>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="about" element={<About></About>}></Route>
          <Route path="*" element={<NoMatch></NoMatch>}></Route>
        </Route>
      </Routes>
    </div>
  );
}
function CustomLink({ children, to, ...props }) {
  console.log(children, to);
  let resolved = useResolvedPath(to);
  console.log(resolved);
  let match = useMatch({ path: resolved.pathname, end: true });
  console.log(match);
  return (
    <div>
      <Link
        style={{ textDecoration: match ? "underline" : "none" }}
        to={to}
        {...props}
      >
        {children}
      </Link>
      {match && " (active)"}
    </div>
  );
}
function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <CustomLink to="/">Home</CustomLink>
          </li>
        </ul>
        <ul>
          <li>
            <CustomLink to="/about">About</CustomLink>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet></Outlet>
    </div>
  );
}
function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}
function NoMatch() {
  return (
    <div>
      <h1>Nothing to see here!</h1>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
export default App;
