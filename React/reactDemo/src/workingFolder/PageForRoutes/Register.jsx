import { useState } from "react"
import {useForm} from "react-hook-form"

function Register(){
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  
  const datalist = []
  let [members,setMembers] = useState([])
  
  function onsubmit (data){
    setMembers([...members,data])
    }


    return(
        <>
        <h2>This is Register page.</h2>
        <form action="" onSubmit={handleSubmit(onsubmit)}>
            <label htmlFor="firstname">First Name :</label><br/>
            <input type="text" {...register("firstname",{required:true})} id="firstname"/>
            {errors.firstname && <span style={{color:"red"}}> <small>This field is required</small></span>}
            <br />
            <label htmlFor="lastname">Last Name :</label><br/>
            <input type="text" {...register("lastname",{required:{value:true,message:"This field is required"},
                                                        maxLength:{value:20,message:"Maximum 20 characters allowed"},
                                                        minLength:{value:2,message:"Minimum 2 characters required"}})} id="lastname"/>
            {errors.lastname && <span style={{color:"red"}}> <small>{errors.lastname.message}</small></span>}
            <br />
            <br />
            <input type="submit" />
        </form>
        <div>
            <h2>Members of DataList</h2>
            <h3>Current Members: {members.length}</h3>
            <ul>
            {members.map(({firstname,lastname}, index)=>(
                <li key={index}>{firstname} {lastname}</li>
            ))}
            </ul>
        </div>
        </>
    )
}

export default Register