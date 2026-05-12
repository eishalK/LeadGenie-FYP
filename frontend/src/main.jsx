import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; 
import store from './app/store';
import './index.css';
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#140b2d",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
          success: {
            iconTheme: {
              primary: "#f97316",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
  </React.StrictMode>
)
