import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Dashboard.vue';
import Users from '../components/UserList.vue';
import UserDetails from '../components/UserDetails.vue';
import CreateUser from '../components/CreateUser.vue';
import UpdateUser from '../components/UpdateUser.vue';

const routes = [
  { path: '/', component: Home },
  {
    path: '/users',
    component: Users,
  },
  {
    path: '/usersdetails/:id',
    component: UserDetails,
  },
  {
    path: '/createUser',
    component: CreateUser,
  },
  {
    path: '/updateUser/:id',
    component: UpdateUser,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
