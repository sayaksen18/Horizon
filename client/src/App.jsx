import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import InterviewPage from './pages/InterviewPage'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewHistory from './pages/InterviewHistory'
import InterviewReport from './pages/InterviewReport'
import Pricing from './pages/Pricing'
export const ServerUrl = "https://horizon-79ib.onrender.com"

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(`${ServerUrl}/api/user/current-user`, { withCredentials: true });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.error("Error fetching current user:", error);
        dispatch(setUserData(null));
      }
    }
    getUser();
  }, [dispatch]);
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/interview' element={<InterviewPage />} />
      <Route path='/history' element={<InterviewHistory />} />
      <Route path='/report/:id' element={<InterviewReport />} />
      <Route path='/pricing' element={<Pricing />} />
    </Routes>
  )
}

export default App
