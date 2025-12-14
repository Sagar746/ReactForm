// Mock API for testing when not connected to Metropolia network
const mockUsers = [];
let mockToken = 'mock-jwt-token-12345';

export const mockApi = {
  async login(username, password) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    const user = mockUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
      return {
        token: mockToken,
        message: 'Login successful',
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email
        }
      };
    }
    
    throw new Error('Invalid credentials');
  },

  async register(username, email, password) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    // Check if user already exists
    if (mockUsers.find(u => u.username === username)) {
      throw new Error('Username already exists');
    }
    
    if (mockUsers.find(u => u.email === email)) {
      throw new Error('Email already exists');
    }
    
    const newUser = {
      user_id: mockUsers.length + 1,
      username,
      email,
      password,
      created_at: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    
    return {
      message: 'User created',
      user: {
        user_id: newUser.user_id,
        username: newUser.username,
        email: newUser.email
      }
    };
  },

  async getUserByToken(token) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    if (token !== mockToken) {
      throw new Error('Invalid token');
    }
    
    // Return the last registered user or a default user
    const user = mockUsers.length > 0 
      ? mockUsers[mockUsers.length - 1]
      : {
          user_id: 1,
          username: 'testuser',
          email: 'test@example.com',
          created_at: new Date().toISOString()
        };
    
    return {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      created_at: user.created_at
    };
  }
};
