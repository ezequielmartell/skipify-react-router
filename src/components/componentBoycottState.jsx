import { useContext, useEffect } from "react";
import { Context } from '../utils/Context';

import { isResponseOk } from '../utils/Utils';

import Cookies from "universal-cookie"
const cookies = new Cookies();

const url = import.meta.env.VITE_APP_URL

function BoycottStateComponent() {
  const { boycottState, setBoycottState } = useContext(Context);

  function handleBoycott(toggle) {

    fetch(`${url}/api/boycott/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: import.meta.env.PROD ? "same-origin" : "include",
      body: JSON.stringify({ boycott: toggle }),
    })
      .then(isResponseOk)
      .then((data) => {
        console.log(data);
        setBoycottState(data.boycott)
      });
  }

  async function getBoycottState() {
    await fetch(`${url}/api/boycott/`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: import.meta.env.PROD ? "same-origin" : "include",
    })
      .then(isResponseOk)
      .then((data) => {
        // console.log(data);
        setBoycottState(data.boycott)
      });
  }
  useEffect(() => { getBoycottState() }, [])

  return (
    <label className="boycott-state">
      Service Enabled: {String(boycottState)}&nbsp;
      <button onClick={() => handleBoycott(!boycottState)}>Toggle</button>
    </label>
  )
}

export default BoycottStateComponent;