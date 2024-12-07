import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'

function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter