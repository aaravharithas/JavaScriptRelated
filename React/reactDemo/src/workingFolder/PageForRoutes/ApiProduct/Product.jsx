import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import ProductComments from "./ProductComments"
import { useDispatch, useSelector } from "react-redux"
import { add, addQuantity } from "./cartSlicer/cartSlicer"

function Product(){
    // for cart
    let value = useSelector((state)=>state.cart)
    let dispatch = useDispatch()
    // for cart ends here

    // for going back to the previous page
    let location = useLocation()
    let currentPage = location.state || "";
    let navigate = useNavigate()
    // previous page code end
    let {id} = useParams()
    let [ProductInfo,setProductInfo] = useState([])

    let url = `https://dummyjson.com/products/${id}`

    function fetchProduct(){
        fetch(url).then((res)=>{
            return res.json()
        }).then((data)=>{
            // console.log(data)
            setProductInfo(data)
        }).catch(()=>{
            console.log("got error while fetching Product Info")
        })
    }

    // fetchProduct()
    useEffect(()=>{
        fetchProduct()
    },[])

    // let title = ProductInfo.title;
    // let description = ProductInfo.description;
    // let image = ProductInfo.thumbnail;
    // let reviews = ProductInfo.reviews;
    // reviews =  Array(reviews)
    let {title, description, thumbnail:image, reviews} = ProductInfo
    function handleCart(data){
        if(value.find(el=>el.id===data.id)){
            dispatch(addQuantity(data));
        }
        else{
            dispatch(add({...data,"quantity":1}))
        }
    }

    return(
        <>
        <h1>{title}</h1>
        <p>Product id : <b>{id}</b>
            <button style={{margin:"1rem"}} onClick={()=>navigate("/apidemo",{state:currentPage})}>Back</button>
            <button onClick={()=>{handleCart(ProductInfo)}}>Add to Cart</button>

        </p>
        <div style={{display:"flex",flexWrap:"wrap",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <img src={image} alt="" style={{maxWidth:"30rem"}}/>
            <p style={{maxWidth:"40rem", fontSize:"1.25rem",textAlign:"center"}}>{description}</p>
            { reviews && <div>
                {reviews.map((el,index)=>(
                    <ProductComments key={index} comment={el.comment} author={el.reviewerName} />
                ))}
            </div>}
        </div>
        </>
    )
}

export default Product