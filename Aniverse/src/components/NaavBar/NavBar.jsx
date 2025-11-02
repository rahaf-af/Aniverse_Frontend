import React from 'react'
import { Link } from 'react-router'

function NavBar() {
  return (
    <>
    <div>
        <Link to={'/animes'}>All animes </Link>
        <Link to = {'/addAnime'}>Add Anime</Link>
        <Link to ={'/posts'}>All posts</Link>
    </div>
    </>
  )
}

export default NavBar