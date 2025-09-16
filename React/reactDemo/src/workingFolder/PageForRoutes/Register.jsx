import { useState } from "react"

function Register(){
    let [formData,setFormData] = useState({firstname:"",lastname:""})

    function handleChange(e){
        let {name,value} = e.target
        console.log("value of formData before change: ",formData)
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
        console.log("value of formData after change: ",formData)
        console.log("value of input: ",e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(formData)
        setFormData({firstname:"",lastname:""})
    }

    return(
        <>
        <h2>This is Register page.</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstname">First Name</label><br />
            <input type="text" name="firstname" onChange={handleChange} value={formData.firstname}/><br />
            <label htmlFor="lastname">Last Name</label><br />
            <input type="text" name="lastname" onChange={handleChange} value={formData.lastname}/><br />
            <br />
            <input type="submit" />
        </form>
        </>
    )
}

export default Register