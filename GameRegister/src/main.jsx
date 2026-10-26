import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Regis from './REG/Regis.jsx'
import Fie from "./Input/Fie.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Regis" element={<Regis />} />
       <Route path="/Fie" element={<Fie />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
