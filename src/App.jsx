import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './views/Layout.jsx';
import Home from './views/Home.jsx';
import Profile from './views/Profile.jsx';
import Login from './views/Login.jsx';
import Logout from './views/Logout.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
