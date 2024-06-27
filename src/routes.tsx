import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login/index';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import NewCredentialDialog from './components/NewCredentialDialog';
import { useAppContext } from './context';
import Loading from './components/Loading';
import Register from './pages/Register';

const AppRoutes = () => {
  const { user } = useAppContext();

  if (user === undefined) {
    return <Loading />;
  };

  const isAuthenticated: boolean = !!user;

  return (
    <div>
      {isAuthenticated && <Navigation />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={(isAuthenticated && user) ? <Navigate to={`/`} /> : <Navigate to="/login" />} />
      </Routes>
      <NewCredentialDialog />
    </div>
  )
}

export default AppRoutes;