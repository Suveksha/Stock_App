import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import Feed from './components/Feed'
import NavBar from './components/NavBar'
import Details from './components/Details'

function App() {

  return (
    <>
    <NavBar />
    <div className=''>
       <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/feed" element={<Feed/>}/>
      <Route path="/stock/:name" element={<Details/>}/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </div>
    </>
  )
}

export default App
