<template>
  <div class="dashboard">
    <h1>Total number of users</h1>
    <h2 class="total_users" @mouseover="showNames" @mouseleave="hideNames">
      {{ totalUser }}
    </h2>
    <ul class="names" v-show="namesVisible">
      <li v-for="(name, index) in usersName" :key="index">{{ name }}</li>
    </ul>
  </div>
</template>

<script>
import userData from '../constants/user.json';
import UserService from '../services/UserService.ts';
console.log('username', UserService.getUsersName());
export default {
  name: 'Dashboard',
  data() {
    return {
      totalUser: 0,
      usersName: UserService.getUsersName(),
      namesVisible: false,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      UserService.getUsers().then(users => {
        this.totalUser = users?.length || 0;
      });
    },
    showNames() {
      this.namesVisible = true;
    },
    hideNames() {
      this.namesVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  h2 {
    text-decoration: underline;
    cursor: pointer;
  }
  ul {
    padding: 0;
  }

  li {
    margin: 5px 0;
  }
}
</style>
