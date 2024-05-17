import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router";
import { Link } from "react-router-dom";
import * as React from "react";

function App() {
  return (
    <AuthProvider>
      <h1>Auth Example</h1>

      <p>
        This example demonstrates a simple login flow with three pages: a public
        page, a protected page, and a login page. In order to see the protected
        page, you must first login. Pretty standard stuff.
      </p>

      <p>
        First, visit the public page. Then, visit the protected page. You're not
        yet logged in, so you are redirected to the login page. After you login,
        you are redirected back to the protected page.
      </p>

      <p>
        Notice the URL change each time. If you click the back button at this
        point, would you expect to go back to the login page? No! You're already
        logged in. Try it out, and you'll see you go back to the page you
        visited just *before* logging in, the public page.
      </p>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage></PublicPage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          ></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div>
      <AuthStatus />
      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
      <Outlet></Outlet>
    </div>
  );
}
let AuthContext = React.createContext(null);
function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);
  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };
  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };
  console.log(children);
  let value = { user, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  console.log(location);
  let from = location.state?.from?.pathname || "/";
  console.log(from, "from");
  function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let username = formData.get("username");
    auth.signin(username, () => {
      navigate(from, { replace: true });
    });
  }
  return (
    <div>
      <p>You must log in to view the page at</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username:<input name="username" type="text"></input>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
function useAuth() {
  return React.useContext(AuthContext);
}
function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();
  console.log(auth);
  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }
  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => {
            auth.signout(() => navigate("/"));
          });
        }}
      >
        Sign out
      </button>
    </p>
  );
}
function PublicPage() {
  return <h3>Public</h3>;
}
function ProtectedPage() {
  return <h3>Protected</h3>;
}
function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();
  console.log(location);
  if (!auth.user) {
    return <Navigate to="/login" replace state={{ from: location }}></Navigate>;
  }
  console.log(auth);
  return children;
}
const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};
export default App;
