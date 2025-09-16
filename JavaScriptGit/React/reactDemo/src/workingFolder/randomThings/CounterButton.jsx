import { useState } from "react"
import { FaHeart } from "react-icons/fa";

function CounterButton(){
    const [count,setCount] = useState(0);
    const heart = document.querySelector(".heart");
    let randomNum = ()=> Math.floor(Math.random() * 256);
    function changecolor(){
        if (heart){
            let value = `rgb(${randomNum()},${randomNum()},${randomNum()})`;
            heart.style.color = value;
        }
    }
    if (heart){
            heart.style.fontSize = `${count}rem`;
    }
    return (
      <>
        <div style={{display:"flex",flexDirection:"column",flexWrap:"wrap",justifyContent:"center",alignContent:"center"}}>
          <div style={{textAlign:"center"}}>
          <FaHeart
            style={{ color: "red", margin: "0.5rem" }}
            className="heart"
          />
          </div>
          <button onClick={changecolor} style={{margin:"1rem"}}>Change Color</button>
        </div>
        <div style={{textAlign:"center"}}>
        <button onClick={() => setCount((count) => count - 1)} disabled={count < 1} > -
        </button>
        <b style={{ padding: "1rem" }}>{count}</b>
        <button onClick={() => setCount((count) => count + 1)} disabled={count > 9} >+</button>
        </div>
      </>
    );
}


export default CounterButton