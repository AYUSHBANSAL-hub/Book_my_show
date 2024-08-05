import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {AppContextProvider} from './contexts/AppContext';

const firebaseConfig = {
  apiKey: "AIzaSyALuLSKz7yNKbdk3t3kAHfs1ODnmygpdjQ",
    authDomain: "bookmyshow-5a00b.firebaseapp.com",
    projectId: "bookmyshow-5a00b",
    storageBucket: "bookmyshow-5a00b.appspot.com",
    messagingSenderId: "696353441992",
    appId: "1:696353441992:web:3d682155c2f61541c77dfd",
    measurementId: "G-MLVGY89LDF"
};


ReactDOM.render(
  <React.StrictMode>
    

    <AppContextProvider value={{}}>
    <BrowserRouter>
    
      <App />
    
    </BrowserRouter>
    </AppContextProvider>
  
  </React.StrictMode>,
  document.getElementById('root')
);
