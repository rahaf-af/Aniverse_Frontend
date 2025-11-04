import React from 'react'
import { useState , useEffect} from 'react'
import axios from 'axios'
import { useParams ,useNavigate } from 'react-router'
import { Link } from 'react-router'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"
import {FaComment} from 'react-icons/fa'

function PostDetail() {
    const [post, setpost] = useState([])
    const [comments , setComments] = useState([])
    const [errors, seterrors] = useState()
    const {postId} = useParams()
    const navigate = useNavigate()
    console.log(postId)

    async function getSinglePost() {
        try{
          const response = await axios.get(`http://127.0.0.1:8000/api/post/${postId}`)
          console.log(response.data)
          setpost(response.data)
        } catch(error){
            console.log(error)
            seterrors(error.response.data.error)
        }
    }
    async function getAllComments() {
      try{
        const response = await axios.get(`http://127.0.0.1:8000/api/post/${postId}/comment/`)
        console.log(response.data)
        setComments(response.data)
      } catch(error){
        console.log(error)
          seterrors(error.response.data.error)
      }
    }
    useEffect(()=>{
        if(postId){
          getSinglePost()
          getAllComments()
        }
    },[])
    if (errors){
        return <h3>{errors}</h3>
    }
    async function deleteHandeler(event) {
        const response = await authRequest({method: 'delete',url: `http://127.0.0.1:8000/api/post/${postId}/`})
        console.log(response.data)
        navigate('/posts')
    } 
  return(
    <>
    <div className='singlepost'>
        <p>@{post.auther}</p>
      <div className='postposter'>
        <img src={post.poster} alt='post poster'/>
      </div>
      <div className='postInfo'>
        <p>Description: {post.text}</p>
      </div>
      <div className='interacticons'>
        <Link to={`/addcomment/${postId}`}>{post.comment_count}<FaComment size={25}/></Link>
      </div>
      <div className='postbuttons'>
        <Link to={`/editPost/${postId}`}><button>Edit post</button></Link>
          <button onClick={deleteHandeler}>Delete post</button>
      </div>
    </div>
    <div className='postComment'>
            {
               comments.length >0
               ?
                comments.map((comment)=>{
                    return(
                        <div className='comment'>
                            <p>{comment.text}</p>
                        </div>
                    )
                })
                :
                <h2>No comments yet 🥺</h2>
            }

        </div>
    </>
  )
}

export default PostDetail
