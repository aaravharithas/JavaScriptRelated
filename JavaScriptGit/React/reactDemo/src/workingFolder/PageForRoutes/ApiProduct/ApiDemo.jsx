import { useEffect, useState } from "react"
import ApiProductsDetails from "./ApiProductsDetails"
import { useLocation } from "react-router-dom"

function ApiDemo(){
    let [productData,setProductData] = useState([])
    let url = "https://dummyjson.com/products?limit=500"


    function fetchdata(){
        fetch(url).then((res)=>{
            return res.json()
        }).then((data)=>{
            // console.log(data.products)
            setProductData(data.products)
            // console.log("inside fectchdata function : ",productData)
        }).catch(()=>{
            console.log("got error while fetching Products api")
        })
    }

    useEffect(()=>{
        fetchdata()
    },[])

    let itemPerPage = 9;
    let NoOfPages = Math.ceil(productData.length / itemPerPage)
    let paginator = []
    let [current,setCurrent]= useState(0);

    let location = useLocation()
    let backpage = location.state || 0;
    

    if (backpage){
        useEffect(()=>{
            (()=>setCurrent(backpage))()
        },[])};


    let start = current * itemPerPage;
    let end = start + itemPerPage;
    paginator.push(productData.slice(start,end));

    return(
        <>
        <h2>This is API Demo Page</h2>
        <div>
            <button onClick={()=>{setCurrent(0)}} style={{margin:"0.5rem"}} disabled={current===0}>First</button>
            {...Array(NoOfPages).keys().map((el)=>((el>current-3)&& !(el>current)?
                <button onClick={()=>{setCurrent(el)}} style={current===el?{margin:"0.5rem",backgroundColor:"gold"}:{margin:"0.5rem"}}>{el+1}</button>
                :""
            ))}
            {...Array(NoOfPages).keys().map((el)=>((el<current+3)&& !(el<current+1)?
                <button onClick={()=>{setCurrent(el)}} style={current===el?{margin:"0.5rem",backgroundColor:"gold"}:{margin:"0.5rem"}}>{el+1}</button>
                :""
            ))}
            <button onClick={()=>{setCurrent(NoOfPages-1)}} style={{margin:"0.5rem"}} disabled={current===NoOfPages-1}>Last</button>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
            {productData.slice(start,end).map((pd)=>(
                <ApiProductsDetails key={pd.id} id={pd.id} title={pd.title} price={pd.price} image={pd.thumbnail} currentPage={current}/>
            )
            )}
        </div>
        </>
    )
}

export default ApiDemo