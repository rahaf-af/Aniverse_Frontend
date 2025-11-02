import React from 'react'
import { useEffect , useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import './Anime.css'

function Animes() {
    const [animes, setanimes] = useState([])
    const [errors, seterrors] = useState()
    const [Searchinput, setSearchinput]= useState('')
    const [SearchResult, setSearchResult]= useState([])
    const [LastSearch, setLastSearch]= useState('')

    async function getAllAnimes() {
        try{
        const response = await axios.get('http://127.0.0.1:8000/api/animes/')
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
    function getSearchResult(event) {
    event.preventDefault()
    const result = animes.filter(anime =>
      anime.title.toLowerCase().includes(Searchinput.toLowerCase())
    )
    setSearchResult(result) 
    console.log(result)
    console.log('done')
    setLastSearch(Searchinput)
    setSearchinput('')
  }
  function Reset(){
    setSearchResult([])
    setLastSearch('')

  }
  function inputhandler(event){
    console.log(animes)
    setSearchinput(event.target.value)
  }
  return (
    <>
        <h1>All available Animes</h1>
        <form onSubmit={getSearchResult}>
            <label htmlFor='userinput'><strong>Search:</strong></label>
            <input id ='userinput' type='text' onChange={inputhandler} value={Searchinput} placeholder='Enter anime title' ></input>
            <button type='submit'>Search</button>
            <button type='button'onClick={Reset}>Reset</button>
        </form>
        <div className='Animes'>
            {SearchResult.length > 0 ? (
            
                SearchResult.map((anime)=>{
                    return(
                        <Link to= {`/anime/${anime.id}/`}key={anime.id}>
                            <div className='animecard'>
                                <img src={anime.poster} alt='anime poster'/>
                                <p>{anime.title}</p>
                            </div>
                        </Link>
                    )
                })) : LastSearch ?(
                <h1>❌ No result for : "{LastSearch}"</h1>
                ):(
                // Starshipsdata ?
                    animes.map((anime)=>{
                        return(
                            <Link to= {`/anime/${anime.id}/`} key={anime.id}>
                                <div className='animecard'>
                                    <img src={anime.poster} alt='anime poster'/>
                                    <p>{anime.title}</p>
                                </div>
                            </Link>
                        )
                    }))
                // :<p>No data yet</p>
            } 
        </div>
    </>
  )
}

export default Animes