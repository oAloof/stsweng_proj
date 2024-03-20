import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './views/loginPage'
import PlannerPage from './views/plannerPage'
import RegisterPage from './views/registerPage'
import EmpathyPage from './views/empathyPage'

// CONTEXTS
import { AuthenticationProvider } from './contexts/AuthenticationContext'

export default function App() {
  return (
    <Router>
      <AuthenticationProvider> 
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AuthenticationProvider>
    </Router>
  )
}
