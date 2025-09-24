import { Link } from "react-router-dom"
import CounterButton from "../randomThings/CounterButton"
import { useReducer, useRef, useState } from "react"

function Home(){
    let [hide,setHide] = useState(true)
    const colorRef1 = useRef()
    const inputRef = useRef()
    function changecolor(){
      let randomNum = ()=> Math.floor(Math.random() * 256);
      return `rgb(${randomNum()},${randomNum()},${randomNum()})`;
    }
    function handleRef(){
      colorRef1.current.style.color = changecolor()
      inputRef.current.focus()
      inputRef.current.style.color = changecolor()
    }

    function ReducerFunction(initialValueObj,action){
      switch (action.type){
        case "increaseCount1":
          return {...initialValueObj,count1 : initialValueObj.count1+1}
        case "increaseCount2":
          return {...initialValueObj,count2 : initialValueObj.count2+10}
        case "decreaseCount1":
          return {...initialValueObj,count1 : initialValueObj.count1-1}
        case "decreaseCount2":
          return {...initialValueObj,count2 : initialValueObj.count2-10}
        case "resetCount1":
          return {...initialValueObj,count1:5}
        case "resetCount2":
          return {...initialValueObj,count2:50}
      }
    }
    
    let initialValues = {count1:5,count2:50}
    const [InitalVlauesObj,dispatch] = useReducer(ReducerFunction,initialValues)
    // console.log(InitalVlauesObj)
    return(
    <div style={{display:"flex",flexWrap:"wrap",flexDirection:"column",justifyContent:"space-between"}}>
    <h2>Home Page</h2>
    <button style={{margin:"0.5rem"}} onClick={()=>setHide((hide)=>hide = !hide)}>{hide?"Show":"Hide"} Everything</button>
      {/* same as writting <h1>Random Text</h1> */}
      <div style={hide?{display:"none"}:{display:"block"}} className="card">
        {/* Count Button */}
        <CounterButton/>
      </div>
      {/* useRef */}
      <input type="text" ref={inputRef} onChange={()=>(inputRef.current.style.color = changecolor())} style={{backgroundColor:"white",margin:"0.5rem",borderRadius:"15px",height:"1.5rem",color:"black",padding:"0.5rem",fontSize:"1rem",fontWeight:"bolder"}}/>
      <button onClick={handleRef}><b ref={colorRef1}>Change Colour</b></button>
      {/* useRef ends here */}
      {/* reducer */}
      <div style={hide?{display:"none"}:{display:"flex",justifyContent:"space-evenly"}} className="card">
        {/* First Counter Button */}
        <button onClick={()=>{dispatch({type:"decreaseCount1"})}} disabled={InitalVlauesObj.count1 < 1}>-</button>
        <h2>{InitalVlauesObj.count1}</h2>
        <button onClick={()=>{dispatch({type:"increaseCount1"})}} disabled={InitalVlauesObj.count1 > 9}>+</button>
      </div>
      <button onClick={()=>{dispatch({type:"resetCount1"})}} style={hide?{display:"none"}:{display:"block"}}>Reset Counter 1</button>
      {/* second counter */}
      <div style={hide?{display:"none"}:{display:"flex",justifyContent:"space-evenly"}} className="card">
        {/* Count Button */}
        <button onClick={()=>{dispatch({type:"decreaseCount2"})}} disabled={InitalVlauesObj.count2 < 10}>-</button>
        <h2>{InitalVlauesObj.count2}</h2>
        <button onClick={()=>{dispatch({type:"increaseCount2"})}} disabled={InitalVlauesObj.count2 > 90}>+</button>
      </div>
      <button onClick={()=>{dispatch({type:"resetCount2"})}} style={hide?{display:"none"}:{display:"block"}}>Reset Counter 2</button>
      {/* reducer ends here */}
    </div>
    )
}

export default Home