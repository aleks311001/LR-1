import React from "react";
import { Automata } from "../Automata";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAutomata } from "../../actions/automatas";
import { ApiClientService } from "../../services/ApiClientService";

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

  const handleSave = async (automata, return_main) => {
    const data = await ApiClientService("automatas/", {
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(automata),
      method: "POST",
    });

    console.log(data);

    dispatch(setAutomata(data));
    if (return_main) {
      history.push(`/`);
    }
  };

  return <Automata handleSave={handleSave} />;
}
