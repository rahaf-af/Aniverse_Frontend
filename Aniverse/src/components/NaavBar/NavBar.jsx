import React from 'react'
import { Link } from 'react-router'
import LogoutButton from '../Auth/LogoutButton'
function NavBar({ user, setUser }) {
  return (
    <>
    <div className='nav'>
        <Link to={'/animes'}>All animes </Link>
        <Link to = {'/addAnime'}>Add Anime</Link>
        <Link to ={'/posts'}>All posts</Link>
        <Link to ={'/addPost'}>Add post</Link>
        {
          user
            ?
            <>
              <Link to={'/myprofile'}>my profile</Link>
              <Link to={'/contacus'}>Contacus</Link>
              <LogoutButton setUser={setUser}></LogoutButton>
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
