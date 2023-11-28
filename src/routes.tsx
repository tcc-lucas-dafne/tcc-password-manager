import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login/index';
import Home from './pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/:id" element={<Home />} />
    </Routes>
  )
}

export default AppRoutes;