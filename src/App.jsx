import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './auth/pages/login'
import Register from './auth/pages/register'
import AuthGuard from './auth/layout/guard'
import Home from './pages/home'
import { RoleGuard } from './guards/role-guard'
import ContributorsDashBoard from './components/contributors/dashboard'
import Contibutortasks from './components/contributors/tasks'
import Task from './components/contributors/task'

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
        <Route path="my-posted-tasks" element={<Contibutortasks />} />
        <Route path="my-posted-tasks/:id" element={<Task />} />
      </Route>
    </Routes>
  )
}

export default App
