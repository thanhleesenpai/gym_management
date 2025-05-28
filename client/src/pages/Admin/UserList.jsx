import { useState, useEffect } from 'react';
import { Heading, User, Loader } from '../../components';
import axios from 'axios';
import {toast} from "react-hot-toast";
import {userImg} from "../../images";
import { BASE_URL } from '../../utils/fetchData';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/auth/get-all-users`);
      if (res.data && res.data.success) {
        console.log(res.data.users);
        setUsers(res.data.users);
      }
      setLoading(false); 
    }
    catch (err) {
      console.log(err);
      toast.error("something went wong in getting all users || internet issue");
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);


  if(loading){
    return <Loader/>
  }

  return (
    <section className='pt-10 bg-gray-900'>
      <Heading name="User List" />
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {users.map((u, i) => (
            <User userImg={userImg} name={u.name} email={u.email} contact={u.contact} city={u.city} i={i} key={i}/>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UserList;