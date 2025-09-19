import { useState } from "react";
import {useForm} from "react-hook-form"

function DemoTest() {
  const [count, setCount] = useState(0);
    let [hide,setHide] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
      } = useForm()
      
      let [members,setMembers] = useState([])
      
      function onsubmit (data){
        console.log(data)
        setMembers([...members,data])
        reset()
        }

  return (
    <>
      <h1>Demo Test</h1>
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => setCount((count) => count - 1)}
          disabled={count < 1}
        >
          {" "}
          -
        </button>
        <b style={{ padding: "1rem" }}>{count}</b>
        <button
          onClick={() => setCount((count) => count + 1)}
          disabled={count > 9}
        >
          +
        </button>
      </div>
      <button style={{margin:"0.5rem"}} onClick={()=>setHide((hide)=>hide = !hide)}>{hide?"Show":"Hide"} Everything</button>
      {/* same as writting <h1>Random Text</h1> */}
      <div style={hide?{display:"none"}:{display:"block"}} className="card">
        {/* Count Button */}
        <h2>Hello React</h2>
      </div>
      {/* next tast */}
      <form action="" onSubmit={handleSubmit(onsubmit)}>
            <label htmlFor="firstname">First Name :</label><br/>
            <input type="text" {...register("firstname",{required:{value:true,message:"This field is required"},
                                                        maxLength:{value:20,message:"Maximum 20 characters allowed"},
                                                        minLength:{value:2,message:"Minimum 2 characters required"}})} id="firstname"/>
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
  );
}

export default DemoTest;
