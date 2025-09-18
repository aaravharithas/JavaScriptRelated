import { useState } from "react"

function Register(){
    let [formData,setFormData] = useState({firstname:"",lastname:""})

    function handleChange(e){
        let {name,value} = e.target
        // console.log("value of formData before change: ",formData)
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
        // console.log("value of formData after change: ",formData)
        // console.log("value of input: ",e.target.value)
    }
    let [errors,setErrors] = useState({})
    function validate(){
        let newError = {}
        if (!formData.firstname.trim()){
            newError.err = 'name is required'
        }
        else if(formData.firstname.trim().length < 3){
            newError.err = "length of name must be greater than 2."
        }
        else if(formData.firstname.trim().length > 15){
            newError.err = "length of name must be less than 15."
        }
        setErrors(newError)
        return Object.keys(errors).length == 0;
    }

    function handleSubmit(e){
        e.preventDefault()
        if (validate()){
        console.log(formData)
        setFormData({firstname:"",lastname:""})
        }
    }
    console.log("Error are: ",errors)

    return(
        <>
        <h2>This is Register page.</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstname">First Name</label><br />
            <input type="text" id="firstname" name="firstname" onChange={handleChange} value={formData.firstname}/>{errors && <span style={{color:"red",margin:"0.5rem"}}>{errors.err}</span>}
            <br />
            <label htmlFor="lastname">Last Name</label><br />
            <input type="text" id="lastname" name="lastname" onChange={handleChange} value={formData.lastname}/><br />
            <br />
            <input type="submit" />
        </form>
        </>
    )
}

export default Register