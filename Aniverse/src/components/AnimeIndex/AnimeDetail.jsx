import React from 'react'
import { useEffect , useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

function AnimeDetail() {
    const [anime, setanime] = useState([])
    const [errors, seterrors] = useState()
    const {animeId} = useParams()
    console.log(animeId)
    async function getSingleAnime() {
        try{
        const response = await axios.get(`http://127.0.0.1:8000/api/anime/${animeId}`)
        console.log(response.data)
        setanime(response.data)
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
    async function deleteHandeler(pastry_id, event) {
        const response = await axios.delete(`http://127.0.0.1:8000/api/anime/${animeId}`)
        console.log(response.data)
        Navigate('/animes')
    } 
  return (
    <>
        <div className='singleanime'>
            <div className='animeposter'>
                <img src={anime.poster} alt='anime poster'/>
            </div>
            <div className='animeInfo'>
                <h1>title: {anime.title}</h1>
                <p>genre: {anime.genre}</p>
                <strong><p>rating: {anime.rating} ⭐</p></strong>
                <p>description: {anime.description}</p>
            </div>
            <div className='animebuttons'>
                <button>Edit anime</button>
                <button onClick={deleteHandeler}>Delete anime</button>
            </div>

        </div>
    </>
  )
}

export default AnimeDetail