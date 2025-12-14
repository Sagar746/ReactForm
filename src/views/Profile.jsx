import { useState, useEffect } from 'react';
import { useUser } from '../hooks/apiHooks.jsx';

const Profile = () => {
  const { getUserByToken } = useUser();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please login.');
        return;
      }

      try {
        const userData = await getUserByToken(token);
        setUser(userData);
      } catch (err) {
        setError('Failed to fetch user data: ' + err.message);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return (
      <div>
        <h1>Profile</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <h1>Profile</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.user_id}</p>
        <p><strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Profile;
