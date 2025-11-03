import React from 'react'
import { useState , useEffect} from 'react'
import axios from 'axios'
import { useParams ,useNavigate } from 'react-router'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"

function AnimeForm() {
    const {animeId} = useParams()
    const navigate = useNavigate()
    const [errors, seterrors] = useState()
    console.log(animeId)
    const [title, settitle] = useState('')

    const [formData , setformData]= useState({
        poster : '',
        title:'',
        genre:'',
        global_rating:0.0,
        description:''
    })
    async function getSingleAnime() {
        try{
        const response = await axios.get(`http://127.0.0.1:8000/api/anime/${animeId}/`)
        console.log(response.data)
        setformData(response.data)
        settitle(response.data.title)
        } catch(error){
            console.log(error)
            seterrors(error.response.data.error)
        }
    }
    useEffect(()=>{
        if(animeId){
            getSingleAnime()
        }
    },[])
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
        if (animeId){
            response = await authRequest({method: 'put', url:`http://127.0.0.1:8000/api/anime/${animeId}/` , data:formData})
        }else{
            response = await authRequest({method: 'post', url:`http://127.0.0.1:8000/api/animes/`, data:formData})  
        }
        console.log(response)
        if (response.status === 201 || response.status === 200){
            
            navigate(`/anime/${response.data.id}`)
        }
    }
  return (
    <>
    <h1>{animeId ?`Edit ${title}`:'Add Anime'}</h1>
    <form onSubmit={submitHandler}>
        <div>
            <label htmlFor='poster'>Poster Link: </label>
            <input onChange={changeHandler} value={formData.poster} id='poster' name='poster' type='text'/>
        </div>
        <div>
            <label htmlFor='title'>Title: </label>
            <input onChange={changeHandler} value={formData.title} id='title' name='title' type='text'/>
        </div>
        <div>
            <label htmlFor='genre'>Genres: </label>
            <input onChange={changeHandler} value={formData.genre} id='genre' name='genre' type='text'/>
        </div>
        <div>
            <label htmlFor='rating'>Rating: </label>
            <input onChange={changeHandler} value={formData.global_rating} id='rating' name='rating'/>
        </div>
         <div>
            <label htmlFor='description'>Description: </label>
            <textarea onChange={changeHandler} value={formData.description} id='description' name='description' type='text'/>
        </div>
        <button type='submit' >{animeId ?`Edit`:'Submit'}</button>
    </form>
    </>
  )
}

export default AnimeForm