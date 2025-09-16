import { Outlet, useNavigate } from "react-router-dom"

function Courses(){
    let navigate = useNavigate()
    return(
        <>
        <h2>Courses Page</h2>
        <div>
            <button style={{marginLeft:"0.5rem"}} onClick={()=>{navigate("python")}}>Python</button>
            <button style={{marginLeft:"0.5rem"}} onClick={()=>{navigate("java")}}>Java</button>
            <button style={{marginLeft:"0.5rem"}} onClick={()=>{navigate("cpp")}}>C++</button>
            <button style={{marginLeft:"0.5rem"}} onClick={()=>{navigate("javascript")}}>Javascript</button>
        </div>
        <Outlet/>
        </>
    )
}

export default Courses