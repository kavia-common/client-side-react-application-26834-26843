import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './modules/app/App';
import HomePage from './modules/home/HomePage';
import AboutPage from './modules/about/AboutPage';
import AnalysisPage from './modules/analysis/AnalysisPage';
import './styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'analysis', element: <AnalysisPage /> },
      { path: 'about', element: <AboutPage /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
