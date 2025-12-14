import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/logout">Logout</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
