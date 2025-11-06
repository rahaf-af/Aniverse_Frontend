import React from 'react'
import { Link } from 'react-router'
import LogoutButton from '../Auth/LogoutButton'
import '/Users/rayanfallatah/projects/Aniverse/Aniverse_Frontend/Aniverse/src/components/NavBar/NavBar.css'
import './NavBar.css'
function NavBar({ user, setUser }) {
  return (
    <>
    <div className='nav'>
      <div className='logo'>
        <img src='/logo4.jpg' alt='logo'/>
      </div>
        <Link to={'/'}>Home</Link>
        <Link to={'/about'}>About</Link>
        <Link to={'/animes'}>Animes</Link>
        <Link to ={'/posts'}>Posts</Link>
        <Link to ={'/platforms'}>Platforms</Link>
        {
          user
            ?
            <>
              <Link to = {'/addAnime'}>Add Anime</Link>
              <Link to ={'/addPost'}>Add post</Link>
              <Link to={'/contacus'}>Contact us</Link>
               <Link to={'/myprofile'} className='profilelink'><div className='profilecircle'><img src='/profilelogo.PNG' alt='profilelogo'></img></div></Link>
              <div className='logout'>
                <LogoutButton setUser={setUser}></LogoutButton>
              </div>
              
            </>
            :
            <>
              <Link to={'/signup'}>Signup</Link>
              <Link to={'/login'}>Login</Link>
            </>
        }
    </div>
    </>
  )
}

export default NavBar
