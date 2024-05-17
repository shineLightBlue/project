import * as React from "react";
import { useLoaderData } from "react-router-dom";
import icon from "./cow.gif";
export async function aboutLoader() {
  await new Promise((r) => setTimeout(r, 3000));
  return "I came from the About.jsx loader function!";
}
export function About() {
  console.log("About");
  let data = useLoaderData();
  return (
    <div>
      <img src={icon} alt="" />
      <h2>About</h2>
      <p>{data}</p>
    </div>
  );
}
// Component.displayName = "AboutPage";
// 当用lazy={() => import("./a")}导入时会自动识别export的loader 、 action 、 element / Component 、 errorElement / ErrorBoundary 、 shouldRevalidate 、 handle等函数
// 进行注入使用。减少了配置Route时属性的重复。
