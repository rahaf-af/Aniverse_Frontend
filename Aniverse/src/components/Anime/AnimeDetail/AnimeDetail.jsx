import React from 'react'
import { useEffect , useState } from 'react'
import { useParams , useNavigate, Link } from 'react-router'
import axios from 'axios'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"
import {FaComment} from 'react-icons/fa'

function AnimeDetail() {
    const [anime, setanime] = useState([])
    const [reviews , setreviews] = useState([])
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
    async function getAllReviews() {
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/anime/${animeId}/review/`)
            console.log(response.data)
            setreviews(response.data)
        } catch(error){
            console.log(error)
            seterrors(error.response.data.error)
        }
    }
    useEffect(()=>{
        if(animeId){
            getSingleAnime()
            getAllReviews()
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
            <p></p>
            <div className='interacticons'>
                <Link to={`/addreview/${animeId}`}>{anime.review_count}<FaComment size={25}/></Link>
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
        <div className='animereviews'>
            {
               reviews.length >0
               ?
                reviews.map((review)=>{
                    return(
                        <div className='review'>
                            <p><strong>{Array(review.rating).fill().map((_,index)=> (<span key={index}>⭐️</span>))}</strong></p> 
                            <p>{review.text}</p>
                        </div>
                    )
                })
                :
                <h2>No reviews yet 🥺</h2>
            }

        </div>
    </>
  )
}

export default AnimeDetail