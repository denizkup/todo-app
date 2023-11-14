import './App.css'
import Login from './pages/Login'
import Todos from './pages/Todos';
import Users from './pages/Users';
import useChangeTheme from './hooks/theme.hook';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoutes } from './hooks/protectedRoute.hook';
const App = () =>  {
  const {theme} = useChangeTheme()

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
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
