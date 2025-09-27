import { useDispatch, useSelector } from "react-redux"

function Cart(){
    let value = useSelector((state)=>state.cart)
    let dispatch = useDispatch()
    console.log(value)
    return(
    <>
    <h1>this is Cart Page</h1>
    {value.map((el,index)=>(
        <div key={index} style={{display:"flex",border:"2px solid black",borderRadius:"2rem",padding:"1rem",justifyContent:'space-between',margin:"0.5rem"}}>
            <div>
            <img src={el.thumbnail} alt="" style={{height:"5rem"}} />
            </div>
            <div>
            <h3 style={{margin:"1rem"}}>{el.title}</h3>
            <div style={{display:'flex', justifyContent:"space-between"}}>
                <button>-</button>
                <h3 style={{margin:"0.5rem"}}>Quanitity: {el.quantity}</h3>
                <button>+</button>
            </div>
            </div>
        </div>
    ))}
    </>
    )
}

export default Cart