import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import Accueil from './pages/Accueil';
import Register from './pages/Register';
import Topbar from './components/Topbar';
import Rightbar from './components/Rightbar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Register />
      </div>
    </BrowserRouter>
    
  );
}

export default App;
