import axios from "axios";
import { useState } from "react";

export default function sw() {
  const [sub, setSub] = useState<String>("");
  const [bericht, setBericht] = useState<String>("");

  async function subscribe() {
    let sw = await navigator?.serviceWorker?.ready;
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        "BBZY7Q3KEtZArAAWMLi_qzWHbH4vAoqPpIXnRhmlUaw0PVs1Kt_2fgLhuaVI5i8MWASBKx3d6W6UoH2U3qChw9U",
    });
    setSub(JSON.stringify(push));

    axios
      .post("https://ahwapi.d22nk.nl/subscribe", {
        sub: JSON.stringify(push),
      })
      .then(function (response) {
        if (response.status === 200) {
          setBericht("Subbed");
        } else if (response.status === 500) {
          setBericht("Er ging iets mis");
        }
      })
      .catch(function (error) {
        setBericht("Er ging iets mis");
        console.log(error);
      });
  }
  return (
    <>
      <button onClick={() => subscribe()}>SUB</button>
      {sub}
      <p>Bericht: {bericht} </p>
    </>
  );
}
