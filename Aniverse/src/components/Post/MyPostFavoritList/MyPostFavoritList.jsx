import React from 'react'
import { useState , useEffect} from 'react'
import axios from 'axios'
import { useParams ,useNavigate } from 'react-router'
import { Link } from 'react-router'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"


function MyPostFavoritList() {
    const [favoritlist, setFavoritList] = useState([])
    const [errors, seterrors] = useState()
    async function getPostFavoritList() {
        try{
            const response = await authRequest({method: 'get', url:`http://127.0.0.1:8000/api/mypostfavoritlist/`})
            console.log(response.data)
            setFavoritList(response.data)
        } catch(error){
            console.log(error)
            seterrors(error.response.data.error)
        }
    }
    useEffect(()=>{
        getPostFavoritList() 
    },[])
    if (errors){
        return <h3>{errors}</h3>
    }
    async function removePost(favoritId){
        const response = await authRequest({method: 'delete', url:`http://127.0.0.1:8000/api/removepost/${favoritId}/fromfavorit/`}) 
        console.log('i am out of your favorite list now 🥺')
        console.log(response.data) 
        getPostFavoritList() 
    }
  return (
    <>
        <h1>My Post favorit list </h1>
        <div className='Animes'>
            {
               favoritlist.length >0
               ?
                favoritlist.map((favorit)=>{
                    return(
                        <div className='animecard' key={favorit.id}>
                            <img src={favorit.post_poste} alt='anime poster'/>
                            <p><strong onClick={()=> removePost(favorit.id)}>[❌]</strong>@{favorit.user_username}</p>
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

export default MyPostFavoritList


