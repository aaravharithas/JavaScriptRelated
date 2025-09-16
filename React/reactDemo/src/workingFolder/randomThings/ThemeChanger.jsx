import { useState } from "react"
import "../../App.css"
import { FaMoon, FaSun } from "react-icons/fa";


function ThemeChanger(){
    const [day,setDay] = useState(true)
    const body = document.querySelector("body");
    body.style.backgroundColor = day?"#242424":"white"
    body.style.color = !day?"black":"white"
    return (
        <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between",alignContent:"center"}}>
        {/* <button onClick={()=>{ return setDay((day)=>{ return day = !day})}}>{day?"Dark":"Light"} Theme</button> */}
        <div onClick={()=>setDay((day)=>day = !day)} style={{margin:"0.5rem",marginRight:"1rem"}}>{day?<FaSun style={{fontSize:"2rem"}}/>:<FaMoon style={{fontSize:"2rem"}} />}</div>
        <button onClick={()=>setDay((day)=>day = !day)}>{day?"Dark":"Light"} Theme</button>
        </div>
    )
}

export default ThemeChanger