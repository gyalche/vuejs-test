import userData from '../constants/user.json';

let users = [...userData]; // Make a copy of user data

// Generate unique ID for new users
let nextId = Math.max(...users.map(user => user.id)) + 1;

// CRUD operations
export default {
  // Retrieve all users
  getUsers() {
    return Promise.resolve(users);
  },
  getUsersName() {
    const user = users.map(user => user.name);
    return user;
  },
  // Retrieve a single user by ID
  getUserById(id: any) {
    const user = users.find(user => user.id === parseInt(id));
    return Promise.resolve(user);
  },

  // Create a new user
  createUser(newUser: any) {
    newUser.id = nextId++;
    users.push(newUser);
    return Promise.resolve(newUser);
  },

  // Update an existing user
  updateUser(updatedUser: any) {
    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      users.splice(index, 1, updatedUser);
      return Promise.resolve(updatedUser);
    }
    return Promise.reject(new Error('User not found'));
  },

  // Delete a user
  deleteUser(id: any) {
    users = users.filter(user => user.id !== parseInt(id));
    return Promise.resolve({ message: 'User deleted successfully' });
  },
};
