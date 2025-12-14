import useForm from '../hooks/formHooks.jsx';
import { useAuthentication } from '../hooks/apiHooks.jsx';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const { postLogin } = useAuthentication();

  const initValues = {
    username: "",
    password: "",
  };

  const doLogin = async () => {
    console.log(inputs);
    try {
      const loginResult = await postLogin(inputs);
      console.log('Login result:', loginResult);
      
      if (loginResult.token) {
        localStorage.setItem('token', loginResult.token);
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Login failed: ' + error.message);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    doLogin,
    initValues
  );

  console.log(inputs);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
