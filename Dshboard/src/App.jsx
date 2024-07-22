import React, { useContext,useEffect } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Dashboard from './components/Dashboard';
import AddNewAdmin from './components/AddNewAdmin';
import AddNewDoctor from './components/AddNewDoctor';
import Doctors from './components/Doctors';
import Login from './components/Login';
import Message from './components/Message';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from './main';
import Sidebar from './components/Sidebar'
import axios from 'axios';
import './App.css'
const App = () => {

const {isAuthenticated,setisAuthenticated,setAdmin}=useContext(Context);
useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/admin/me",
        { withCredentials: true }
      );
      setisAuthenticated(true);
      setAdmin(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user",error);
      setisAuthenticated(false);
      setAdmin({});
    }
  };
  fetchUser();
}, [isAuthenticated]);


  return (
      <>
      <Router>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/admin/addnew' element={<AddNewAdmin/>}/>
          <Route path='/doctor/addnew' element={<AddNewDoctor/>}/>
          <Route path='/doctors' element={<Doctors/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/messages' element={<Message/>}/>
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
      
      
      </>  
  )
}

export default App
