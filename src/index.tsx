import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import Register from './pages/Register';
import Profile from './pages/Profile';
import PostFeed from './pages/PostFeed';
import FriendList from './pages/FriendList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/complete-profile',
    element: <Profile />
  },
  {
    path: '/post-feed',
    element: <PostFeed />
  },
  {
    path: '/friend-list',
    element: <FriendList />
  },
])
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
