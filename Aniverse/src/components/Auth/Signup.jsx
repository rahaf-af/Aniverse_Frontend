import React from 'react'
import {useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'

function Signup() {
  const [formData , setformData]= useState({
    first_name: '',
    last_name:'',
    username:'',
    email:'',
    password:''
    })
  const navigate = useNavigate()
  async function submitHandler(event){
    event.preventDefault()
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/',formData )
      console.log(response.data)
      navigate('/login')
    } catch (error) {
      console.error(error)
      alert('Signup failed')
    }
  }
  
  function changeHandler(event){
    setformData({...formData, [event.target.name]: event.target.value})
    console.log(formData)
  }
  return (
    <>
      <div className='signup'>
        <h2>Sign Up</h2>
        <form onSubmit={submitHandler}>
          <input name='first_name' placeholder='First name' value={formData.first_name} onChange={changeHandler} />
          <input name='last_name' placeholder='Last name' value={formData.last_name} onChange={changeHandler} />
          <input name='username'placeholder='Username' value={formData.username} onChange={changeHandler} />
          <input name='email'placeholder='Email' value={formData.email} onChange={changeHandler} />
          <input name='password' type='Password' placeholder='Password' value={formData.password} onChange={changeHandler} />
          <button type='submit'>Sign Up</button>
        </form>
    </div>
    <Link to= {'/login'}><p>Already have an account?</p></Link>
    </>
  )
}
export default Signup