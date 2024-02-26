import { useState } from "react"
export default function Preferences(){
   const [email, setemail ] = useState("")
    const handlechange =(e)=>{
        setemail(e.target.value)
    }
return(
    <>
    <div className="Preferences">
       <label for ="email_input" >

    email

       </label>
        <input type = "text" id="email_input" name="email_input" value= {email}onChange={handlechange}/>
        
        
        </div> 
    
     </>

)
}