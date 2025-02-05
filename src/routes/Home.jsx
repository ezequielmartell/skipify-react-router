import { useEffect, useContext } from "react";
import { useLocation, Navigate, useNavigate, Link } from "react-router-dom";

import Cookies from "universal-cookie"
const cookies = new Cookies();

import LogoutComponent from '../components/buttonLogout';
import AuthorizeComponent from '../components/buttonAuthorize';
import BoycottStateComponent from "../components/componentBoycottState";
import SkipAnotherArtistComponent from "../components/componentSkipAnotherArtist";
import BoycottListComponent from "../components/componentBoycottList";
import PlayerComponent from "../components/componentPlayer";
// import { getSession } from '../utils/Auth';


const url = import.meta.env.VITE_APP_URL


function Home() {
  return (
    <div>
      <h1>Spotify Artist Boycotting Service Home</h1>
      <div className="home-group">
        <div className="home-group-left">
      <div className="button-group">
      <AuthorizeComponent />
      <LogoutComponent />
      </div>
           <BoycottStateComponent />
      <SkipAnotherArtistComponent />
      </div>
      <div className="home-group-right">
      <PlayerComponent />
      <BoycottListComponent />
    </div>
    </div>
    </div>
  )
};

export default Home;
