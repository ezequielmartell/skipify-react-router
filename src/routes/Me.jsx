
import { useEffect, useContext } from "react";

import { isResponseOk, getAccessToken } from '../utils/Utils';
import { Context } from '../utils/Context';

import Cookies from "universal-cookie"
const cookies = new Cookies();


function Me() {
  const { accessToken, setAccessToken } = useContext(Context);

  useEffect(()=>{ getAccessToken(setAccessToken)}, [])
  
    return <h1>Me</h1>;
};

export default Me;
