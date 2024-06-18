import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { IoIosPerson } from 'react-icons/io';
import { CiBookmark, CiHeart, CiShare2 } from 'react-icons/ci';
import { BiRepost } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';

export default function Blogs() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const collectionRef = collection(db, 'Blogs');

    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched Data:', newData); // Debugging log
        setData(newData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching data:', error); // Debugging log
        setError(error);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data.length === 0) {
    return <div>No blogs available.</div>;
  }

  return (
    <div className='items-center justify-center flex flex-col'>
      {data.map((item) => (
        <div key={item.id} className='bg-white/30 w-5/12 flex flex-col m-5 rounded-xl p-5'>
          <div className='flex'>
            <div className='rounded-full border flex justify-center items-center h-10 w-10 p-2 mx-2'>
              <IoIosPerson className='text-2xl'/>
            </div>
            <div>
              <h3 className='text-2xl font-semibold'>{item.username}</h3>
              <p className='my-4 text-xl'>{item.content}</p>
            </div>
          </div>
          <div className='flex text-2xl items-center justify-evenly space-x-3 mx-5'>
            <CiHeart/>
            <BiRepost />
            <FaRegComment />
            <CiBookmark />
            <CiShare2 />
          </div>
        </div>
      ))}
    </div>
  );
}
