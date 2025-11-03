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
      <button onClick={handleLogOut}>
        <FiLogOut size={15}/>
      </button>
    </>
  )
}

export default LogoutButton
