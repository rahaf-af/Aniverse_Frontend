import React, { useState } from "react"
import axios from "axios"
import { authRequest, getUserFromToken, clearTokens, saveTokens } from "../../../lib/auth"
import { useNavigate } from "react-router"
import './Login.css'
export default function Login({ setUser }) {
  const [formData , setformData]= useState({
    username:'',
    password:''
    })
  const navigate = useNavigate()
  const [errors, seterrors] = useState()
  async function submitHandler(event){
    event.preventDefault()
    try {
      const response  = await axios.post('http://127.0.0.1:8000/api/login/',formData )
      saveTokens(response.data.access,response.data.refresh)
      setUser(getUserFromToken())
      navigate('/')
    } catch (error) {
      console.error(error)
      seterrors(error.response.data.error)
      alert('Login failed')
    }
  }
  function changeHandler(event){
    setformData({...formData, [event.target.name]: event.target.value})
    console.log(formData)
  }
  if (errors){
    return <h3>{errors}</h3>
  }
  return (
    <>
        <h1>Login</h1>
        <div className="loginform">
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="username">Username:</label>
                <input id='username' name='username' value={formData.username} onChange={changeHandler} />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input name="password" id='password' type="password" value={formData.password} onChange={changeHandler} />
              </div>
              <button type="submit">Login</button>
            </form>
        </div>
    </>
  )
}
