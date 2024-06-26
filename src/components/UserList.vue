<template>
  <div class="user-list">
    <div class="user_create">
      <h1>User List</h1>
      <button @click="createUser">Create user</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Delete</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.website }}</td>
          <td>
            <button class="delete" @click="deleteUser(user.id)">Delete</button>
          </td>
          <td><button class="view" @click="viewUser(user.id)">View</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import userData from '../constants/user.json';
import UserService from '../services/UserService.ts';
const router = useRouter();
export default {
  name: 'UserList',
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    viewUser(id) {
      this.$router.replace({ path: `/updateUser/${id}` });
    },
    fetchUsers() {
      UserService.getUsers().then(users => {
        this.users = users;
      });
    },
    editUser(id) {
      // Redirect to edit page or handle edit logic
      console.log(`Editing user with ID: ${id}`);
    },
    deleteUser(id) {
      UserService.deleteUser(id).then(() => {
        this.fetchUsers(); // Refresh user list after deletion
      });
    },
    createUser() {
      this.$router.replace({ path: `/createUser` });
    },
  },
};
</script>

<style scoped>
.user-list {
  width: 100%;
  padding: 20px;
  overflow: hidden;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
.view {
  width: 90%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-left: 5px;
}
.delete {
  width: 90%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding: 4px;
  background-color: red;
  outline: none;
  border: none;
  border-radius: 5px;
}
.user_create {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  button {
    padding: 8px;
    background-color: blue;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>
