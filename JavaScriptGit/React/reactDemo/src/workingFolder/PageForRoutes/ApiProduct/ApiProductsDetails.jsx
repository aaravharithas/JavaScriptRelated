import { Link } from "react-router-dom"
import "../../../App.css"

function ApiProductsDetails({title,price,image,id,currentPage}){
    return(
        <>
        <div style={{border:"2px solid black",padding:"1rem",margin:"1rem",borderRadius:"2rem",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
        <Link to={`/product/${id}`} state={currentPage}><h2 style={{width:"20rem"}} className="link-button">{title}</h2></Link>
        <img src={image} style={{maxHeight:"10rem"}} alt="" />
        <p>Rs. {Math.round(price * 83,2)}</p>
        </div>
        </>
    )
}

export default ApiProductsDetails