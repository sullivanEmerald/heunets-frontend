import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './auth/pages/login'
import Register from './auth/pages/register'
import AuthGuard from './auth/layout/guard'
import Home from './pages/home'

function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/auth' element={<AuthGuard />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
