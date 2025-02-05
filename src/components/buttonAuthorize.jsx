import { spotifyAuth } from '../utils/Utils';


function AuthorizeComponent() {
    return (
        <button onClick={()=>{window.open(spotifyAuth(),"_self")}}>Authorize Spotify</button>
    )
}

export default AuthorizeComponent;
