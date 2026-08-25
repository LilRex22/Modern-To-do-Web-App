
import { createRoot } from 'react-dom/client'
import Login from './pages/login'
import './index.css'
import Layout from './components/layout';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/dashboard';
import TodayView from './pages/todayTask';
import UpcomingView from './pages/upcomingTask';
import AllTask from './pages/allTask';
import SignUp from './pages/signUp';
import CompletedTask from './pages/completedTask';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='signUp' element={<SignUp />} />
        <Route path="dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='today' element={<TodayView />} />
          <Route path='upcoming' element={<UpcomingView />} />
          <Route path='all' element={<AllTask />} />
          <Route path='completed' element={<CompletedTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App; 
createRoot(document.getElementById('root')).render(<App />)
