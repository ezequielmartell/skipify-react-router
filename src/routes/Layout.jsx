import { Outlet, Link } from "react-router-dom";
// import { LargeMenu } from "../components/LargeMenus";
// import { SmallMenu } from "../components/SmallMenu";

function Layout() {
  return (
    <>
      <nav>
        <ul>
          {/* if isAuthenticated ? large menu : small menu */}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/me">Me</Link>
          </li>        
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
