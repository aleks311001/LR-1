import React from "react";
import { Automata } from "../Automata";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAutomata } from "../../actions/automatas";

export function CreateAutomata() {
  // const [latex, setLatex] = React.useState("");
  //
  // fetch("/automata.tex")
  //   .then((response) => response.text())
  //   .then((text) => {
  //     setLatex(text);
  //   });
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSave = (automata) => {
    fetch("http://localhost:3001/automatas", {
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(automata),
      method: "POST",
    })
      .then((response) => response.json())
      .then((updatedAutomata) => {
        dispatch(setAutomata(updatedAutomata));
        history.push(`/`);
      });
  };

  return <Automata handleSave={handleSave} />;
}
