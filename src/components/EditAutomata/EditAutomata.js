import { Automata } from "../Automata";
import { useHistory, useParams } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteAutomata, setAutomata } from "../../actions/automatas";
import { ApiClientService } from "../../services/ApiClientService";

export function EditAutomata() {
  const params = useParams();
  const { automataId } = params;
  // const defGrammar = ["S -> aSbS", "S -> $", "S -> $", "S -> $"];
  const history = useHistory();
  const dispatch = useDispatch();

  // const defAutomata = {
  //   defName: "Automata name",
  //   // date: "15.10.2021",
  //   defRegexp: "regular expression",
  //   defGrammar,
  // };
  // const [defaultAutomata, setAutomata] = React.useState(defAutomata);

  // React.useEffect(() => {
  //   fetch(`http://localhost:3001/automatas/${automataId}`)
  //     .then((response) => response.json())
  //     .then((automata) => setAutomata(automata));
  // }, []);

  const handleSave = async (automata, return_main) => {
    const data = await ApiClientService(`automatas/${automataId}/`, {
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(automata),
      method: "PUT",
    });

    dispatch(setAutomata(data));
    if (return_main) {
      history.push(`/`);
    }
  };

  const handleDelete = async (automataId) => {
    const data = await ApiClientService(`automatas/${automataId}/`, {
      headers: {
        "Content-Type": "Application/json",
      },
      method: "DELETE",
    });

    dispatch(deleteAutomata(automataId));
    history.push(`/`);
  };

  return (
    <Automata
      automataId={automataId}
      img="/img1.png"
      handleSave={handleSave}
      handleDelete={handleDelete}
    />
  );
}
