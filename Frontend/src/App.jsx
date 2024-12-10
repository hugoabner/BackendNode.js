import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
