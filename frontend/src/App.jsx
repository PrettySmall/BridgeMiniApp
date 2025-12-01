import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'

import Layout from '@/layouts/Layout'
import Exchange from './pages/Exchange'
import Order from './pages/Order'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Layout}>
          <Route path="/" Component={Exchange} />
          <Route path="/order/:order_id" Component={Order} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer
        autoClose={5000}
        hideProgressBar
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </BrowserRouter>
  )
}
