import React, { useEffect,useState } from 'react'

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const backendUrl = "http://localhost:5000";


  useEffect(()=>{
  
  

  })

  const fetchdata= async ()=>{
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const getgroups= await axios.get(`${backendUrl}/groups/getgroups`, {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      
    });
  }
  return (
    <div>
      <h1>Groups</h1>
    </div>
  )
}

export default Groups
