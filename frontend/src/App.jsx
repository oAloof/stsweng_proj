import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './views/loginPage'
import PlannerPage from './views/plannerPage'
import RegisterPage from './views/registerPage'
import EmpathyPage from './views/empathyPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/empathy" element={<EmpathyPage />} />
      </Routes>
    </BrowserRouter>
  )
}
