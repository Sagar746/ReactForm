import useForm from '../hooks/formHooks.jsx';
import { useUser } from '../hooks/apiHooks.jsx';

const RegisterForm = () => {
  const { postUser } = useUser();

  const initValues = {
    username: "",
    email: "",
    password: "",
  };

  const doRegister = async () => {
    console.log(inputs);
    try {
      const registerResult = await postUser(inputs);
      console.log('Register result:', registerResult);
      alert('Registration successful! You can now login.');
    } catch (error) {
      console.error('Registration failed:', error.message);
      alert('Registration failed: ' + error.message);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    doRegister,
    initValues
  );

  console.log(inputs);

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registeruser">Username</label>
          <input
            name="username"
            type="text"
            id="registeruser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="registeremail">Email</label>
          <input
            name="email"
            type="email"
            id="registeremail"
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="registerpassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="new-password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
