import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

export default function Navbar() {
    const navigate = useNavigate();
    async function handleLogout  ()  {
        try {
          await auth.signOut();
          
          navigate("/login");
          console.log("User logged out successfully!");
        } catch (error) {
          console.error("Error logging out:", error.message);
        }
      }
  return (
    <div className=' md:p-3 p-4  flex bg-gradient-to-r from-slate-300 to-slate-500 justify-evenly'>
      <h1 className='text-3xl text-black '>Tech Blogs</h1>
      <ul className='flex justify-center  lg:w-[70%] md:w-[60%]  lg:text-2xl sm:text-md  items-center text-black md:gap-10 sm:gap-3 lg:gap-30'>
        <li className=''><Link to={"/"}> Home</Link></li>
        <li> <Link to={"/about"}>About </Link></li>
        <li> <Link to={"/profile"}>Profile </Link></li>
      </ul>
      <button onClick={handleLogout} className='bg-red-500  hover:bg-red-900 hover:text-white px-20 lg:py-2 md:py-2 sm:px-1 font-semibold  rounded-lg'> 
        <h1 className='px-4'>
          Log Out
          </h1>
          </button>
    </div>
  );
}
