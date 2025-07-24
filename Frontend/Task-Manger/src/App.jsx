import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Dashboard from "./pages/Admin/Dashboard";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ManageTask from "./pages/Admin/MangaeTask";
import CreateTask from"./pages/Admin/CreateTask"
import ManageUsers from "./pages/Admin/ManageUsers";
import UserDashboard from './pages/User/UserDashboard';
import MyTasks from "./pages/User/MyTasks";
import Viewtaskdetails from './pages/User/Viewtaskdetails';
import PrivateRoute from './routes/PrivateRoute';
import NotFound from './pages/Auth/NotFound';
const App = () => {
  return (
    <div>
     
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>

          {/* for admin route */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/tasks" element={<ManageTask />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>

          {/* for User route */}  
          <Route element={<PrivateRoute allowedRoles={["user"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<MyTasks />} />
            <Route path="/user/task-details/:id" element={<Viewtaskdetails />} />

          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>

      
    </div>

  )
}

export default App