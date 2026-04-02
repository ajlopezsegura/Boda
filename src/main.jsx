import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { ProjectProvider } from './context/ProjectContext'
import { LangProvider } from './context/LangContext'
import { CompareProvider } from './context/CompareContext'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <LangProvider>
        <ProjectProvider>
          <CompareProvider>
            <App />
          </CompareProvider>
        </ProjectProvider>
      </LangProvider>
    </HashRouter>
  </React.StrictMode>
)
