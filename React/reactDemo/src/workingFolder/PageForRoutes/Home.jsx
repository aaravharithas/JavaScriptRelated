import { Link } from "react-router-dom"
import CounterButton from "../randomThings/CounterButton"
import { useState } from "react"

function Home(){
    let [hide,setHide] = useState(true)
    return(
    <div style={{display:"flex",flexWrap:"wrap",flexDirection:"column",justifyContent:"space-between"}}>
    <h2>Home Page</h2>
    <button style={{margin:"0.5rem"}} onClick={()=>setHide((hide)=>hide = !hide)}>{hide?"Show":"Hide"} Everything</button>
      {/* same as writting <h1>Random Text</h1> */}
      <div style={hide?{display:"none"}:{display:"block"}} className="card">
        {/* Count Button */}
        <CounterButton/>
      </div>
    </div>
    )
}

export default Home