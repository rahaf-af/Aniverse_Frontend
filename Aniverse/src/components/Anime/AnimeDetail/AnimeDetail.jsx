import React from 'react'
import { useEffect , useState } from 'react'
import { useParams , useNavigate, Link } from 'react-router'
import axios from 'axios'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"
import {FaComment,FaRegHeart ,FaHeart } from 'react-icons/fa'
import './AnimeDetail.css'

function AnimeDetail({ user, setUser }) {
    const [anime, setanime] = useState([])
    const [reviews , setreviews] = useState([])
    const [errors, seterrors] = useState()
    const [isfavorite , setIsFavorite] = useState(false)
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
    async function isfavoriteHandler(event){
        event.preventDefault()
        let favoritId
        let response ={}
        if (!isfavorite){
            try{
                response = await authRequest({method: 'post', url:`http://127.0.0.1:8000/api/addanime/${animeId}/tofavorit/`})
                favoritId = response.data.data[0].id
                setIsFavorite(true)
                console.log(isfavorite,'i am in your favorite list now 😍')
                console.log(response.data)
                if (response.status === 201)
                    navigate('/myanimefavoritlist')
            }catch{
                alert('the Anime is alredy in your favorite list🙂 ')
            }
            
        }else{
            try{
                response = await authRequest({method: 'delete', url:`http://127.0.0.1:8000/api/removeanime/${favoritId}/fromfavorit/`}) 
                setIsFavorite(false)
                console.log(isfavorite, 'i am out of your favorite list now 🥺')
                console.log(response.data) 
                if (response.status === 204){
                    navigate('/myanimefavoritlist')
                }
            }catch{
                alert('the Anime is alredy in your favorite list🙂 ')
            }
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
            <div className='div1'>
                <div className='animeposter'>
                    <img src={anime.poster} alt='anime poster'/>
                </div>
                {
                    String(anime.publisher_id) === String(user?.user_id)
                    ?
                    <div className='animebuttons'>
                        <Link to={`/editAnime/${animeId}`}><button>Edit anime</button></Link>
                        <button onClick={deleteHandeler}>Delete anime</button>
                    </div>
                    :<p></p>
                }
            </div>
            <p></p>
                <div className='div2'>
                    <div className='animeInfo'>
                        <h1>Title: {anime.title}</h1>
                        <p><strong>Genres:</strong> {anime.genre}</p>
                        <strong><p>Rating: {anime.global_rating} ⭐</p></strong>
                        <p><strong>Description: </strong> {anime.description}</p>
                    </div>
                    <div className='interacticons'>
                        <Link to={`/addreview/${animeId}`}>{anime.review_count}<FaComment size={25}/></Link>
                        <span onClick={isfavoriteHandler}>{anime.favorit_count}{isfavorite ? <FaHeart color='red' size={25}/>:<FaRegHeart color='red' size={25}/>}</span>
                    </div>
            </div>
        </div>
        <div className='animereviews'>
            <h3 color='grey' >Reviews</h3>
            <hr color='grey' width='100%'></hr>
            {
               reviews.length >0
               ?
                reviews.map((review)=>{
                    return(
                        <div className='review'>
                            <p><strong>{Array(review.rating).fill().map((_,index)=> (<span key={index}>⭐️</span>))}</strong></p> 
                            <p>{review.text}</p>
                            <p>@{review.user}</p>
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