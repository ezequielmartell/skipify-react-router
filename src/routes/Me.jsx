
import { useEffect, useContext, useState } from "react";

import { isResponseOk, getAccessToken, pollSpotifyMe } from '../utils/Utils';
import { Context } from '../utils/Context';

import Cookies from "universal-cookie"
const cookies = new Cookies();

// setInterval(pollSpotifyMe(accessToken), 1000);

function Me() {
  // const [accessToken, setAccessToken] = useState(''); 
  const { accessToken, setAccessToken } = useContext(Context);

  useEffect(() => { getAccessToken(setAccessToken) }, [])
  useEffect(() => { pollSpotifyMe(accessToken) }, [accessToken])

  return (
    <div>
      <h1>Me</h1>
      
    </div>
  );
};

export default Me;
