import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './views/loginPage'
import PlannerPage from './views/plannerPage'
import RegisterPage from './views/registerPage'
import AccountPage from './views/accountPage'
import DashboardPage from './views/dashboardPage'

// CONTEXTS
import { AuthenticationProvider } from './contexts/AuthenticationContext'
import { TasksProvider } from './contexts/TasksContext'
import { EditProvider } from './contexts/EditContext'

export default function App () {
  return (
    <Router>
      <AuthenticationProvider>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route
            path='/planner' element={
              <TasksProvider>
                <PlannerPage />
              </TasksProvider>
            }
          />
          <Route path='/accounts' element={<TasksProvider><EditProvider><AccountPage /></EditProvider></TasksProvider>} />
          <Route path='/dashboard' element={<TasksProvider><DashboardPage /></TasksProvider>} />
        </Routes>
      </AuthenticationProvider>
    </Router>
  )
}
