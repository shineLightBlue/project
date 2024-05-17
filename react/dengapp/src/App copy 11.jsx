import { Routes, Route, Link, Outlet, useParams } from "react-router-dom";
import "./index.css";
import { getMessageById, messages } from "./messages";
export default function InboxApp() {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        <Route index element={<Inbox></Inbox>}></Route>
        <Route path=":id" element={<Message></Message>}></Route>
        <Route path="*" element={<NoMatch></NoMatch>}></Route>
      </Route>
    </Routes>
  );
}
function Layout() {
  return (
    <div>
      <h1>Welcome to the Inbox app!</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <Link to="/">Inbox</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet></Outlet>
    </div>
  );
}
function Inbox() {
  return (
    <div>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {messages.map((message) => (
          <Link
            to={message.id}
            key={message.id}
            style={{
              display: "flex",
              borderBottom: "1px solid #ccc",
              padding: "10px",
              width: "100%",
              textDecoration: "none",
              color: "#000",
            }}
          >
            <span style={{ flexBasis: 100, marginRight: "1rem" }}>
              {message.from.name}
            </span>
            <div
              style={{
                flexGrow: 1,
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginRight: "1rem",
              }}
            >
              <span>{message.subject}</span>
              <div style={{ display: "inline", color: "#999" }}>
                <span>{" — "}</span>
                <span>{message.body}</span>
              </div>
            </div>
            <span style={{ flexShrink: 0 }}>
              {new Date(message.date).toDateString()}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Message() {
  let { id } = useParams();
  let message = getMessageById(id);
  if (!message) {
    return <NoMatch></NoMatch>;
  }
  return (
    <div>
      <h2>{message.subject}</h2>
      <div>
        <h3 style={{ fontSize: 14 }}>
          <span>{message.from.name}</span>{" "}
          <span>&lt;{message.from.email}&gt;</span>
        </h3>
        <div>{message.body}</div>
      </div>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page of the app</Link>
      </p>
    </div>
  );
}
