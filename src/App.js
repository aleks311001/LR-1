import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { SighIn } from "./components/Sign";
import { AllAutomatas } from "./components/AllAutomatas";
import { CreateAutomata } from "./components/CreateAutomata";
import About from "./components/About";
import { SignUp } from "./components/Sign";
import { EditAutomata } from "./components/EditAutomata";

export default function App() {
  return (
    <>
      <Router>
        <Header />

        <Switch>
          <Route path="/create_automata">
            <CreateAutomata />
          </Route>

          <Route path="/automata/:automataId">
            <EditAutomata />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/sign_in">
            <SighIn />
          </Route>

          <Route path="/sigh_up">
            <SignUp />
          </Route>

          <Route path="/">
            <AllAutomatas />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
