import React,{useState, useEffect} from 'react'
import {FaStar} from 'react-icons/fa'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"
import { useParams , useNavigate, Link } from 'react-router'
import './PostComment.css'

function PostComment() {
    const {postId} = useParams()
    const [reviewtext, setreviewtext]= useState('')
    console.log(postId)
    const navigate = useNavigate()

    async function submitHandler(event){
        const formData = {
            text : reviewtext,  
        }
        event.preventDefault()
        let response ={}
        if (postId){
            response = await authRequest({method: 'post', url:`http://127.0.0.1:8000/api/post/${postId}/comment/` , data:formData})
        }else{
            return ('there is no postId')
        }
        console.log(response)
        if (response.status === 201){
            navigate(`/post/${postId}`)
        }
    }
    const changeHandler = (event) =>{
        setreviewtext(event.target.value)
    }
  return (
    <>
        <h1>Add comment </h1>
        <div className='commentform'>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor='comment'>Comment:</label>
                    <textarea id='comment' onChange={changeHandler}></textarea>
                </div>
                <button type='submit'>Submit</button>   
            </form>
        </div>
    </>
  )
}
export default PostComment

