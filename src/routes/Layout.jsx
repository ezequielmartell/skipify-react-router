import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/me">Me</Link>
          </li>
          <li>
            <Link to="/Spotify.com">code here to perform spotify auth</Link>
          </li>         
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
