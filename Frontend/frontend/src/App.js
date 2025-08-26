import React from 'react'
import {  BrowserRouter,Routes,Route } from 'react-router-dom'
import ProtectedRoute from './components/protectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './dashboards/AdminDashboard'
import LibrerianDashboard from './dashboards/librerianDashboard'
import StudentDashboard from './dashboards/studentDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path='/admin' element={
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path='/librarian' element={
          <ProtectedRoute roles={['librarian']}>
            <LibrerianDashboard/>
          </ProtectedRoute>
        } />
        <Route path='/student' element={
          <ProtectedRoute roles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App