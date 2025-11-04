import React,{useState, useEffect} from 'react'
import {FaStar} from 'react-icons/fa'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"
import { useParams , useNavigate, Link } from 'react-router'


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
        <form onSubmit={submitHandler}>
            <div style={styles.container}>
                <textarea value={reviewtext} style={styles.textarea} placeholder='Add your Feedback' onChange={changeHandler}></textarea>
                <button style={styles.button} type='submit'>Submit</button>
            </div>      
        </form>
    </>
  )
}
const styles ={
    container: {
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }, 
    textarea: {
        border: '1ps solid #a9a9a9',
        borderRadius: 5,
        width: 300,
        margin: '20px 0',
        minHeight: 100,
        padding: 10
    },
    button: {
      border: '1ps solid #a9a9a9',
      borderRadius: 5,
      width: 300,
      padding: 10 
    }
}

export default PostComment

