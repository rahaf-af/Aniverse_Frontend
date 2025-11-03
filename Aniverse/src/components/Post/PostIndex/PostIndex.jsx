import {React , useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router'

function Posts() {
  const [posts, setPosts] = useState([])
  const [errors, seterrors] = useState()
  async function getAllPosts() {
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/posts/')
      console.log(response.data)
      setPosts(response.data)
    }catch(error){
      console.log(error)
      seterrors(error.response.data.error)
    }
  }
  useEffect(()=>{
    getAllPosts()
  },[])
  if (errors){
        return <h3>{errors}</h3>
  }
  return (
    <>
    <div className='posts'>
      <h1>All posts</h1>
      {
        posts.length 
             ?
              posts.map((post)=>{
              return(
                <Link to= {`/post/${post.id}/`}key={post.id}>
                  <div className='postcard'>
                    <p>@{post.auther}</p>
                    <img src={post.poster} alt='post poster'/>
                    <p>{post.text}</p>
                  </div>
                </Link>
              )
              })
              :
              <h2>No Posts available yet </h2>
      }
    </div>
    </>
  )
}

export default Posts