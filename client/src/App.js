
import { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';
import axios from 'axios';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {

  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0);
  const [newFoodName, setNewFoodName] = useState('')

  const [foodList, setFoodList] = useState([])

  useEffect(()=>{
    Axios.get("http://localhost:3001/read").then((response)=>{
      setFoodList(response.data);
      
    })

  },[])

  const addToList = () =>{
    window.location.reload();
    axios.post("http://localhost:3001/insert",{
      foodName: foodName,
      days:days,

    });
   };

   const updateFood = (id) =>{
    window.location.reload();
     Axios.put("http://localhost:3001/update",{
       id: id,
       newFoodName: newFoodName,
      })
   }

   const deleteFood = (id) =>{
    window.location.reload();
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }
  
  return <div className = "App">
    <h1 className="h1">CRUD APP WITH MERN</h1>


    <label className="lbl1">Fruit Name:</label>
    <input type= "text" 
      onChange={(event)=>{
      setFoodName(event.target.value)
      }}/>

    <label className="lbl1">Day Scince You Ate It:</label>
    <input type = "number"
     onChange={(event)=>{
      setDays(event.target.value)
      }}/>

    <button className="btn1" onClick={addToList}>Add To List</button>

    <h1> Fruit List</h1>
    {foodList.map((val, key)=>{
      return <div key = {key} className="food"> 
      <h1>{val.foodName} </h1> <h1>{val.daysSinceIAte} </h1> 

      <input type="text" placeholder="New Fruit Name..."
      onChange={(event)=>{
        setNewFoodName(event.target.value)
        }}/>

      <button  className="btn2" onClick = {()=>updateFood(val._id)}>Update</button>
      <br/>

      <button  className="btn3" onClick = {()=>deleteFood(val._id)}>Delete</button>
      </div>
    })}
   
    
    </div>

}

export default App;
