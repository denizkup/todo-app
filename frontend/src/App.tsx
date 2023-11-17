import './App.css'
import Login from './pages/Login'
import Todos from './pages/Todos';
import Users from './pages/Users';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoutes } from './hooks/protectedRoute.hook';
const App = () =>  {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoutes auth_level="USER"/>}>
           <Route path="/" element={<Todos />} />
          </Route>
          <Route element={<ProtectedRoutes auth_level="ADMIN"/>}>
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
