import React from 'react'
import { useState , useEffect} from 'react'
import axios from 'axios'
import { useParams ,useNavigate } from 'react-router'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"
import './ProfileForm.css'

function ProfileForm() {
  const {profileId} = useParams()
  console.log(profileId)
  const navigate = useNavigate()
  const [errors, seterrors] = useState()
  const [formData , setformData]= useState({
      profile_img: '',
      phone_number:'',
      email:'',
      bio:''
    })
  async function getSinglProfile() {
    try{
      const response = await authRequest({method:'get' , url:`http://127.0.0.1:8000/api/profile/${profileId}/`})
      console.log(response)
      console.log(response.data)
      setformData(response.data)
    } catch(error){
      console.log(error)
      seterrors(error.response.data.error)
    }
  }
    useEffect(()=>{
    if(profileId){
      getSinglProfile()
    }},[])
    if (errors){
      return <h3>{errors}</h3>
    }
  function changeHandler(event){
    setformData({...formData, [event.target.name]: event.target.value})
    console.log(formData)
  }
  async function submitHandler(event){
    event.preventDefault()
    const response = await authRequest({method:'put', url:`http://127.0.0.1:8000/api/profile/${profileId}/`, data:formData})
    console.log(response)
    if (response.status){     
      navigate(`/myprofile`)
    }
  }
  return (
    <>
      <h1>Edit my Profile</h1>
      <div className='profileform'>
        <form onSubmit={submitHandler}>
              <div>
                <label htmlFor='profile_img'>profile img Link:</label>
                <input onChange={changeHandler} value={formData.profile_img} id='profile_img' name='profile_img' type='text'/>
              </div>
              <div>
                <label htmlFor='phone_number'>phone number:</label>
                <input onChange={changeHandler} value={formData.phone_number} id='phone_number' name='phone_number' type='text'/>
              </div>
              <div>
                <label htmlFor='email'>Email</label>
                <input onChange={changeHandler} value={formData.email} id='email' name='email' type='text'/>
              </div>
              <div>
                <label htmlFor='bio'>Bio</label>
                <textarea onChange={changeHandler} value={formData.bio} id='bio' name='bio' type='text'/>
              </div>
              <button type='submit' >Edit</button>
        </form>
      </div>
    </>
  )
}
export default ProfileForm