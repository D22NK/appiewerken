import { useState } from "react";

export default function sw() {
  const [sub, setSub] = useState<String>("");
  async function subscribe() {
    let sw = await navigator?.serviceWorker?.ready;
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        "BBZY7Q3KEtZArAAWMLi_qzWHbH4vAoqPpIXnRhmlUaw0PVs1Kt_2fgLhuaVI5i8MWASBKx3d6W6UoH2U3qChw9U",
    });
    setSub(JSON.stringify(push));
    console.log(JSON.stringify(push));
  }
  return (
    <>
      <button onClick={() => subscribe()}>SUB</button>
      {sub}
    </>
  );
}
