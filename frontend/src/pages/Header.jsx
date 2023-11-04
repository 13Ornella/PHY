import React from "react";
import { Link } from "react-router-dom";


export default function Header() {
    return(
      <div>
        <header className='flex pt-9 px-12'>
        <div className='flex'>
    <p className='text-3xl text-blue-950 font-bold 3-xl'> ALTHEA </p>
        </div>
        <div className='px-48 '></div>
        <div className='px-2 flex border border-l border-gray-300 rounded-full  py-2 px-4 shadow-md shadow-gray-500'>
  <div className='px-2'>Offres</div>
  <div className="border border-gray-200 gap-2 "></div>
  <div className='px-2'>Candidatures</div>
  <div className="border border-gray-200 gap-2 "></div>
  <div className='px-2'> <button className=' bg-primary text-white p-1 rounded-full items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
  </button></div>
        </div>
        <div className='px-48 '></div>
  <Link to={'./login'} className=' px-2 flex border border-l border-gray-300 rounded-full  py-2 px-4 shadow-md shadow-gray-500'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>  
  <div className="border border-gray-200 gap-2 "></div>
  <div className='px-2'>
  <div className='bg-primary text-white p-1 rounded-full items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
  </svg> </div> </div>
  </Link>
  </header>
  </div>
    );
}