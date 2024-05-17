import { React, useState } from "react";
import {
  Switch,
  Route,
  Link,
  Routes,
  Outlet,
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "./store/counter/counterSlice";
import { AddPostForm } from "./features/AddPostForm";
import { PostList } from "./features/PostList";
import { SinglePostPage } from "./features/SinglePostPage";
import { Navbar } from "./features/Navbar";
import { EditPostForm } from "./features/EditPostForm";
import { logAndAdd } from "./store/counter/counterSlice";
export default function BasicExample() {
  return (
    <div>
      <Navbar />
      {/* <h2>Accounts</h2>
      <ul>
        <li>
          <Link to="/netflix">Netflix</Link>
        </li>
        <li>
          <Link to="/zillow-group">Zillow Group</Link>
        </li>
        <li>
          <Link to="/yahoo">Yahoo</Link>
        </li>
        <li>
          <Link to="/modus-create">Modus Create</Link>
        </li>
      </ul> */}
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul> */}
      {/* <hr /> */}
      <Routes>
        {/* <Route path="/:id" element={<Counter></Counter>}></Route> */}
        <Route path="/" element={<Counter></Counter>}></Route>
        <Route
          path="/post/:postId"
          element={<SinglePostPage></SinglePostPage>}
        ></Route>
        <Route
          path="/editPost/:postId"
          element={<EditPostForm></EditPostForm>}
        ></Route>
      </Routes>
    </div>
  );
}

function Counter() {
  const count = useSelector(selectCount);
  let { id } = useParams();
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(2);
  // const increment = () => {
  //   setCounter((prevCounter) => prevCounter + 1);
  // };
  return (
    <div>
      <AddPostForm />
      <PostList />
      <h2>ID:{id}</h2>
      {/* Value:{counter} */}
      {count}
      {/* <button onClick={increment}>Increment</button> */}
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(logAndAdd(5))}>+5</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <input
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(Number(e.target.value))}
      />
      <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>
        +
      </button>
      <button onClick={() => dispatch(incrementAsync(incrementAmount))}>
        +
      </button>
    </div>
  );
}
