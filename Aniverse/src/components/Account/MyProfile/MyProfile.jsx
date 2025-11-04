import React from 'react'
import { useEffect , useState } from 'react'
import { useParams ,useNavigate } from 'react-router'
import axios from 'axios'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"
import { Link } from 'react-router'



function MyProfile() {
    const [profile, setprofile] = useState([])
    const [errors, seterrors] = useState()
    const [profileId, setprofileId] = useState()
    const navigate = useNavigate()

    async function getMyProfile() {
        try{
          const response = await authRequest({method:'get',url: `http://127.0.0.1:8000/api/myprofile/`})
          console.log(response.data)
          setprofile(response.data)
          setprofileId(response.data.id)
        } catch(error){
            console.log(error)
            seterrors(error)
        }
    }
    useEffect(()=>{
        getMyProfile()
    },[])
    async function deleteHandeler(event) {
        const response = await authRequest({method: 'delete',url: `http://127.0.0.1:8000/api/deleteuser/`})
        console.log(response.data)
        navigate('/signup')
    }
  return (
    <>
        <div className='profile'>
            <div className='profileimg'>
                <img src={profile.profile_img} alt='profile img'/>
            </div>
            <div className='profileinfo'>
                <strong><p>Email: {profile.email}</p></strong>
                <strong><p>phone number: {profile.phone_number}</p></strong>
                <p>bio:{profile.bio}</p>
            </div>
            <div className='postbuttons'>
                <Link to={`/editprofile/${profileId}`}><button>Edit account</button></Link>
                <button onClick={deleteHandeler}>Delete account</button>
            </div>
            <div>
                <Link to={'/myanimefavoritlist'}>my anime favorit list</Link>
                <Link to ={'/mypostfavoritlist'}> my post favorit list</Link>
            </div>
        </div>
    </>
  )
}

export default MyProfile