import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import Bike from "./components/Bike";
import Station from "./components/Station";

const root = ReactDOM.createRoot(document.getElementById('root'));

//root.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>
//);

root.render(
	<BrowserRouter>
		<Routes>
			<Route path="*" element={<App />} />
			<Route path="/find/*" element={<Bike />} />
			<Route path="/station/*" element={<Station />} />
		</Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
