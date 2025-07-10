import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { routerConfig } from './app/router/router'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider
      router={routerConfig} />
  </React.StrictMode>
)
