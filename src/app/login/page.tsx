import React from 'react'
import {    FaLock } from "react-icons/fa";
import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import FormLogin from './Form';
import LoginActions from '../components/LoginActions';






const Login = async()=> {
  const session = await getServerSession(authOptions)
  if (session) {
    return redirect('/')
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center  bg-light p-4">
      <h1 className="text-danger fw-bold mb-4 text-center">
        <FaLock className="me-2" />
        You are not logged in
      </h1>
      <div
        className="bg-white p-5 rounded shadow-lg"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h2 className="section-title px-3 fw-bold">
            <span className="px-2">Login To Your Account</span>
          </h2>
        </div>
        <FormLogin />
      </div>
      <div className="mt-4">
        <LoginActions />
      </div>
    </div>
    </>
  

    
      
  

  )
}
export default Login 
