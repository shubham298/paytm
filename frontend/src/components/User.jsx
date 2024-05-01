import { useState } from "react";
import Button from "./Button";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function Users() {

  const [users, setUsers] = useState([{
}]);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
        .then(response => {
            setUsers(response.data.user)
        })
}, [filter])

  return (
    <div>
      <div className="flex flex-col">
        <div className="font-bold p-2">Users</div>
        <div className="p-2">
          <input
            className="w-full px-2 py-1 border rounded border-slate-200"
            type="text"
            onChange={(e)=> {
              setFilter(e.target.value)
            }}
            placeholder="Search Users..."
          />
        </div>
      <div>
        { users?.length ? users.map((user, i) => <User key={i} user={user}></User>) : (<div></div>)}
      </div>
      </div>
    </div>
  );
}



function User({user}) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between ">
    <div className="flex">
      <div className="flex flex-col justify-center h-full">
      
        <img
          src="https://lh3.googleusercontent.com/ogw/AF2bZyiDN7Lpe0RRKf-3OH5hwz1pFIDJ1NLveory-kdh4Q7m2kQ=s64-c-mo"
          className="rounded-full w-12 h-12"
        ></img>
      </div>

      <div className="flex flex-col justify-center h-full ml-4 mt-2 text-lg">
        {user.firstName} {user.lastName}
      </div>
    </div>

    <div className="flex flex-col justify-center h-full">
    <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
    </div>
  </div>
  )
  
}