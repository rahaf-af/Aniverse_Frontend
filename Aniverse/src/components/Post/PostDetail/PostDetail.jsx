import React from 'react'
import { useState , useEffect} from 'react'
import axios from 'axios'
import { useParams ,useNavigate } from 'react-router'
import { Link } from 'react-router'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"
import {FaComment,FaRegHeart ,FaHeart } from 'react-icons/fa'

function PostDetail() {
    const [post, setpost] = useState([])
    const [comments , setComments] = useState([])
    const [errors, seterrors] = useState()
    const [isfavorite , setIsFavorite] = useState(false)
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
    async function isfavoriteHandler(event){
      event.preventDefault()
      let favoritId
      let response ={}
      if (!isfavorite){
        response = await authRequest({method: 'post', url:`http://127.0.0.1:8000/api/addpost/${postId}/tofavorit/`})
        favoritId = response.data.data[0].id
        setIsFavorite(true)
        console.log(isfavorite,'i am in your favorite list now 😍')
        console.log(response.data)
        if (response.status === 201)
          navigate('/mypostfavoritlist')
      }else{
        response = await authRequest({method: 'delete', url:`http://127.0.0.1:8000/api/removepost/${favoritId}/fromfavorit/`}) 
          setIsFavorite(false)
          console.log(isfavorite, 'i am out of your favorite list now 🥺')
          console.log(response.data) 
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
        <span onClick={isfavoriteHandler}>{post.favorit_count}{isfavorite ? <FaHeart color='red' size={25}/>:<FaRegHeart color='red' size={25}/>}</span>
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
