import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import '../node_modules/flexboxgrid/css/flexboxgrid.min.css'
import './styles/rsuite-custom.less'
import 'react-toastify/dist/ReactToastify.min.css'
import './styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
