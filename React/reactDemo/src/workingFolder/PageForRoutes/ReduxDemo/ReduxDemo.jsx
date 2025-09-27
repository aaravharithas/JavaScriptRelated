import { useSelector, useDispatch } from 'react-redux'
import { counterSlice, decrement, increment, incrementByAmount, reset } from './slicer/CountSlice'
import { useRef, useState } from 'react';

function ReduxDemo(){
  const count = useSelector((state) => state?.counter?.value)
    let [addvalue,setAddvalue] = useState(0)
  const dispatch = useDispatch()
    return(
        <div>
        <div style={{textAlign:"center"}}>
        <button onClick={() => dispatch(decrement())} disabled={count < 1} >-</button>
        <b style={{ padding: "1rem" }}>{count}</b>
        <button onClick={() => dispatch(increment())} disabled={count > 9} >+</button>
        <button onClick={()=>{dispatch(reset())}}  style={{margin:"1rem"}}>Reset</button>
        </div>
        
      <div>
        <input type="number" onChange={(e)=>{setAddvalue(Number(e.target.value))}} style={{margin:"1rem"}}/>
        <button onClick={()=>{dispatch(incrementByAmount(addvalue))}}>Add</button>
      </div>
    </div>
    )
}

export default ReduxDemo