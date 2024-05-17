import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postUpdated } from "../store/post/postSlice";
import { useParams } from "react-router";
export const EditPostForm = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const post = useSelector((state) =>
    state.post.find((post) => post.id === postId)
  );
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const dispatch = useDispatch();
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
      navigate(`/post/${postId}`);
    }
  };
  return (
    <section>
      <h2>编辑文章</h2>
      <form>
        <label>文章标题:</label>
        <input type="text" value={title} onChange={onTitleChanged}></input>
        <label>内容:</label>
        <textarea value={content} onChange={onContentChanged}></textarea>
        <button type="button" onClick={onSavePostClicked}>
          保存文章
        </button>
      </form>
    </section>
  );
};
