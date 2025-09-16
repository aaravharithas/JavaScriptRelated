import { Link, Outlet, useLocation } from "react-router-dom";
import Gibberish from "../randomThings/Gibberish";
import ThemeChanger from "../randomThings/ThemeChanger";

function Navigation() {
    let location = useLocation()
    // let {id} = useParams()
  return (
    <>
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between"}}>
      {/* code from Jibrish.jsx ends here */}
        <Gibberish/>
      {/* Theme Chnager */}
        <ThemeChanger/>
      </div>
    
    <div style={{display:"flex",flexWrap:"wrap",flexDirection:"row",justifyContent:"space-between",padding:"1rem"}}>
          <h3 style={{textAlign:"center"}}>
            Current path is <i style={{marginLeft:"0.5rem"}}>{location.pathname}</i> .
          </h3>
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",padding:"1rem"}}>
        <Link to="/">
          <button style={{ marginLeft: "0.5rem" }}>Home</button>
        </Link>
        <Link to="/about">
          <button style={{ marginLeft: "0.5rem" }}>About</button>
        </Link>
        <Link to="/contact">
          <button style={{ marginLeft: "0.5rem" }}>Contact</button>
        </Link>
        <Link to="/courses">
          <button style={{ marginLeft: "0.5rem" }}>Courses</button>
        </Link>
        <Link to="/apidemo">
          <button style={{ marginLeft: "0.5rem" }}>Products API</button>
        </Link>
      </div>
      <div style={{padding:"1rem", textAlign:"end"}}>
        <Link to='/register'><button style={{marginRight:"0.5rem"}}>Register</button></Link>
        <Link to='/login'><button style={{marginRight:"0.5rem"}}>Login</button></Link>
        <button>Cart</button>
      </div>
    </div>
      <div style={{display:"flex",flexWrap:"wrap",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"1rem"}}>
        <Outlet/>
      </div>
    </>
  );
}

export default Navigation;
