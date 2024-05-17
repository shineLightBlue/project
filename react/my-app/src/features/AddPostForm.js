import React, { useState } from "react";
import { postAdded } from "../store/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const users = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);
  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postAdded(
          //   id: nanoid(),
          title,
          content,
          userId
        )
      );
      setTitle("");
      setContent("");
    }
  };
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  return (
    <section>
      <h2>添加新文章</h2>
      <form>
        <label>文章标题:</label>
        <input type="text" value={title} onChange={onTitleChanged}></input>
        <label>Author:</label>
        <select value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label>内容:</label>
        <textarea value={content} onChange={onContentChanged}></textarea>
        <button type="button" onClick={onSavePostClicked}>
          保存文章
        </button>
      </form>
    </section>
  );
};
