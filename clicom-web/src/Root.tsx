import App from './App.tsx'
import GovernancePage from './GovernancePage.tsx'

export default function Root() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  return path === '/gouvernance-ia' ? <GovernancePage /> : <App />
}