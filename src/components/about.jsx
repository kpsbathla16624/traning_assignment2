import React from 'react'
import Navbar from './navbar'

export default function About() {
  return (
    <>
      <Navbar/>
    <div className='flex   justify-center bg-gray-500 min-h-screen  h-full w-full  '>
      <div className='h-96 w-7/12 m-10 bg-white/20 font-semibold text-xl backdrop-blur-2xl   flex-col items-center   justify-center flex border  rounded-2xl' >
      <h1 className='m-3  '>  This project is made as Assignnment no.2  for Inhouse training Chandigarh Universisty</h1>
      <h1 className='m-3  '>  Name : Kamal Preet Singh </h1>
      <h1 className='m-3  '>  UID : 22BCS16624  </h1>
      <h1 className='m-3  '>  Section: 22BCS_KRG_IOT3 </h1>
      <h1 className='m-3  '>  </h1>
      </div>
    </div>
    </>
  )
}
