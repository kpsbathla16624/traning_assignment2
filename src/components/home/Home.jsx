import React, {  useEffect, useState } from "react";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";

import Blogs from "../blogs/Blogs";

import "firebase/compat/firestore"; 


export default function Home() {
  const [userDetails, setUserDetails] = useState(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(userDetails.name);
      } else {
        console.log("User document does not exist");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (content.trim() === "") {
      setError("Content is required");
      return;
    }

    try {
      const blogData = {
        username: userDetails.name,
        content,
        createdAt: new Date()
      };

      // Add a new document with auto-generated ID to "Blogs" collection
      await addDoc(collection(db, "Blogs"), blogData);

      setSuccess("Blog added successfully!");
      setContent("");
      setError("");
      setIsModalOpen(false); // Close the modal after submission
    } catch (e) {
      console.error(e);
      setError("Error adding blog");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
  
     <div className="bg-gray-500 w-full min-h-screen  relative">
      <div className="fixed top-0 left-0 right-0 z-50 ">
      <Navbar  />

      </div>
      
      <div className="mt-16 "> {/* Adjust content to start below navbar */}
        <Blogs />
   

        <button
          onClick={openModal}
          className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-lg m-2 p-2 py-2 flex items-center justify-center text-xl"
        >
          Add Blog 
        </button>

        {isModalOpen && (

          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <h1>{userDetails.name}</h1>
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
              <h2 className="text-lg font-semibold mb-2">Add a New Blog</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Content:
                  </label>
                  <textarea
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mr-4 px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Add Blog
                  </button>
                </div>
              </form>
              {error && <div style={{ color: "red" }}>{error}</div>}
              {success && <div style={{ color: "green" }}>{success}</div>}
            </div>
          </div>
        )}
      </div>
    </div>

  );
}

