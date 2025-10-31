import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { Toaster } from 'react-hot-toast'
import { TransitionProvider } from './context/TransitionContext.jsx'
import { HelmetProvider } from 'react-helmet-async'

// Theme is managed by ThemeProvider (defaults to system preference)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <TransitionProvider>
          <App />
        </TransitionProvider>
        <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
            color: '#f1f5f9',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#f1f5f9',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#f1f5f9',
            },
          },
        }}
        />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
)


