import React,{useState, useEffect} from 'react'
import {FaStar} from 'react-icons/fa'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"
import { useParams , useNavigate, Link } from 'react-router'
import './AnimeReview.css'

const colors = {
    orange: '#502a60',
    grey: '#a9a9a9'
}
function AnimeReview() {
    const stars = Array(5).fill(0)
    const {animeId} = useParams()
    const [currentValue,setuCrrentValue]= useState(0)
    const [reviewtext, setreviewtext]= useState('')
    const [hoverValue, setHoverValue]= useState(undefined)
    console.log(animeId)
    const navigate = useNavigate()

    const handelClick = value =>{
        setuCrrentValue(value)
    }
    const handelMouseOver = value =>{
        setHoverValue(value)
    }
    const handelMouseLeave = () =>{
        setHoverValue(undefined)
    }

    async function submitHandler(event){
        const formData = {
            text : reviewtext,
            rating: currentValue    
        }
        event.preventDefault()
        let response ={}
        if (animeId){
            response = await authRequest({method: 'post', url:`http://127.0.0.1:8000/api/anime/${animeId}/review/` , data:formData})
        }else{
            return ('there is no animeId')
        }
        console.log(response)
        if (response.status === 201){
            navigate(`/anime/${animeId}`)
        }
    }
    const changeHandler = (event) =>{
        setreviewtext(event.target.value)
    }

  return (
    <>
        <h1>Add Anime Review</h1>
        <div className='animereviewform'>
            <form onSubmit={submitHandler}>
                <div className='stars'>
                    {stars.map((_, index) => {
                    return(
                    <FaStar 
                    key={index} 
                    size={24}
                    style={{
                    marginRight: 10,
                    cursor: 'pointer'
                    }}
                    color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                    onClick={()=> handelClick(index +1)}
                    onMouseOver={()=> handelMouseOver(index +1)}
                    onMouseLeave={handelMouseLeave}
                    />)})}
                </div>
                <div>
                    <label htmlFor='feedback'>Feedback:</label>
                    <textarea id='feedback' value={reviewtext}  onChange={changeHandler }></textarea>
                </div>     
                <button type='submit'>Submit</button>        
            </form>
        </div>
    </>
  )
}

export default AnimeReview
