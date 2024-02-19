import { useState } from "react"
export default function Signup(){
    [email, setemail ] = useState("")
    const handlechange =(e)=>{
        setemail(e.target.value)
    }
return(
    <>
    <div className="Signup">
       <label for ="email_input" >

    email

       </label>
        <input type = "text" id="email_input" name="email_input" value= {email}onChange={handlechange}/>
        
        
        </div> 
    
    </>

)
}