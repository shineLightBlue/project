import * as React from "react";
import { useLoaderData } from "react-router-dom";
export async function loader() {
  console.log("loading test");
  return "loading test";
}
export default function Test() {
  console.log("Test");
  const data = useLoaderData();
  return (
    <div>
      test
      <p>{data}</p>
    </div>
  );
}
