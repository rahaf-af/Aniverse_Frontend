import React from 'react'
import { useState , useEffect} from 'react'
import axios from 'axios'
import { useParams ,useNavigate } from 'react-router'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"
import './ContactForm.css'
function ContactForm() {
  const navigate = useNavigate()
  const [errors, seterrors] = useState()
  const [formData , setformData]= useState({
    full_name : '',
    email:'',
    subject: '',
    message:''
  })
    if (errors){
      return <h3>{errors}</h3>
    }
    async function submitHandler(event){
        event.preventDefault()
        const response = await authRequest({method:'post', url: 'http://127.0.0.1:8000/api/contact/' , data:formData})  
        console.log(response)
        if (response.status === 201 ){     
            navigate('/home')
        }
    }
    function changeHandler(event){
    setformData({...formData, [event.target.name]: event.target.value})
    console.log(formData)
  }
  return (
    <>
        <h1>Contac us</h1>
      <div className='contacform'>
        <form onSubmit={submitHandler}>
          <div>
              <label htmlFor='full_name'>full name: </label>
              <input onChange={changeHandler} value={formData.full_name} id='full_name' name='full_name' type='text'/>
          </div>
          <div>
              <label htmlFor='email'>Email:</label>
              <input onChange={changeHandler} value={formData.email} id='email' name='email' type='text'/>
          </div>
          <div>
              <label htmlFor='subject'>Subject:</label>
              <input onChange={changeHandler} value={formData.subject} id='subject' name='subject' type='text'/>
          </div>
          <div>
              <label htmlFor='message'>Message:</label>
              <textarea onChange={changeHandler} value={formData.message} id='message' name='message' type='text'/>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default ContactForm

