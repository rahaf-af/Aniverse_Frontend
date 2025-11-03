import React from 'react'
import { useState , useEffect} from 'react'
import axios from 'axios'
import { useParams ,useNavigate } from 'react-router'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"

function PostForm() {
  const {postId} = useParams()
  const navigate = useNavigate()
  const [errors, seterrors] = useState()
  console.log(postId)
  const [formData , setformData]= useState({
      poster : '',
      text:''})
  async function getSinglePost() {
    try{
      const response = await axios.get(`http://127.0.0.1:8000/api/post/${postId}/`)
      console.log(response.data)
      setformData(response.data)
      settitle(response.data.title)
    } catch(error){
      console.log(error)
      seterrors(error.response.data.error)
      }
  }
  useEffect(()=>{
    if(postId){
      getSinglePost()
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
    let response ={}
    if (postId){
      response = await authRequest({method:'put', url:`http://127.0.0.1:8000/api/post/${postId}/`, data:formData})
    }else{
      response = await authRequest({method:'post', url: 'http://127.0.0.1:8000/api/posts' , data:formData})  
    }
    console.log(response)
    if (response.status === 201 || response.status === 200){     
      navigate(`/post/${response.data.id}`)
    }
  }
  return (
    <>
      <h1>{postId ?`Edit Post `:'Add Post'}</h1>
      <form onSubmit={submitHandler}>
          <div>
              <label htmlFor='poster'>Poster Link: </label>
              <input onChange={changeHandler} value={formData.poster} id='poster' name='poster' type='text'/>
          </div>
          <div>
              <label htmlFor='text'></label>
              <input onChange={changeHandler} value={formData.text} id='text' name='text' type='text'/>
          </div>
          <button type='submit' >{postId ?`Edit`:'Submit'}</button>
      </form>
    </>
  )
}

export default PostForm