import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style/admin.css'
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { UserContextProvider } from './hooks/contextPatient';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <React.StrictMode>
    <HashRouter>
    <App />
    </HashRouter>
    
  </React.StrictMode>
  </UserContextProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals