import { Link, Outlet, useLocation } from "react-router-dom";
import Gibberish from "../randomThings/Gibberish";
import ThemeChanger from "../randomThings/ThemeChanger";
import { useDispatch, useSelector } from "react-redux";

function Navigation() {
  let location = useLocation();
  let value = useSelector((state)=>state.cart)
  // let {id} = useParams()
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {/* code from Jibrish.jsx ends here */}
        <Gibberish />
        {/* Current Path */}
        <h3 style={{ textAlign: "center", display: "block" }}>
          Current path is{" "}
          <i style={{ marginLeft: "0.5rem" }}>{location.pathname}</i> .
        </h3>
        {/* Theme Chnager */}
        <ThemeChanger />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-between",
          // padding: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <Link to="/">
            <button style={{ marginLeft: "0.5rem" }}>Home</button>
          </Link>
          <Link to="/about">
            <button style={{ marginLeft: "0.5rem" }}>About</button>
          </Link>
          <Link to="/contact">
            <button style={{ marginLeft: "0.5rem" }}>Contact</button>
          </Link>
          <Link to="/reduxdemo">
            <button style={{ marginLeft: "0.5rem" }}>Redux Demo</button>
          </Link>
          <Link to="/courses">
            <button style={{ marginLeft: "0.5rem" }}>Courses</button>
          </Link>
          <Link to="/apidemo">
            <button style={{ marginLeft: "0.5rem" }}>Products API</button>
          </Link>
          <Link to="/apipost">
            <button style={{ marginLeft: "0.5rem" }}>Posts API</button>
          </Link>
          <Link to="/demotest">
            <button style={{ marginLeft: "0.5rem" }}>Demo Test</button>
          </Link>
        </div>
        <div style={{ padding: "1rem", textAlign: "end" }}>
          <Link to="/register">
            <button style={{ marginRight: "0.5rem" }}>Register</button>
          </Link>
          <Link to="/login">
            <button style={{ marginRight: "0.5rem" }}>Login</button>
          </Link>
          <Link to="/cart">
          <button>Cart (<span style={{color:'gold'}}> {value.length} </span>)</button>
          </Link>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}

export default Navigation;
