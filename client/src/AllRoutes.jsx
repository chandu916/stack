import React from 'react'
import {Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'
import Saved from './pages/Saved/Saved'
import Products from './pages/Products/Products'
import ForTeams from './pages/ForTeams/ForTeams'
import Search from './pages/Search/Search'

const AllRoutes = ({ isDarkTheme, toggleTheme, slideIn, onCloseSidebar, handleSlideIn }) => {
  return (
    <Routes>
        <Route path='/' element={<Home slideIn={slideIn} onClose={onCloseSidebar}/>}/>
        <Route path='/Auth' element={<Auth/>}/>
        <Route path='/Questions' element={<Questions slideIn={slideIn} onClose={onCloseSidebar}/>}/>
        <Route path='/AskQuestion' element={<AskQuestion/>}/>
        <Route path='/Questions/:id' element={<DisplayQuestion/>}/>
        <Route path='/Saved' element={<Saved slideIn={slideIn} onClose={onCloseSidebar}/>}/>
        <Route path='/Products' element={<Products slideIn={slideIn} onClose={onCloseSidebar}/>}/>
        <Route path='/ForTeams' element={<ForTeams slideIn={slideIn} onClose={onCloseSidebar}/>}/>
        <Route path='/Search' element={<Search slideIn={slideIn} onClose={onCloseSidebar}/>}/>
        <Route path="/Tags" element={<Tags slideIn={slideIn} onClose={onCloseSidebar}/>}/>
        <Route path="/Users" element={<Users slideIn={slideIn} onClose={onCloseSidebar}/>}/>
        <Route
          path="/Users/:id"
          element={<UserProfile
            isDarkTheme={isDarkTheme}
            toggleTheme={toggleTheme}
            slideIn={slideIn}
            handleSlideIn={handleSlideIn}
            onClose={onCloseSidebar}
          />}
        />
    </Routes>
  );
}

export default AllRoutes
