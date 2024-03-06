import { useState } from "react"
export default function Signup(){
   const [email, setemail ] = useState("");
   const [password, setpassword ] = useState("");
   const[passfield, setpassfield] = useState("password");

    const handleChange =(e)=>{
        setemail(e.target.value)
    }
    const handlePasswordChange =(e)=>{
        setpassword(e.target.value)
    }
    const handleSubmit =(e)=>{
        setemail("")
        setpassword("")
    }
    const handleShowPassword =(e)=>{
        if(passfield=="password"){
            setpassfield("text")
        }
        else{
            setpassfield("password")
        }
    }
return(
    <>
    <div className="signup">
        <h1>
            create an account
        </h1>
       <label htmlFor ="email_input" >

    email

       </label>
        <input type = "text" id="email_input" name="email_input" value= {email} onChange={handleChange}/>
        <br />
        
        <label htmlFor ="password_input" >

password

   </label>
    <input type = {passfield} id="password_input" name="password_input" value= {password} onChange={handlePasswordChange}/> 
    <br/>
    <input type="submit" value="signup" onClick={handleSubmit}/>  
    <button onClick={handleShowPassword}>
        show password
    </button>
        </div> 
    
    </>

)
}