import React from 'react'
import { clearTokens } from "../../lib/auth"
import { useNavigate } from 'react-router'
import {FiLogOut} from 'react-icons/fi'

function LogoutButton({setUser}) {
  const navigate = useNavigate()
    function handleLogOut(){
        clearTokens()
        setUser(null)
        navigate('/login')
    }
  return (
    <>
      <span onClick={handleLogOut}>
        <FiLogOut color='grey'size={25}/>
      </span>
    </>
  )
}

export default LogoutButton
