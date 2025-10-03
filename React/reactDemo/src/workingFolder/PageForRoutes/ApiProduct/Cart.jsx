import { useDispatch, useSelector } from "react-redux";
import {
  decQuantity,
  deleteCartItem,
  incQuantity,
} from "./cartSlicer/cartSlicer";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  let value = useSelector((state) => state.cart);
  let dispatch = useDispatch();
  let navigate = useNavigate()
  // console.log(value)
  return (
    <>
      {value.length ? (
        <>
          <h1>this is Cart Page</h1>
          {value.map((el, index) => (
              <div key={index} style={{display:"flex",width:"50%",border:"2px solid black",borderRadius:"2rem",padding:"1rem",justifyContent:'space-between',alignItems:"center",margin:"0.5rem"}}>
                <div>
                <img src={el.thumbnail} alt="" style={{height:"8rem"}} />
                </div>
                <div>
                <h3 onClick={()=>{navigate(`/product/${el.id}`)}} style={{margin:"1rem"}}>{el.title} ({Math.round(el.price * 83 * 100)/100} Rs.)</h3>
                <p style={{textAlign:"center"}}>Total Price: {Math.round(el.price * el.quantity * 83 * 100)/100} Rs.</p>
                <div style={{display:'flex', justifyContent:"space-between"}}>
                    <button onClick={()=>{dispatch(decQuantity(el.id))}} style={{margin:"0.5rem"}}>-</button>
                    <span style={{margin:"0.5rem",textAlign:"center",fontWeight:"bolder"}}>Quanitity: {el.quantity}</span>
                    <button onClick={()=>{dispatch(incQuantity(el.id))}} style={{margin:"0.5rem"}}>+</button>
                    <button onClick={()=>{dispatch(deleteCartItem(el.id))}} style={{backgroundColor:"red",margin:"0.5rem"}}><MdDelete  style={{fontSize:"1.5rem"}}/></button>
                </div>
                </div>
            </div>
          ))}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                margin: "0 auto",
                marginTop: "1rem",
                border: "2px solid #ccc",
                borderRadius: "2rem",
                padding: "1rem",
              }}
            >
              <div
                style={{ display: "flex", padding: "10px", fontWeight: "bold" }}
              >
                <div style={{ flex: 1 }}>Item</div>
                <div style={{ flex: 1 }}>Price</div>
                <div style={{ flex: 1 }}>Quantity</div>
                <div style={{ flex: 1 }}>After Price</div>
                <div style={{ flex: 1 }}>CGST 9%</div>
                <div style={{ flex: 1 }}>SGST 9%</div>
                <div style={{ flex: 1 }}>Total</div>
              </div>

              {value.map((el, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    padding: "10px",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <div style={{ flex: 1 }}>{el.title}</div>
                  <div style={{ flex: 1 }}>
                    {Math.round(el.price * 83 * 100) / 100} Rs.
                  </div>
                  <div style={{ flex: 1 }}>{el.quantity} unit</div>
                  <div style={{ flex: 1 }}>{Math.round(el.quantity * el.price * 83 * 100)/100} Rs.</div>
                  <div style={{ flex: 1 }}>
                    {Math.round(el.price * 83 * 0.09 * 100) / 100} Rs.
                  </div>
                  <div style={{ flex: 1 }}>
                    {Math.round(el.price * 83 * 0.09 * 100) / 100} Rs.
                  </div>
                  <div style={{ flex: 1 }}>
                    {Math.round(el.price * 83 * el.quantity * 1.18 * 100) / 100}{" "}
                    Rs.
                  </div>
                </div>
              ))}

              <div
                style={{ display: "flex", padding: "10px", fontWeight: "bold" }}
              >
                <div style={{ flex: 5 }}>Sub Total</div>
                <div style={{ flex: 1 }}>
                  {Math.round(value
                    .map((el) => {
                      return (
                        el.price * 83 * el.quantity * 1.18
                      );
                    })
                    .reduce((sum, el) => {
                      return (sum += el);
                    }, 0) *100)/100}{" "}
                  Rs.
                </div>
              </div>
            </div>
        </>
      ) : (
        <h2>Your cart is empty</h2>
      )}
    </>
  );
}

export default Cart;
