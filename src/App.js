import Login from './Components/Login.js'
import Signup from './Components/Signup.js'
import {  Route, Routes } from "react-router-dom";
import WorkoutCard from './Components/WorkoutCard.js';
import { useNavigate } from "react-router-dom";
import React,{useEffect} from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AddWorkout from './Components/AddWorkout.js';
import UpdateWorkout from './Components/UpdateWorkout.js';
function App() {
  const navigate=useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/Login");
    }
    else{
      navigate("/WorkoutCard");
    }
  }, [])
  
  return (
    <>
    
      <Routes>
      <Route exact path='/' element={<Login></Login>}/> 
        <Route exact path='/Login' element={<Login></Login>}/> 
        <Route exact path='/Signup' element={<Signup></Signup>}/> 
        <Route exact path='/WorkoutCard' element={<WorkoutCard></WorkoutCard>}/>
        <Route exact path='/AddWorkout' element={<AddWorkout></AddWorkout>}/>
        <Route exact path='/UpdateWorkout/:id' element={<UpdateWorkout></UpdateWorkout>}/>
        
      </Routes>
      <ToastContainer limit={2}></ToastContainer>
    </>
    
  );
}

export default App;
