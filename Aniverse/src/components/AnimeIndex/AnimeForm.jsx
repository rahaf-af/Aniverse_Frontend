import React from 'react'
import { useState , useEffect} from 'react'
import axios from 'axios'
import { useParams ,useNavigate } from 'react-router'


function AnimeForm() {
    
    const [formData , setformData]= useState({
        poster :'',
        title:'',
        genre:'',
        rating:0.0,
        description:''
    })
    const {animeId} = useParams()
    const navigate = useNavigate()
    console.log(animeId)

    function changeHandler(event){
        setformData({...formData, [event.target.name]: event.target.value})
        console.log(formData)
    }
    async function submitHandler(event){
        let response ={}
        event.preventDefault()
        if (animeId){
            const response = await axios.put(`http://127.0.0.1:8000/api/anime/${animeId}/`, formData)
        }else{
            const response = await axios.post(`http://127.0.0.1:8000/api/animes/`, formData)  
        }
        console.log(response)
        if (response.status === 201 || response.status === 200){
            navigate(`/anime/${response.data.id}`)
        }
        

    }
  return (
    <>
    <h1>{animeId ?`Edit ${formData.title}`:'Add Anime'}</h1>
    <form onSubmit={submitHandler}>
        <div>
            <label htmlFor='poster'>Poster</label>
            <input onChange={changeHandler} value={formData.poster} id='poster' name='poster' type='image'/>
        </div>
        <div>
            <label htmlFor='title'>Title</label>
            <input onChange={changeHandler} value={formData.title} id='title' name='title'/>
        </div>
        <div>
            <label htmlFor='genre'>Genre</label>
            <input onChange={changeHandler} value={formData.genre} id='genre' name='genre'/>
        </div>
        <div>
            <label htmlFor='rating'>Rating</label>
            <input onChange={changeHandler} id='rating' name='rating'/>
        </div>
         <div>
            <label htmlFor='description'>Description</label>
            <textarea onChange={changeHandler} id='description' name='description'/>
        </div>
        <button type='submit' >{animeId ?`Edit`:'Submit'}</button>
    </form>
    </>
  )
}

export default AnimeForm