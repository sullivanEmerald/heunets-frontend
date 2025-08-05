import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './auth/pages/login'
import Register from './auth/pages/register'
import AuthGuard from './auth/layout/guard'
import Home from './pages/home'
import { RoleGuard } from './guards/role-guard'
import ContributorsDashBoard from './components/contributors/dashboard'

function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/auth' element={<AuthGuard />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/contributor" element={<RoleGuard role="contributor" />}>
        <Route path='dashboard' element={<ContributorsDashBoard />} />
        {/* <Route path="other" element={<OtherContributorPage />} /> */}
      </Route>
    </Routes>
  )
}

export default App
