import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router'
import NavBar from './components/NaavBar/NavBar'
import Animes from './components/Anime/AnimeIndex/Animes'
import AnimeForm from './components/Anime/AnimeForm/AnimeForm'
import AnimeDetail from './components/Anime/AnimeDetail/AnimeDetail'
import Posts from './components/Post/PostIndex/PostIndex'
import PostDetail from './components/Post/PostDetail/PostDetail'
import PostForm from './components/Post/PostForm/PostForm'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path = '/signup' element={<Signup/>}/>
            <Route path = '/login' element={<Login/>}/>
            <Route path = '/animes' element={<Animes/>}/>
            <Route path = '/anime/:animeId' element={<AnimeDetail/>}/>
            <Route path = '/addAnime' element={<AnimeForm/>}/>
            <Route path = '/editAnime/:animeId' element={<AnimeForm/>}/>
            <Route path = '/posts' element={<Posts/>}/>
            <Route path = '/post/:postId' element={<PostDetail/>}/>
            <Route path = '/addPost' element={<PostForm/>}/>
            <Route path = '/editPost/:postId' element={<PostForm/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
