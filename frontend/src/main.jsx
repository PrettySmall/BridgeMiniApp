import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Root from './Root'
import './index.css'
import AppProvider from './contexts/AppContext'
import { WebsocketProvider } from './contexts/WebsocketProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <WebsocketProvider>
        <Root />
      </WebsocketProvider>
    </AppProvider>
  </StrictMode>,
)
