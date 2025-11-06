import React from 'react'
import { Link } from 'react-router'
import { useEffect , useState } from 'react'
import axios from 'axios'
import './Home.css'

function Home() {
  const [animes, setanimes] = useState([])
  const [errors, seterrors] = useState()
  async function getAllAnimes() {
        try{
        const response = await axios.get('http://127.0.0.1:8000/api/homeanime/')
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
      <div className='homeimg'>
        <img src='https://wallpapers.com/images/high/anime-collage-1920-x-1080-wallpaper-fwx8xyvh2rd4ju8n.webp'alt='home img'/>
      </div>
      <div className='animesection'>
        <hr color='grey'></hr>
        <div className='animeh3'>
          <h2>Last added Anime</h2>
          <Link to={'/animes'}><h5 color='grey' >See more ᗎ</h5></Link>
        </div>
        <div className='Animes'>
          {
            animes ?
              animes.map((anime)=>{
                return(
                  <Link to= {`/anime/${anime.id}/`} key={anime.id}>
                    <div className='animecard'>
                      <img src={anime.poster} alt='anime poster'/>
                      <p>{anime.title}</p>
                    </div>
                  </Link>
                )
              })
            :<p>No anime added yet🥺</p>
          }
        </div>
      </div>
      <div className='aboutsection'>
        <hr color='grey'></hr>
        <div className='abouth3'>
          <h2>About Aniverse</h2>
          <Link to={'/about'}><h5 color='grey' >See more ᗎ</h5></Link>
        </div>
        <div className='aboutboxes'>
          <div className='box1'>
            <img src='mission.PNG'></img>
            <p><strong>Mission</strong><br/>Our Mission is to create an interactive community for anime lovers united by passion and unique content.</p>
          </div>
          <div className='box2'>
            <img src='Vision.PNG'></img>
            <p><strong>Vision</strong><br/>Our vision is to become the leading platform in the Arab world for anime lovers covering all aspects from news to reviews and recommendations.</p>
          </div>
          <div className='box3'>
            <img src='features.PNG'></img>
            <p><strong>Features</strong><br/>We pay attention to every detail, from website design to anime selection to user comfort while browsing.</p>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home