import { useState } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <div>
        <button type="button" onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>
      {showLogin ? <LoginForm /> : <RegisterForm />}
    </>
  );
};

export default Login;
