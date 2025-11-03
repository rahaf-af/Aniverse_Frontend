import React, { useState } from "react"
import axios from "axios"
import { authRequest, getUserFromToken, clearTokens, saveTokens } from "../../lib/auth"
import { useNavigate } from "react-router"

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
      navigate('/home')
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
        <div className="Login">
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                <input name='username' placeholder="Username" value={formData.username} onChange={changeHandler} />
                <input name="password" type="password" placeholder="Password" value={formData.password} onChange={changeHandler} />
                <button type="submit">Login</button>
            </form>
        </div>
    </>
  )
}
