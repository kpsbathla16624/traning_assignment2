import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        console.log("User document does not exist");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  console.log(userDetails);
  return (
    <>
      <Navbar />
      <div className="flex justify-center bg-gray-500 min-h-screen h-full w-full">
        <div className="h-96 w-7/12 m-10 bg-white/20 font-semibold space-y-6 text-xl backdrop-blur-2xl flex-col items-center justify-evenly flex border rounded-2xl">
          <h1 className="text-4xl font-bold">Profile </h1>
          <div className="flex text-3xl">
            <h1 className="mx-3">Username:  </h1>
            <h1>{userDetails ?  userDetails.name : "Loading..."}</h1>
          </div>
          <div className="flex text-3xl">
            <h1 className="mx-3">Email:  </h1>
            <h1>{userDetails ?  userDetails.email : "Loading..."}</h1>
          </div>
          
        </div>
      </div>
    </>
  );
}
