import React from 'react'
import { useState , useEffect} from 'react'
import axios from 'axios'
import { useParams ,useNavigate } from 'react-router'
import { Link } from 'react-router'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"

function MyAnimeFavoritList() {
    const [favoritlist, setFavoritList] = useState([])
    const [errors, seterrors] = useState()
    const [favoritId, setfavoritId]= useState('')
    const {animeId} = useParams()
    console.log(animeId)
    async function getAnimeFavoritList() {
        try{
            const response = await authRequest({method: 'get', url:`http://127.0.0.1:8000/api/myanimefavoritlist/`})
            console.log(response.data)
            setFavoritList(response.data)
            setfavoritId (response.data.data[0].id)
        } catch(error){
            console.log(error)
            seterrors(error.response.data.error)
        }
    }
    async function removeanime(favoritId){
        const response = await authRequest({method: 'delete', url:`http://127.0.0.1:8000/api/removeanime/${favoritId}/fromfavorit/`}) 
        console.log('i am out of your favorite list now 🥺')
        console.log(response.data) 
    }
    useEffect(()=>{
        getAnimeFavoritList() 
    },[])
    if (errors){
        return <h3>{errors}</h3>
    }
  return (
    <>
        <h1>My Anime favorit list </h1>
        <div className='Animes'>
            {
               favoritlist.length >0
               ?
                favoritlist.map((favorit)=>{
                    return(
                        <div className='animecard' key={favorit.id}>
                            <img src={favorit.anime_poster} alt='anime poster'/>
                            <p><strong onClick={()=> removeanime(favorit.id)}>[❌] </strong>{favorit.anime}</p>
                        </div>
                    )
                })
                :
                <h2>No favorit anime yet 🥺</h2>
            }

        </div>
    </>
  )
}

export default MyAnimeFavoritList
//myanimefavoritlist/
