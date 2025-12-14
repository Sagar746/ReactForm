import { mockApi } from './mockApi.jsx';

// Set to true to use mock API (for testing without network connection)
const USE_MOCK_API = true;

const fetchData = async (url, options = {}) => {
  try {
    console.log('Fetching:', url);
    const response = await fetch(url, options);

    // Check if response has content before parsing JSON
    const contentType = response.headers.get('content-type');
    let json;

    if (contentType && contentType.includes('application/json')) {
      json = await response.json();
    } else {
      const text = await response.text();
      console.log('Non-JSON response:', text);
      json = { message: text };
    }

    if (!response.ok) {
      const message = json.message || json.error || 'An error occurred';
      throw new Error(message);
    }

    return json;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    if (USE_MOCK_API) {
      console.log('Using MOCK API for login');
      return await mockApi.login(inputs.username, inputs.password);
    }

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    console.log('API URL:', import.meta.env.VITE_AUTH_API + '/auth/login');
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions
    );

    return loginResult;
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (token) => {
    if (USE_MOCK_API) {
      console.log('Using MOCK API for getUserByToken');
      return await mockApi.getUserByToken(token);
    }

    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const userData = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions
    );
    return userData;
  };

  const postUser = async (inputs) => {
    if (USE_MOCK_API) {
      console.log('Using MOCK API for register');
      return await mockApi.register(inputs.username, inputs.email, inputs.password);
    }

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    console.log('API URL:', import.meta.env.VITE_AUTH_API + '/users');
    const userResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions
    );
    return userResult;
  };

  return { getUserByToken, postUser };
};

export { useAuthentication, useUser };
