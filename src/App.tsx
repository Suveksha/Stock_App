import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import Feed from './components/Feed'
import NavBar from './components/NavBar'
import Details from './components/Details'
import ProtectedRoute from './components/ProtectedRoute'
import { useEffect } from 'react'
import { restoreUser } from './store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import StockTable from './components/StockTable'

function App() {
  const dispatch = useDispatch();
const user = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    dispatch(restoreUser()); // ✅ restores from cookie on reload
  }, [dispatch]);


  useEffect(()=>{
    console.log("Restore User",user)
  },[user])

  return (
    <>
    <NavBar />
    <div className=''>
       <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/feed" element={<ProtectedRoute>
        <Feed/>
      </ProtectedRoute>}/>
      <Route path="/stock/:symbol" element={<ProtectedRoute><Details /></ProtectedRoute>}/>
      <Route path="/stock/all" element={<ProtectedRoute><StockTable /></ProtectedRoute>}/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </div>
    </>
  )
}

export default App
