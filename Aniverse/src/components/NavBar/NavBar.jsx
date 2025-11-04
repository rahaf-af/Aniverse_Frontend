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
        <img src='/logo.png' alt='logo'/>
      </div>
        <Link to={'/animes'}>All animes </Link>
        <Link to ={'/posts'}>All posts</Link>
        {
          user
            ?
            <>
              <Link to ={'/addPost'}>Add post</Link>
              <Link to = {'/addAnime'}>Add Anime</Link>
              <Link to={'/myprofile'}>my profile</Link>
              <Link to={'/contacus'}>Contacus</Link>
              <div className='logout'>
                <LogoutButton setUser={setUser}></LogoutButton>
              </div>
            </>
            :
            <>
              <Link to={'/'}>Signup</Link>
              <Link to={'/login'}>Login</Link>
            </>
        }
    </div>
    </>
  )
}

export default NavBar
