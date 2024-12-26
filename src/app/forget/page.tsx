
"use client"
import React, { useState } from 'react'
import { FaEnvelope } from 'react-icons/fa'
interface Client {

  email: string;


}
export default function Forget() {
  const [formData, setFormData] = useState<Client>({
    email: '',

  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleForget = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {

    } catch (err) {
      console.error('Signin error:', err);
      alert('An error occurred while login in the account.');
    }
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100  bg-light p-4">
      <div className="bg-white p-5 rounded shadow-lg w-100" style={{ maxWidth: "500px" }}>
        <div className="text-center mb-4">
          <h2 className="section-title px-5 fw-bold">
            <span className="px-2">Create Your Account</span>
          </h2>
        </div>
        <form name="createAccountForm" id="createAccountForm" onSubmit={handleForget}>

          <div className="form-group mb-3">
            <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Your Email"
                required
                data-validation-required-message="Please enter your email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
          </div>


          <div className="d-grid gap-3">
            <button className="btn btn-primary py-2 fw-bold" type="submit" id="createAccountButton">
              Submit
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}
