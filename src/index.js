import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

if(localStorage.getItem('userToken')){
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
}

ReactDOM.render (
  <BrowserRouter>
       <App />
  </BrowserRouter>,
  document.getElementById('root')
);
