import { spotifyAuth } from '../utils/Utils';


function AuthorizeComponent() {
    return (<li>
        <button onClick={()=>{window.open(spotifyAuth(),"_self")}}>Authorize Spotify</button>
    </li>)
}

export default AuthorizeComponent;
