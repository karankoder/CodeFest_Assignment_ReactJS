import React, { useState} from 'react'
import './Login.css'
import {Link} from 'react-router-dom';
import { toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
export default function Login() {
   const navigate=useNavigate();
   const [email, setemail] = useState("");
   const [password, setpassword] = useState("");

   const handlesubmit= async (e)=>{
      e.preventDefault();
      let loginitem={email,password};
      let response=await fetch("https://workoutapi-fjcr.onrender.com/api/user/login",{
      method:'POST',
      body:JSON.stringify(loginitem),
      headers:{
        "Content-Type": "application/json",
        "accept": "application/json"
      }
      })
      let result=await response.json();
      if(result.error){
         toast.error(result.error,{position:toast.POSITION.TOP_CENTER,autoClose:2000});
         setpassword("");
         setemail("");
      }
      else{
         toast.success("Logged in Succesfully",{position:toast.POSITION.TOP_CENTER,autoClose:2000});
         localStorage.setItem("token", result.token); 
         navigate("/WorkoutCard");
      }
   }


  return (
    <>
    <div className="wrapper">
         <div className="title">
            Login
         </div>
         <form action="#">
            <div className="field">
               <input type="text" value={email} onChange={(e)=>{setemail(e.target.value)}}  required/>
               <label>Email Address</label>
            </div>
            <div className="field">
               <input type="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} required/>
               <label>Password</label>
            </div>
            <div className="content">
            </div>
            <div className="field">
               <input onClick={handlesubmit} type="submit" value="Login"/>
            </div>
            <div className="signup-link">
               Not a member? <Link  to="/Signup">Signup now</Link>
            </div>
         </form>
      </div>
    </>
  )
}
