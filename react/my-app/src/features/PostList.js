import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { ReactionButton } from "./ReactionButton";
import { TimeAgo } from "./TimeAgo";
export const PostList = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const orederPost = post.slice().sort((a, b) => b.date.localeCompare(a.date));
  const renderedPosts = orederPost.map((item) => (
    <article key={item.id}>
      <h3>{item.title}</h3>
      <p>{item.content}</p>
      <Link to={`/post/${item.id}`}>View Post</Link>
      <PostAuthor userId={item.user}></PostAuthor>
      <TimeAgo timestamp={item.date}></TimeAgo>
      <ReactionButton post={item}></ReactionButton>
    </article>
  ));
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};
