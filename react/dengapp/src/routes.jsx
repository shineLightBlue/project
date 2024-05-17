import React from "react";
import {
  Link,
  Outlet,
  json,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
export function Layout() {
  return (
    <>
      <nav>
        <Link to="/projects/authorized">Authorized Project</Link>
        &nbsp;|&nbsp;
        <Link to="/projects/unauthorized">Unauthorized Project</Link>
        &nbsp;|&nbsp;
        <Link to="/projects/broken">Broken Project</Link>
      </nav>
      <p>
        This example shows the flexibility of{" "}
        <code>&lt;Route errorElement&gt;</code>
      </p>
      <ul>
        <li>
          Clicking the "Authorized Project" link will take you to the happy path
          where we successfully load and render the details for a project.
        </li>
        <li>
          Clicking the "Unauthorized Project" link will simulate a case where
          the user does not have access to the given project, so our loader can
          throw a 401 response that is handed in-context by a{" "}
          <code>&lt;ProjectErrorBoundary&gt;</code>.
        </li>
        <li>
          Clicking the "Broken Project" link will return some malformed data
          causing a render error. This is beyond what{" "}
          <code>&lt;ProjectErrorBoundary&gt;</code> can handle, so it re-throws
          the error and it gets handled by{" "}
          <code>&lt;RootErrorBoundary&gt;</code> instead.
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export function RootErrorBoundary() {
  let error = useRouteError();
  console.dir(error);
  console.dir(error.message);
  return (
    <div>
      <h1>Uh oh, something went terribly wrong</h1>
      <pre>{error.message || JSON.stringify(error)} </pre>
      <button onClick={() => (window.location.href = "/")}>
        Click here to reload the app
      </button>
    </div>
  );
}

export function projectLoader({ params }) {
  console.log(params);
  if (params.projectId === "unauthorized") {
    throw json({ contanctEmail: "administrator@fake.com" }, { status: 401 });
  }
  if (params.projectId === "broken") {
    return json({
      id: params.projectId,
      name: "Break Some Stuff",
      owner: "The Joker",
      deadline: "June 2022",
      cost: "Free",
    });
  }
  return json({
    project: {
      id: params.projectId,
      name: "Build Some Stuff",
      owner: "Joe",
      deadline: "June 2022",
      cost: "$5,000 USD",
    },
  });
}
export function ProjectErrorBoundary() {
  let error = useRouteError();
  console.log(isRouteErrorResponse(error));
  console.log(error.status);
  console.log(error);
  if (!isRouteErrorResponse(error) || error.status !== 401) {
    throw error;
  }
  return (
    <>
      <h1>You do not have access to this project</h1>
      <p>
        Please reach out to{" "}
        <a href={`mailto:${error.data.contanctEmail}`}>
          {error.data.contanctEmail}
        </a>{" "}
        to obtain access.
      </p>
    </>
  );
}
export function Project() {
  let { project } = useLoaderData();
  console.log(project);
  return (
    <>
      <h1>Project Name: {project.name}</h1>
      <p>Owner: {project.owner}</p>
      <p>Deadline: {project.deadline}</p>
      <p>Cost: {project.cost}</p>
    </>
  );
}
