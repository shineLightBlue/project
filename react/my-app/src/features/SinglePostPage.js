import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
export const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) =>
    state.post.find((post) => post.id === postId)
  );
  if (!post) {
    return (
      <section>
        <h2>页面未找到！</h2>
      </section>
    );
  }
  return (
    <section>
      <article>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <PostAuthor userId={post.user}></PostAuthor>
        <Link to={`/editPost/${post.id}`}>Edit Post</Link>
        <TimeAgo timestamp={post.date}></TimeAgo>
      </article>
    </section>
  );
};
