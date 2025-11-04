import React from 'react'
import {useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import './Signup.css'
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
      <div className='signupform'>
        <h2>Sign Up</h2>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor='first_name'>First name:</label>
            <input id='first_name' name='first_name' value={formData.first_name} onChange={changeHandler} />
          </div>
          <div>
            <label htmlFor="last_name">Last name:</label>
            <input id='last_name' name='last_name' value={formData.last_name} onChange={changeHandler} />
          </div>
          <div>
            <label htmlFor='username'>Username:</label>
            <input  id='username' name='username' value={formData.username} onChange={changeHandler} />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input id='email' name='email' value={formData.email} onChange={changeHandler} />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input id='password' name='password' type='Password'  value={formData.password} onChange={changeHandler} />
          </div>
          <button type='submit'>Sign Up</button>
        </form>
    </div>
    <Link to= {'/login'}><p>Already have an account?</p></Link>
    </>
  )
}
export default Signup