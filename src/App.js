import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { SighIn } from "./components/Sign";
import { AllAutomatas } from "./components/AllAutomatas";
import { CreateAutomata } from "./components/CreateAutomata";
import About from "./components/About";
import { SignUp } from "./components/Sign";
import { EditAutomata } from "./components/EditAutomata";
import { ApiClientService } from "./services/ApiClientService";
import { exitUser, setUser } from "./actions/user";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { BAD_REFRESH_TOKEN } from "./constants/constants";

export default function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const user = await ApiClientService("user/current/");
    if (user !== BAD_REFRESH_TOKEN) {
      dispatch(setUser(user));
    } else {
      dispatch(exitUser());
    }
  };

  React.useEffect(() => {
    void fetchUser();
  }, []);

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

          <Route path="/sigh_out">
            <Redirect to="/" />
          </Route>

          <Route path="/">
            <AllAutomatas />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
