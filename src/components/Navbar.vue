<template>
  <nav class="navbar">
    <Menubar :model="items" />
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Menubar from 'primevue/menubar';
import userData from '../constants/user.json';
import UserService from '../services/UserService.ts';
console.log('userservice', UserService.getUsers());
const sortedUser = userData
  ?.sort((a, b) => a.name.localeCompare(b.name))
  .slice(0, 3);
items: userData.map(user => ({
  label: user.name,
  url: '../dashboard',
}));
const router = useRouter();

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push('/');
    },
  },
  {
    label: 'Users',
    icon: 'pi pi-users',
    command: () => {
      router.push('/users');
    },
  },
  {
    label: 'User List',
    icon: 'pi pi-cog',
    items: sortedUser?.map(user => ({
      label: user.name,
      url: `/usersdetails/${user?.id}`,
    })),
  },
]);
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 1rem;
  with: 100%;
}

.navbar .p-menubar {
  border: none;
  background: none;
}

.navbar .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link {
  color: #ecf0f1;
  font-weight: bold;
}

.navbar .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link:hover {
  background-color: #34495e;
}

.navbar
  .p-menubar
  .p-menubar-root-list
  > .p-menuitem.p-menuitem-active
  > .p-menuitem-link {
  background-color: #34495e;
}

.navbar .p-menubar .p-submenu-list > .p-menuitem > .p-menuitem-link {
  color: #ecf0f1;
}

.navbar .p-menubar .p-submenu-list > .p-menuitem > .p-menuitem-link:hover {
  background-color: #34495e;
}
</style>
