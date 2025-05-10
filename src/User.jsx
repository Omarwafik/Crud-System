export default function User({id,name,email,age,onDelete , onEdit ,flag}) {

  return (
    <>
        
            <div className="user-item p-5 bg-black text-white text-[18px] rounded-xl capitalize">
                <p className="p-3">ID : {id}</p>
                <p className="p-3">Name : {name}</p>
                <p className="p-3">Email :{email} </p>
                <p className="p-3">Age : {age}</p>
                <div className="buttons flex gap-2">
                        <button onClick={(e)=>{
                            e.preventDefault();
                            onEdit({id,name,email,age ,flag})
                            
                        }}  className="bg-blue-600 p-3 rounded-xl hover:cursor-pointer hover:bg-blue-500 transition duration-400">Update</button>
        
                           <button onClick={(e)=>onDelete(e,id)} className="bg-red-700 p-3 rounded-xl hover:cursor-pointer hover:bg-red-500 transition duration-400">Delete</button>
                </div>
            </div>
       
    </>
  )
}
