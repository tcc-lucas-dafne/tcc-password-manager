import './App.css';
import AppProvider from './context';
import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <AppRoutes />
        <ToastContainer />
      </AppProvider>
    </div>
  );
}

export default App;
