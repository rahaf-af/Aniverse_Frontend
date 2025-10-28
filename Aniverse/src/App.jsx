import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router'
import Animes from './components/AnimeIndex/Animes'
import AnimeForm from './components/AnimeIndex/AnimeForm'
import AnimeDetail from './components/AnimeIndex/AnimeDetail'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path = '/animes' element={<Animes/>}/>
            <Route path = '/anime/:animeId' element={<AnimeDetail/>}/>
            <Route path = '/addAnime' element={<AnimeForm/>}/>
            
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
