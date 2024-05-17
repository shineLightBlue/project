import { Link, useSearchParams, Route, Routes } from "react-router-dom";
import * as React from "react";
import * as JSURL from "jsurl";

function App() {
  return (
    <div>
      <h1>Custom Query Parsing Example</h1>

      <p>
        This example demonstrates how to store a complex data structure in a URL
        query parameter.
      </p>

      <p>
        Each time a field in the form below changes, the URL is updated with a
        serialized version of the form's values. To see the effect this has,
        manipulate some fields in the form. Then, copy the URL in the address
        bar and paste it into a new tab in your browser to see the form in the
        exact same state as when you left it!
      </p>
      <Routes>
        <Route index element={<Home></Home>}></Route>
        <Route path="*" element={<NoMatch></NoMatch>}></Route>
      </Routes>
    </div>
  );
}
function useQueryParam(key) {
  let [searchParams, setSearchParams] = useSearchParams();
  let paramValue = searchParams.get(key);
  console.log(paramValue, "paramValue");
  let value = React.useMemo(() => JSON.parse(paramValue), [paramValue]);
  let setValue = React.useCallback(
    (newValue, options) => {
      console.log(newValue, options, searchParams.toString());
      let newSearchParams = new URLSearchParams(searchParams);
      console.log(newSearchParams.toString());
      newSearchParams.set(key, JSON.stringify(newValue));
      console.log(newSearchParams.toString());
      // console.log(JSURL.stringify(newValue));
      setSearchParams(newSearchParams, options);
    },
    [key, searchParams, setSearchParams]
  );
  return [value, setValue];
}
function Home() {
  let [pizza, setPizza] = useQueryParam("pizza");
  console.log(pizza, setPizza);
  if (!pizza) {
    pizza = { toppings: [], crust: "regular", extraSauce: false };
  }
  function handleChange(event) {
    let form = event.currentTarget;
    let formData = new FormData(form);
    let pizza = {
      toppings: formData.getAll("toppings"),
      crust: formData.get("crust"),
      extraSauce: formData.get("extraSauce"),
    };
    setPizza(pizza, { replace: true });
  }
  return (
    <div>
      <form onChange={handleChange}>
        <p>What would you like on your pizza</p>
        <p>
          <label>
            <input
              type="checkbox"
              name="toppings"
              value="pepperoni"
              defaultChecked={pizza.toppings.includes("pepperoni")}
            />{" "}
            Pepperoni
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="toppings"
              value="bell-peppers"
              defaultChecked={pizza.toppings.includes("bell-peppers")}
            />{" "}
            Bell Peppers
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="toppings"
              value="olives"
              defaultChecked={pizza.toppings.includes("olives")}
            />{" "}
            Olives
          </label>
        </p>
        <p>
          <label>
            <input
              type="radio"
              name="crust"
              value="regular"
              defaultChecked={pizza.crust === "regular"}
            />{" "}
            Regular Crust
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="crust"
              value="thin"
              defaultChecked={pizza.crust === "thin"}
            />{" "}
            Thin Crust
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="crust"
              value="deep-dish"
              defaultChecked={pizza.crust === "deep-dish"}
            />{" "}
            Deep Dish
          </label>
        </p>
        <p>
          <label>
            <input
              type="checkbox"
              name="extraSauce"
              defaultChecked={pizza.extraSauce}
            />{" "}
            Extra Sauce
          </label>
        </p>
      </form>
      <hr />
      <p>The current form vales are:</p>
      <pre>{JSON.stringify(pizza, null, 2)}</pre>
      {/* {JSON.stringify(pizza)} */}
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
