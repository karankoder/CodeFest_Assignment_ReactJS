import React, { useState} from 'react'
import './Signup.css'
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { toast} from 'react-toastify';
export default function Signup() {
   const navigate=useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handlesubmit= async (e)=>{
   e.preventDefault();
    let signupitem={email,password};
    let response =await fetch("https://workoutapi-fjcr.onrender.com/api/user/signup",{
      method:'POST',
      body:JSON.stringify(signupitem),
      headers:{
        "Content-Type": "application/json",
        "accept": "application/json"
      }
    })
    let result=await response.json();
    if(result.error){
      toast.error(result.error,{position:toast.POSITION.TOP_CENTER,autoClose:2000});
      setemail("");
      setpassword("");
   }
   else{
      toast.success("Registered Succesfully",{position:toast.POSITION.TOP_CENTER,autoClose:2000});
      localStorage.setItem("token", result.token); 
      navigate("/WorkoutCard");
   }

  }
  return (
   <>
    <div className="wrapper">
         <div className="title">
            Signup
         </div>
         <form action="#">
            <div className="field">
               <input type="text" value={email} onChange={(e)=>{setemail(e.target.value)}} required/>
               <label>Email Address</label>
            </div>
            <div className="field">
               <input type="password" value={password} onChange={(e)=>{setpassword(e.target.value)}}required/>
               <label>Password</label>
            </div>
            <div className="content">
            </div>
            <div className="field">
               <input type="submit" onClick={handlesubmit} value="Signup"/>
            </div>
            <div className="Login-link">
               Already have an account?  <Link  to="/Login">Login</Link>
            </div>
         </form>
      </div>
    </>
  )
}
