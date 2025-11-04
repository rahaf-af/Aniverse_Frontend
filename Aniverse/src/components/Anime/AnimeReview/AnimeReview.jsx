import React,{useState, useEffect} from 'react'
import {FaStar} from 'react-icons/fa'
import { authRequest, getUserFromToken, clearTokens } from "../../../lib/auth"
import { useParams , useNavigate, Link } from 'react-router'


const colors = {
    orange: '#FFBA5A',
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
        <form onSubmit={submitHandler}>
            <div style={styles.container}>
                <div style ={styles.stars}>
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
                        <div>
                            <textarea value={reviewtext} style={styles.textarea} placeholder='Add your Feedback' onChange={changeHandler }></textarea>
                            <button style={styles.button} type='submit'>Submit</button>
                        </div>
                </div>
            </div>
                            
        </form>
    </>
  )
}
const styles ={
    container: {
        display:'flex',
        flexDirection:'column',
        alignItems: 'center'
    },
    textarea: {
        border: '1ps solid #a9a9a9',
        borderRadius: 5,
        width: 300,
        margin: '20px 0',
        minHeight: 100,
        padding: 10
    },
    button: {
      border: '1ps solid #a9a9a9',
      borderRadius: 5,
      width: 300,
      padding: 10 
    }
}
export default AnimeReview
