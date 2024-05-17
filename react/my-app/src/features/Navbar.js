import React from "react";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Redux基础教程示例</h1>
        <div>
          <Link to="/">文章列表</Link>
        </div>
      </section>
    </nav>
  );
};
