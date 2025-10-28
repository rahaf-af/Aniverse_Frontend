import React from 'react'
import { useState , useEffect} from 'react'
import axios from 'axios'
import { Navigate , useParams } from 'react-router'


function AnimeForm() {
    const [formData , setformData]= useState({
        poster :'',
        title:'',
        genre:'',
        rating:0.0,
        description:''
    })
    function changeHandler(event){
        setformData({...formData, [event.target.name]: event.target.value})
        console.log(formData)
    }
    async function submitHandler(event){
        

    }
  return (
    <>
    <h1>Add Anime</h1>
    <form>
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
        <button type='submit' >Submit</button>
    </form>
    </>
  )
}

export default AnimeForm