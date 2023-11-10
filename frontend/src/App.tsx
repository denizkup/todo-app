import './App.css'
import Login from './pages/Login'
import Todos from './pages/Todos';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoutes } from './hooks/protectedRoute.hook';
const App = () =>  {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes/>}>
           <Route path="/" element={<Todos />} />
           <Route path="/todos" element={<Todos />} />

          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
