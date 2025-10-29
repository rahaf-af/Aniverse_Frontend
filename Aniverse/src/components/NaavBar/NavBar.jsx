import React from 'react'
import { Link } from 'react-router'

function NavBar() {
  return (
    <>
    <div>
        <Link to={'/animes'}>All animes </Link>
        <Link to = {'/addAnime'}>Add Anime</Link>
    </div>
    </>
  )
}

export default NavBarThe bugs have been fixed and the nav bar component has been create