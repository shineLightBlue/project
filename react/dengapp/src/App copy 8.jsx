import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root";
import NewNote, { action as newNoteAction } from "./routes/new";
import Note, {
  loader as noteLoader,
  action as noteAction,
} from "./routes/note";
let router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    loader: rootLoader,
    children: [
      {
        path: "new",
        element: <NewNote></NewNote>,
        action: newNoteAction,
      },
      {
        path: "note/:noteId",
        element: <Note></Note>,
        loader: noteLoader,
        action: noteAction,
        errorElement: <h2>Note not found</h2>,
      },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
