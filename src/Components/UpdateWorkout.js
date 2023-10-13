import './AddWorkout.css';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AddWorkout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setdata] = useState({
    title: '',
    load: '',
    reps: '',
  });

  const fetchdata = async () => {
    let response = await fetch(`https://workoutapi-fjcr.onrender.com/api/workouts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    let result = await response.json();
    setdata(result);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handlechange = async(e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let item = {
      title: data.title,
      load: parseInt(data.load),
      reps: parseInt(data.reps),
    };
    let response = await fetch(`https://workoutapi-fjcr.onrender.com/api/workouts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'accept': 'application/json',
      },
    });
    let result = await response.json();
    console.log(result);
    if (result.error) {
      toast.error(result.error, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
    } else {
        console.log(result);
      toast.success('Workout Updated Successfully', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
      navigate('/WorkoutCard');
    }
  };

  return (
    <div className="workout__wrapper">
      <div className="container">
        <form className="post" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add your title"
            name="title"
            value={data.title}
            onChange={handlechange}
          />
          <input
            type="number"
            placeholder="Total number of Reps"
            name="reps"
            value={data.reps}
            onChange={handlechange}
          />
          <input
            type="number"
            placeholder="Loads used"
            name="load"
            value={data.load}
            onChange={handlechange}
          />
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWorkout;
