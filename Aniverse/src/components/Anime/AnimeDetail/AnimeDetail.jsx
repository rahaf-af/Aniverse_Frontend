import React from 'react'
import { useEffect , useState } from 'react'
import { useParams , useNavigate, Link } from 'react-router'
import axios from 'axios'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"

function AnimeDetail() {
    const [anime, setanime] = useState([])
    const [errors, seterrors] = useState()
    const {animeId} = useParams()
    const navigate = useNavigate()
    console.log(animeId)

    async function getSingleAnime() {
        try{
        const response = await axios.get(`http://127.0.0.1:8000/api/anime/${animeId}/`)
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
    async function deleteHandeler(event) {
        const response = await authRequest({method:'delete',url:`http://127.0.0.1:8000/api/anime/${animeId}/`})
        console.log(response.data)
        navigate('/animes')
    } 
  return (
    <>
        <div className='singleanime'>
            <div className='animeposter'>
                <img src={anime.poster} alt='anime poster'/>
            </div>
            <div className='animeInfo'>
                <h1>Title: {anime.title}</h1>
                <p>Genres: {anime.genre}</p>
                <strong><p>Rating: {anime.global_rating} ⭐</p></strong>
                <p>Description: {anime.description}</p>
            </div>
            <div className='animebuttons'>
                <Link to={`/editAnime/${animeId}`}><button>Edit anime</button></Link>
                <button onClick={deleteHandeler}>Delete anime</button>
            </div>

        </div>
    </>
  )
}

export default AnimeDetail