import { Automata } from "../Automata";
import { useHistory, useParams } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { setAutomata } from "../../actions/automatas";

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

  const handleSave = (automata) => {
    fetch(`http://localhost:3001/automatas/${automataId}`, {
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(automata),
      method: "PUT",
    })
      .then((response) => response.json())
      .then((updatedAutomata) => {
        dispatch(setAutomata(updatedAutomata));
        history.push(`/`);
      });
  };

  return (
    <Automata
      automataId={automataId}
      // defaultAutomata={defaultAutomata}
      img="/img1.png"
      handleSave={handleSave}
    />
  );
}
