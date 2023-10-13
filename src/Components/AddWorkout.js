import './AddWorkout.css'
import { useNavigate } from "react-router-dom";
import React, { useState} from 'react'
import { toast} from 'react-toastify';

const AddWorkout = () => {
    const navigate=useNavigate();
    const [title, settitle] = useState("")
    const [reps, setreps] = useState("");
    const [load, setload] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        let item={title:title,load:parseInt(load),reps:parseInt(reps)};
        let response=await fetch("https://workoutapi-fjcr.onrender.com/api/workouts/",{
        method:'POST',
        body:JSON.stringify(item),
        headers:{
        "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("token")}`,
         "accept": "application/json"
        }
        })
        let result=await response.json();
        console.log(result)
        if(result.error){
            toast.error(result.error,{position:toast.POSITION.TOP_CENTER,autoClose:2000});
        }
        else{
            toast.success("Workout Added Successfully",{position:toast.POSITION.TOP_CENTER,autoClose:2000});
            navigate("/WorkoutCard");
        }  
    };
    return (
    <div className="workout__wrapper">
    <div className="container">
      <form className="post">
        <input
          type="text"
          placeholder="Add your title"
          name="title"
            onChange={(e)=>{settitle(e.target.value)}}
        />
        <input
          type="number"
          placeholder="Total number of Reps"
          name="content"
            onChange={(e)=>{setreps(e.target.value)}}
        />
        <input
          type="number"
          placeholder="Loads used"
          name="content"
            onChange={(e)=>{setload(e.target.value)}}
        />
        <button  onClick={handleSubmit} className="btn btn-primary">
            Add
        </button>
      </form>
    </div>
  </div>
  )
}

export default AddWorkout
