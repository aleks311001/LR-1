import React from "react";
import { Automata } from "../Automata";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAutomata, setAutomata } from "../../actions/automatas";
import { ApiClientService } from "../../services/ApiClientService";
import { BAD_REFRESH_TOKEN } from "../../constants/constants";
import { exitUser } from "../../actions/user";

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
    // console.log(automata);

    const data = await ApiClientService("automatas/", {
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(automata),
      method: "POST",
    });

    if (data !== BAD_REFRESH_TOKEN) {
      dispatch(setAutomata(data));
    } else {
      dispatch(exitUser());
    }
    // console.log(data);

    if (return_main) {
      history.push(`/`);
    } else {
      history.push(`/automata/${data.id}`);
    }
  };

  return <Automata handleSave={handleSave} />;
}
