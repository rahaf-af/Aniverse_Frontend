import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router'
import NavBar from './components/NavBar/NavBar'
import Animes from './components/Anime/AnimeIndex/Animes'
import AnimeForm from './components/Anime/AnimeForm/AnimeForm'
import AnimeDetail from './components/Anime/AnimeDetail/AnimeDetail'
import Posts from './components/Post/PostIndex/PostIndex'
import PostDetail from './components/Post/PostDetail/PostDetail'
import PostForm from './components/Post/PostForm/PostForm'
import Signup from './components/Auth/Signup/Signup'
import Login from './components/Auth/Login/Login'
import Home from './components/Main_comp/Home/Home'
import MyProfile from './components/Account/MyProfile/MyProfile'
import ProfileForm from './components/Account/ProfileForm/ProfileForm'
import AnimeReview from './components/Anime/AnimeReview/AnimeReview'
import PostComment from './components/Post/PostComment/PostComment'
import MyAnimeFavoritList from './components/Anime/MyAnimeFavoritList/MyAnimeFavoritList'
import MyPostFavoritList from './components/Post/MyPostFavoritList/MyPostFavoritList'
import ContactForm from './components/Main_comp/ContactForm/ContactForm'
import About from './components/Main_comp/About/About'
import { getUserFromToken } from './lib/auth'
import ProtectedRoute from './components/Auth/ProtectedRoute/'
function App() {
   const [user, setUser] = useState(getUserFromToken())
  return (
    <>
      <BrowserRouter>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
            <Route path = '/' element={<Signup/>}/>
            <Route path = '/login' element={<Login user={user} setUser={setUser}/>}/>
            <Route path = '/myprofile' element={<MyProfile  user={user} setUser={setUser}/>}/>ContactForm
            <Route path = '/editprofile/:profileId' element={<ProfileForm/>}/>
            <Route path = '/home' element={<Home/>}/>
            <Route path = '/about' element={<About/>}/>
            <Route path = '/contacus' element={<ContactForm/>}/>
            <Route path = '/animes' element={<Animes/>}/>
            <Route path = '/anime/:animeId' element={<AnimeDetail  user={user} setUser={setUser}/>}/>
            <Route path = '/addAnime' element={<AnimeForm/>}/>
            <Route path = '/editAnime/:animeId' element={<AnimeForm/>}/>
            <Route path = '/addreview/:animeId' element={<AnimeReview/>}/>
            <Route path = '/myanimefavoritlist' element={<MyAnimeFavoritList/>}/>
            <Route path = '/posts' element={<Posts/>}/>
            <Route path = '/post/:postId' element={<PostDetail user={user} setUser={setUser}/>}/>
            <Route path = '/addPost' element={<PostForm/>}/>
            <Route path = '/editPost/:postId' element={<PostForm/>}/>
            <Route path = '/addcomment/:postId' element={<PostComment/>}/>
            <Route path = '/mypostfavoritlist' element={<MyPostFavoritList/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
