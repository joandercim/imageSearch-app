import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { AppContext, UserProvider } from '../context/AppContext';
import { useContext } from 'react';

function Layout() {
  const {} = useContext(AppContext)
  return (
    <UserProvider>
      <div className="max-w-[2300px] mx-auto">
        <header>
          <Navigation />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </UserProvider>
  );
}
export default Layout;
