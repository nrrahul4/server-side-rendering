import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";

import { Link, Route, Switch } from "react-router-dom";
const Home = React.lazy(() => import("./Home"));
const About = React.lazy(() => import("./About"));
const Contact = React.lazy(() => import("./Contact"));

const MyLink = styled.li`
  > a {
    color: blue;
  }
`;

function App() {
  return (
    <>
      <h1>My server side rendering app</h1>
      <ul>
        <MyLink>
          <Link to="/home">Home</Link>
        </MyLink>
        <MyLink>
          <Link to="/about">About</Link>
        </MyLink>
        <MyLink>
          <Link to="/contact">Contact</Link>
        </MyLink>
      </ul>
      <Switch>
        <SuspenseHandler>
          <Route exact path="/home" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
        </SuspenseHandler>
      </Switch>
    </>
  );
}

function SuspenseHandler(props) {
  const [state, setState] = useState(false);
  useEffect(() => {
    if (window && window.preloadedData) {
      setState(true);
    }
  });
  if (state)
    return (
      <Suspense fallback={<div>loading....</div>}>{props.children}</Suspense>
    );
  return <div>Loading</div>;
}

export default App;
