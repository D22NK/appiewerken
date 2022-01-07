import { useState } from "react";
import useConfirm from "../components/ConfirmDialog/useConfirm";

function App() {
  const { confirm } = useConfirm();
  const [message, setMessage] = useState("");
  const showConfirm = async () => {
    const isConfirmed = await confirm(
      "COnfrim",
      "Weet je zeker dat je deze shift wil verwijderen? \n Als je de shift verwijdert is hij vooraltijd weg en niet meer terug te halen."
    );

    if (isConfirmed) {
      setMessage("Confirmed!");
    } else {
      setMessage("Declined.");
    }
  };
  return (
    <div>
      <div>
        <button onClick={showConfirm}>Show confirm</button>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default App;
