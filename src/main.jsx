import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Hệ thống CRM đã có bản cập nhật mới. Tải lại trang để áp dụng?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('CRM đã sẵn sàng hoạt động ngoại tuyến.')
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
