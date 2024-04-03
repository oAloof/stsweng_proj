import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './views/loginPage'
import PlannerPage from './views/plannerPage'
import RegisterPage from './views/registerPage'

// CONTEXTS
import { AuthenticationProvider } from './contexts/AuthenticationContext'
import { TasksProvider } from './contexts/TasksContext'

export default function App() {
  return (
    <Router>
      <AuthenticationProvider> 
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

            <Route path="/planner" element={
              <TasksProvider>
                <PlannerPage />
              </TasksProvider>
            } />

        </Routes>
      </AuthenticationProvider>
    </Router>
  )
}
