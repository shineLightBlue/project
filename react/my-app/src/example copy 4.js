import React from "react";
import {
  Switch,
  Route,
  Link,
  Routes,
  Outlet,
  useParams,
  useMatch,
  useNavigate,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import { Button, Space } from "antd";
export default function BasicExample() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Accounts</h2>
      <Space wrap>
        <Button type="primary" onClick={() => navigate("/topics/rendering")}>
          Primary Button
        </Button>
        <Button onClick={() => navigate("/topics/components")}>
          Default Button
        </Button>
        <Button type="dashed" onClick={() => navigate("/topics/props-v-state")}>
          Dashed Button
        </Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Space>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <hr />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="topics/rendering"></Navigate>}
        ></Route>
        <Route path="topics/*" element={<Topics></Topics>}></Route>
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
function Topics() {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`components`}>Components</Link>
        </li>
        <li>
          <Link to={`props-v-state`}>Props v. State</Link>
        </li>
      </ul>
      <h3>Please select a topic.</h3>
      <hr />
      <Routes>
        <Route path="/:topicId/*" element={<Topic></Topic>}></Route>
      </Routes>
    </div>
  );
}
function Topic() {
  const todos = [
    { text: "star this repository", done: false, id: 1 },
    { text: "fork this repository", done: false, id: 2 },
    { text: "follow author", done: false, id: 3 },
    { text: "vue-element-admin", done: true, id: 4 },
    { text: "vue", done: true, id: 5 },
    { text: "element-ui", done: true, id: 6 },
    { text: "axios", done: true, id: 7 },
    { text: "webpack", done: true, id: 8 },
  ];
  const todoItems = todos.map((todo, index) => (
    <li key={index}>
      {todo.text}+{todo.id}+{todo.done.toString()}
      <br />
      {/* <Link to={`detail?id=${todo.id}&text=${todo.text}&done=${todo.done}`}> */}
      <Link to={`detail/${todo.id}/${todo.text}/${todo.done}`}>
        {todo.text}
      </Link>
    </li>
  ));
  let { topicId } = useParams();
  return (
    <div>
      {todoItems}
      <h3>{topicId}</h3>
      <hr></hr>
      <Routes>
        <Route
          path="/detail/:id/:text/:done"
          element={<Detail></Detail>}
        ></Route>
      </Routes>
    </div>
  );
}
function Detail() {
  // let [searchParams, setSearchParams] = useSearchParams();
  // const id = searchParams.get("id");
  // const text = searchParams.get("text");
  // const done = searchParams.get("done");
  const { id, text, done } = useParams();
  // function changeText() {
  //   setSearchParams("text=abc");
  // }
  return (
    <div>
      <li>id:{id}</li>
      <Button>Primary Button</Button>
      <li>text:{text}</li>
      <Button>Primary Button</Button>
      <li>done:{done}</li>
      <Button>Primary Button</Button>
    </div>
  );
}
