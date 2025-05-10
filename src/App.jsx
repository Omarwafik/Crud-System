import axios from "axios"
import image from './assets/edit.png'
import { useEffect, useState } from "react";
import User from "./User";
import { useRef } from "react";

export default function App() {
  let [users , setUser] = useState([]);
  let [allUsers , setAllUser] = useState([]);
  let[addedUserName , setAddedUserName] =useState("");
  let[addedUserEmail , setAddedUserEmail] =useState("");
  let[addedUserAge , setAddedUserAge] =useState("");
  let[updateUserId , setUpdatedUserID] =useState("");
  let [flag ,setFlag] = useState(false);
  let[searchUser , setSearchUser] =useState("");
  const formRef = useRef(null);
  // let[updateUserName , setUpdatedUserName] =useState("");
  // let[updateUserEmail , setUpdatedUserEmail] =useState("");
  // let[updateUserAge , setUpdatedUserAge] =useState("");
  
  async function getData(){
    const res = await axios.get("http://localhost:6001/users")
    setUser(res.data)
    setAllUser(res.data);
  }
  
  async function addUser(event , id){
    event.preventDefault();
    if(flag){
        await axios.put(`http://localhost:6001/users/${id}`, {name : addedUserName =="" ? users.name : addedUserName,
      email : addedUserEmail =="" ? users.email : addedUserEmail,
      age : addedUserAge =="" ? users.age : addedUserAge
     })
    }
    else{
      await axios.post("http://localhost:6001/users", {
        name: addedUserName,
        email: addedUserEmail,
        age: addedUserAge
      });
    }
    setAddedUserAge("")
    setAddedUserEmail("")
    setAddedUserName("")
    getData()
  } 

  useEffect(()=>{
    if(searchUser.trim() === "")
    {
      getData()
    }else{
      const filtered = allUsers.filter((user)=>
        user.name.toLowerCase().includes(searchUser.toLowerCase())
      )
      setUser(filtered);
    }
  },[allUsers, searchUser])
  
  async function deleteUser(event,id){
    event.preventDefault();
    await axios.delete(`http://localhost:6001/users/${id}`)
    getData();
  }

  // async function updatedUser(event,id){
  //   event.preventDefault();
  //   await axios.put(`http://localhost:6001/users/${id}`, {name : updateUserName =="" ? users.name : updateUserName,
  //     email : updateUserEmail =="" ? users.email : updateUserEmail,
  //     age : updateUserAge =="" ? users.age : updateUserAge
  //    })
  //      setUpdatedUserAge("");
  //     setUpdatedUserID("");
  //     setUpdatedUserName("");
  //     setUpdatedUserEmail("");
  //     getData();

  // }

  function handleEdit(user) {
    setFlag(true);
    setUpdatedUserID(user.id);
    setAddedUserName(user.name);
    setAddedUserEmail(user.email);
    setAddedUserAge(user.age);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
}
// let flag =false;

  return (
    <>
    <header className="flex p-8 justify-around text-4xl capitalize bg-cyan-700 text-white mb-2 font-semibold">
      <div className="logo text-4xl "><i className="fa-solid fa-face-laugh-wink text-amber-300"></i><span className="ms-2">Welcome</span></div>
      <h1 className=" ">crud System</h1>
    </header>

    <h2 className="text-2xl px-[100px] py-7 bg-blue-900 text-white w-fit mx-auto rounded-2xl m-5">General Form For User</h2>

      <form ref={formRef}  onSubmit={(e)=>addUser(e,updateUserId)} className="flex justify-around w-[60%] m-auto p-10 bg-emerald-500 rounded-xl">
        <div className="w-[60%]">
        <div className=" mb-5">
          <label className="text-cyan-950 font-bold">Name</label> <br />
          <input className="input" type="text" placeholder="Name"  value={addedUserName} onChange={(e)=>{setAddedUserName(e.target.value)}} required/>
        </div>
        <div className=" mb-5">
          <label className="text-cyan-950 font-bold">Email</label> <br />
          <input className="input" type="email" placeholder="Email" value={addedUserEmail} onChange={(e)=>{setAddedUserEmail(e.target.value)}} required/>
        </div>
        <div className=" mb-5">
          <label className="text-cyan-950 font-bold">Age</label> <br />
          <input className="input" type="number" placeholder="Age" value={addedUserAge} onChange={(e)=>{setAddedUserAge(e.target.value)}} required/>
        </div>
        {
          !flag ? <button type="submit" className="add-button " >Add User</button> :<button type="submit" className="update-button" >Update User</button>
        }
        </div>
      <img className="object-cover w-[300px] h-[300px]" src={image} alt="" />
      </form>


        <div className="search-input w-3xl bg-blue-950 mx-auto m-10 p-4 text-center rounded-sm">
          <input className="p-5 inline-block w-[80%] m-auto bg-white rounded-xl" type="text" id="" placeholder="Search for User" value={searchUser} onChange={(e)=>setSearchUser(e.target.value)} />
        </div>


    <div className="w-[90%] mx-auto bg-cyan-700 p-6 m-7">
        <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-3  ">
            {
              users.length>0 ? 
              users.map((user)=>{
                return <User id={user.id} name={user.name} email={user.email} age={user.age} onDelete={deleteUser} onEdit={handleEdit} flag={flag}/>
              }) :  searchUser.trim() !== "" ?  <p className="text-center text-white col-span-3 text-xl">No user with this name</p> : null }
            
        </div>
    </div>

{/* 
        <form onSubmit={(e)=>{updatedUser(e,updateUserId)}} className="w-[40%] mx-auto p-10 bg-amber-200 rounded-xl  m-8">
          <h1 className="text-center p-5 text-2xl">Update user</h1>
        
          <input className="input mb-5" type="text" placeholder="Update Name" value={updateUserName} onChange={(e)=>{setUpdatedUserName(e.target.value)}} required/>
          <br />
          <input className="input mb-5" type="email" placeholder="Update Email" value={updateUserEmail} onChange={(e)=>{setUpdatedUserEmail(e.target.value)}} required/>
          <br />
          <input className="input mb-5" type="number" placeholder="Update Age" value={updateUserAge} onChange={(e)=>{setUpdatedUserAge(e.target.value)}} required/>
          <button className="block bg-black text-white mt-10 px-7 py-3 rounded-2xl w-fit  mx-auto border-4 border-transparent hover:border-4 hover:border-blue-700  transition duration-500" type="submit">Update</button>
        </form> */}
    </>
  )
}
