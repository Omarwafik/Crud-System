import image from './assets/edit.png';
import { useEffect, useRef, useState } from 'react';
import User from './User';

export default function App() {
  const [users, setUsers] = useState([]);
  const [addedUserName, setAddedUserName] = useState('');
  const [addedUserEmail, setAddedUserEmail] = useState('');
  const [addedUserAge, setAddedUserAge] = useState('');
  const [updateUserId, setUpdateUserId] = useState(null);
  const [flag, setFlag] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const formRef = useRef(null);

  function getData() {
    const data = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(data);
  }

  function saveData(newUsers) {
    localStorage.setItem('users', JSON.stringify(newUsers));
    setUsers(newUsers);
  }

  function addUser(e) {
    e.preventDefault();
    if (!addedUserName || !addedUserEmail || !addedUserAge) return;

    if (flag) {
      const updatedUsers = users.map((user) =>
        user.id === updateUserId
          ? { id: updateUserId, name: addedUserName, email: addedUserEmail, age: addedUserAge }
          : user
      );
      saveData(updatedUsers);
    } else {
      const newUser = {
        id: Date.now(), 
        name: addedUserName,
        email: addedUserEmail,
        age: addedUserAge,
      };
      saveData([...users, newUser]);
    }

    setAddedUserName('');
    setAddedUserEmail('');
    setAddedUserAge('');
    setFlag(false);
    setUpdateUserId(null);
  }

  function deleteUser(e, id) {
    e.preventDefault();
    const filtered = users.filter((user) => user.id !== id);
    saveData(filtered);
  }

  function handleEdit(user) {
    setFlag(true);
    setUpdateUserId(user.id);
    setAddedUserName(user.name);
    setAddedUserEmail(user.email);
    setAddedUserAge(user.age);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchUser.toLowerCase())
  );

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <header className="flex p-8 justify-around text-4xl capitalize bg-cyan-700 text-white mb-2 font-semibold">
        <div className="logo text-4xl">
          <i className="fa-solid fa-face-laugh-wink text-amber-300"></i>
          <span className="ms-2">Welcome</span>
        </div>
        <h1 className="">crud System</h1>
      </header>

      <h2 className="text-2xl px-[100px] py-7 bg-blue-900 text-white w-fit mx-auto rounded-2xl m-5">
        General Form For User
      </h2>

      <form
        ref={formRef}
        onSubmit={addUser}
        className="flex justify-around w-[60%] m-auto p-10 bg-emerald-500 rounded-xl"
      >
        <div className="w-[60%]">
          <div className="mb-5">
            <label className="text-cyan-950 font-bold">Name</label> <br />
            <input
              className="input"
              type="text"
              placeholder="Name"
              value={addedUserName}
              onChange={(e) => setAddedUserName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="text-cyan-950 font-bold">Email</label> <br />
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={addedUserEmail}
              onChange={(e) => setAddedUserEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="text-cyan-950 font-bold">Age</label> <br />
            <input
              className="input"
              type="number"
              placeholder="Age"
              value={addedUserAge}
              onChange={(e) => setAddedUserAge(e.target.value)}
            />
          </div>
          {!flag ? (
            <button type="submit" className="add-button">
              Add User
            </button>
          ) : (
            <button type="submit" className="update-button">
              Update User
            </button>
          )}
        </div>
        <img className="object-cover w-[300px] h-[300px]" src={image} alt="" />
      </form>

      <div className="search-input w-3xl bg-blue-950 mx-auto m-10 p-4 text-center rounded-sm">
        <input
          className="p-5 inline-block w-[80%] m-auto bg-white rounded-xl"
          type="text"
          placeholder="Search for User"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </div>

      <div className="w-[90%] mx-auto bg-cyan-700 p-6 m-7">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <User
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                age={user.age}
                onDelete={deleteUser}
                onEdit={handleEdit}
                flag={flag}
              />
            ))
          ) : searchUser.trim() !== '' ? (
            <p className="text-center text-white col-span-3 text-xl">
              No user with this name
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
