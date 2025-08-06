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
import VolunteerDashboard from './components/volunteers/dashboard'
import ViewMore from './components/volunteers/view-more'


function App() {

  return (
    <Routes>
      {/* <button onClick={() => {
        localStorage.clear();
        navigate('/auth/login')
      }}>logout</button> */}
      <Route path="/" element={<Home />} />
      <Route path='/auth' element={<AuthGuard />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/contributor" element={<RoleGuard role="contributor" />}>
        <Route path='dashboard' element={<ContributorsDashBoard />} />
        <Route path="my-posted-tasks" element={<Contibutortasks />} />
        {/* <Route path="my-posted-tasks/:id" element={<Task />} /> */}
        <Route path="tasks/:id/applications" element={<Task />} />
      </Route>

      <Route path="/volunteer" element={<RoleGuard role="volunteer" />}>
        <Route path='dashboard' element={<VolunteerDashboard />} />
        <Route path="tasks/:id" element={<ViewMore />} />
      </Route>
    </Routes>
  )
}

export default App
