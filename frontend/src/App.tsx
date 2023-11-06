import './App.css'
import Login from './pages/Login'
import Todos from './pages/Todos';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () =>  {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
