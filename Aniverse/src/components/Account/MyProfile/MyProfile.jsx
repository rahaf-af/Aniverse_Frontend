import React from 'react'
import { useEffect , useState } from 'react'
import { useParams ,useNavigate } from 'react-router'
import axios from 'axios'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"
import { Link } from 'react-router'
import './MyProfile.css'



function MyProfile() {
    const [profile, setprofile] = useState([])
    const [userinfo, setuserinfo] = useState([])
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
    async function getuserinfo() {
        try{
            const response = await authRequest({method: 'get',url: `http://127.0.0.1:8000/api/handeluser/`})
            setuserinfo(response.data)
            console.log(response.data)
        } catch(error){
            console.log(error)
            seterrors(error)
        }
    }
    useEffect(()=>{
        getMyProfile()
        getuserinfo()
    },[])
    async function deleteHandeler(event) {
        const response = await authRequest({method: 'delete',url: `http://127.0.0.1:8000/api/handeluser/`})
        console.log(response.data)
        navigate('/signup')
    }
  return (
    <>
        <h1>My profile</h1>
        <div className='profile'>
            <div className='profileimg'>
                <img src={profile.profile_img} alt='profile img'/>
                <div className='postbuttons'>
                    <Link to={`/editprofile/${profileId}`}><button className='editbutton'>Edit account</button></Link>
                    <button className='deletebutton' onClick={deleteHandeler}>Delete account</button>
                </div>
            </div>
            <div className='profileinfodiv'>
                <div className='profileinfo'>
                    <p><strong>👤 First name: </strong>{userinfo.first_name}</p>
                    <p><strong>👤 Last name: </strong>{userinfo.last_name}</p>
                    <p><strong>📧 Email: </strong>{userinfo.email}</p>
                    <p><strong>📞 phone number: </strong>{profile.phone_number}</p>
                    <p><strong>bio: </strong>{profile.bio}</p>
                </div>
                <div className='favoritlists'>
                    <Link to={'/myanimefavoritlist'}>my anime favorit list</Link>
                    <Link to ={'/mypostfavoritlist'}> my post favorit list</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default MyProfile