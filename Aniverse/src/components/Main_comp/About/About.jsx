import React from 'react'
import { Link } from 'react-router'
import {FaTwitter,FaGithub, FaLinkedin, FaDiscord , FaTelegram} from 'react-icons/fa'
import './About.css'
function About() {
  return (
    <>
      <div className='aboutcontent'>
        <h1>About Aniverse</h1>
        <div className='aboutintro'>
          <h2>Welcome to Aniverse✨</h2>
          <p>On our website, we've gathered the world of anime in one place!<br/>Our goal is to help every anime lover discover, follow, and share their passion with ease..</p> 
        </div>
        <hr color='grey'></hr>
        <div className='aboutwho'>
          <h2>who are we 👩🏽‍💻</h2>
          <p>A team of anime enthusiasts brought together by our love for this world<br/> 
          on this website to provide users with a new and enjoyable experience.</p>
        </div>
        <hr color='grey'></hr>
        <div className='aboutboxes'>
          <div className='box1'>
            <img src='mission.PNG'></img>
            <p><strong>Mission</strong><br/>Our Mission is to create an interactive community for anime lovers united by passion and unique content.</p>
          </div>
          <div className='box2'>
            <img src='Vision.PNG'></img>
            <p><strong>Vision</strong><br/>Our vision is to become the leading platform in the Arab world for anime lovers covering all aspects from news to reviews and recommendations.</p>
          </div>
          <div className='box3'>
            <img src='features.PNG'></img>
            <p><strong>Features</strong><br/>We pay attention to every detail, from website design to anime selection to user comfort while browsing.</p>
          </div>
        </div>
        <hr color='grey'></hr>
        <div className='socialdiv'>
          <h3>You can contact us via our contact form: <Link to={'/contacus'}>Contact us</Link></h3>
          <h2>Or via social media</h2>
          <div className='social'>
            <a href='https://www.linkedin.com/authwall?trk=bf&trkInfo=AQFTW3Xf_nr-kwAAAZpUV4BgHZrTgqTAjRl-G2IWMtMbdbKOR40Jq0KdT2wS1d9kvM54DeMiNb74n6Xl3TuKuHnzB1zLLZ3aXEO69H2C9icSN08DN7d-wBCgap4qxE_knGo47FQ=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Frahaffalatah%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dios_app'><FaLinkedin size={40} color='grey'/></a>
            <a href='https://github.com/rahaf-af'><FaGithub size={40} color='grey'/></a>
            <a href='https://x.com/rahaf_20146?s=11'><FaTwitter size={40} color='grey'/></a>
            <a href='https://discord.gg/fRZPPaY7'><FaDiscord size={40} color='grey'/></a>
          </div>
        </div>
      </div>
    </>
  )
}

export default About