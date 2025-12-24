import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import CommunityGrid from "./components/Home/CommunityGrid";
import CommunityAbout from "./components/Pages/CommunityAbout";
//import Logout from "./components/Pages/Logout";
import Login from "./components/Pages/Login";
import './App.css';
import Signup from "./components/Pages/SignUp";
import PrivateRoute from "./components/Routes/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* 🌐 Public Routes WITH Layout */}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/communities"
        element={
          <Layout>
            <CommunityGrid />
          </Layout>
        }
      />

      {/* 🔐 Protected Route */}
      <Route
        path="/community/:slug"
        element={
          <PrivateRoute>
            <Layout>
              <CommunityAbout />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* 🔓 Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
     {//<Route path="/logout" element={<Logout />} />
     } 
    </Routes>
  );
}

export default App;
