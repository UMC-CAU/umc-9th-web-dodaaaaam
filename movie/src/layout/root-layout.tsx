import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

const RootLayout = () => {
  return (
    <div className="bg-white text-black">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;