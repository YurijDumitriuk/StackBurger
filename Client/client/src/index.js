import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Login from "./routes/Login";
import Registration from "./routes/Registration";
import Profile from "./routes/Profile"
import ProfileHistory from "./routes/ProfileHistory"
import Constructor from './routes/Constructor';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile_history" element={<ProfileHistory />} />
        <Route path="constructor" element={<Constructor />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>,
  rootElement
);
