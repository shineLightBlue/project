import * as React from "react";
import { Link, Route, Routes, useSearchParams } from "react-router-dom";
export default function App() {
  return (
    <div>
      <h1>Search Params Example</h1>

      <p>
        This example demonstrates a simple search page that makes a request for
        user data to the GitHub API and displays information for that user on
        the page. The example uses the <code>useSearchParams()</code> hook to
        read and write the URL query string.
      </p>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="*" element={<NoMatch></NoMatch>}></Route>
      </Routes>
    </div>
  );
}
function randomUser() {
  let users = ["chaance", "jacob-ebey", "mcansh", "mjackson", "ryanflorence"];
  return users[Math.floor(Math.random() * users.length)];
}
function Home() {
  let [searchParams, setSearchParams] = useSearchParams();
  let user = searchParams.get("user");
  let [userData, setUserData] = React.useState(null);
  React.useEffect(() => {
    console.log("useEffect");
    let abortController = new AbortController();
    console.log(abortController.signal);
    async function getGitHubUser() {
      console.log(abortController.signal);
      let response = await fetch(`https://api.github.com/users/${user}`, {
        signal: abortController.signal,
      });
      if (!abortController.signal.aborted) {
        let data = await response.json();
        console.log(data);
        setUserData(data);
      }
      console.log(abortController.signal);
    }
    if (user) {
      getGitHubUser();
    }
    return () => {
      abortController.abort();
    };
  }, [user]);
  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    let formData = new FormData(event.currentTarget);
    let newUser = formData.get("user");
    console.log(newUser);
    if (!newUser) return;
    setSearchParams({ user: newUser });
  }
  function handleRandomSubmit(event) {
    event.preventDefault();
    let newUser = randomUser();
    if (newUser === user) {
      handleRandomSubmit();
    } else {
      setSearchParams({ user: newUser });
    }
  }
  return (
    <div>
      <div style={{ display: "flex" }}>
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" name="user" />
          </label>
          <button type="submit">Search</button>
        </form>
        <form onSubmit={handleRandomSubmit}>
          <input type="hidden" name="random" />
          <button type="submit">Random</button>
        </form>
      </div>
      {userData && (
        <div
          style={{
            padding: "24px",
            margin: "24px 0",
            borderTop: "1px solid #eaeaea",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <img
            style={{ borderRadius: "50%" }}
            width={200}
            height={200}
            src={userData.avatar_url}
            alt={userData.login}
          ></img>
          <div>
            <h2>{userData.name}</h2>
            <p>{userData.bio}</p>
          </div>
        </div>
      )}
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
