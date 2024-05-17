import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
  useResolvedPath,
  useMatch,
  useParams,
} from "react-router";
import { VisuallyHidden } from "@reach/visually-hidden";
import { Link, useSearchParams } from "react-router-dom";
import * as React from "react";
import { brands, filterByBrand, getSneakerById, SNEAKERS } from "./snkrs";

function App() {
  return (
    <div>
      <h1>Custom Filter Link Example</h1>

      <p>
        This example demonstrates how to create a "filter link" like one that is
        commonly used to filter a list of products on an e-commerce website. The
        <code>&lt;BrandLink&gt;</code> component is a custom{" "}
        <code>&lt;Link&gt;</code> that knows whether or not it is currently
        "active" by what is in the URL query string.
      </p>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<SneakerGrid></SneakerGrid>}></Route>
          <Route
            path="/sneakers/:id"
            element={<SneakerView></SneakerView>}
          ></Route>
          <Route path="*" element={<NoMatch></NoMatch>}></Route>
        </Route>
      </Routes>
    </div>
  );
}
function Layout() {
  return (
    <div>
      <nav>
        <h3>Filter by brand</h3>
        <ul>
          <li>
            <Link to="/">All</Link>
          </li>
          {brands.map((brand) => (
            <li key={brand}>
              <BrandLink brand={brand}>{brand}</BrandLink>
            </li>
          ))}
        </ul>
      </nav>
      <hr />
      <Outlet></Outlet>
    </div>
  );
}
function BrandLink({ brand, children, ...props }) {
  let [searchParams] = useSearchParams();
  console.log(searchParams.toString());
  let isActive = searchParams.get("brand") === brand;
  return (
    <Link
      to={`/?brand=${brand}`}
      {...props}
      style={{
        ...props.style,
        color: isActive ? "red" : "black",
      }}
    >
      {children}
    </Link>
  );
}
function SneakerGrid() {
  let [searchParams] = useSearchParams();
  console.log(searchParams.toString());
  let brand = searchParams.get("brand");
  const sneakers = React.useMemo(() => {
    if (!brand) return SNEAKERS;
    return filterByBrand(brand);
  }, [brand]);
  console.log(brand);
  return (
    <main>
      <h2>Sneakers</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
          gap: "12px 24px",
        }}
      >
        {sneakers.map((snkr) => {
          let name = `${snkr.brand} ${snkr.model} ${snkr.colorway}`;
          return (
            <div key={snkr.id} style={{ position: "relative" }}>
              <img
                src={snkr.imageUrl}
                alt={name}
                width={200}
                height={200}
                style={{
                  borderRadius: "8px",
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1/1",
                }}
              />
              <Link
                style={{ position: "absolute", inset: 0 }}
                to={`/sneakers/${snkr.id}`}
              >
                <VisuallyHidden>{name}</VisuallyHidden>
              </Link>
              <div>
                <p>{name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
function SneakerView() {
  let { id } = useParams();
  if (!id) {
    return <NoMatch></NoMatch>;
  }
  let snkr = getSneakerById(id);
  if (!snkr) {
    return <NoMatch></NoMatch>;
  }
  let name = `${snkr.brand} ${snkr.model} ${snkr.colorway}`;
  return (
    <div>
      <h2>{name}</h2>
      <img
        src={snkr.imageUrl}
        alt={name}
        width={400}
        height={400}
        style={{ borderRadius: "8px", maxWidth: "100%", aspectRatio: "1/1" }}
      />
    </div>
  );
}
function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
export default App;
