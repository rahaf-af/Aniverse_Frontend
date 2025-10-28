import React from 'react'
import { useEffect , useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
function Animes() {
    const [animes, setanimes] = useState([])
    const [errors, seterrors] = useState()
    async function getAllAnimes() {
        try{
        const response = await axios.get(' http://127.0.0.1:8000/api/animes/')
        console.log(response.data)
        setanimes(response.data)
        } catch(error){
            console.log(error)
            seterrors(error.response.data.error)
        }
    }
    useEffect(()=>{
        getAllAnimes()
    },[])
    if (errors){
        return <h3>{errors}</h3>
    }
  return (
    <>
        <h1>All Animes available</h1>
        <div className='Animes'>
            {
               animes.length?
                animes.map((anime)=>{
                    return(
                        <Link to= {`/anime/${anime.id}/`}>
                            <div className='animecard' key={anime.id}>
                                <img src={anime.poster} alt='anime poster'/>
                                <p>{anime.title}</p>
                            </div>
                        </Link>
                    )
                }):
                <h2>No Animes available yet</h2>
            }
        </div>
    </>
  )
}

export default Animes