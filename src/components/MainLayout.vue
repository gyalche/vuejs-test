<script setup>
import Navbar from '../components/Navbar.vue';
</script>

<template>
  <div class="main-layout">
    <header>
      <Navbar />
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
};
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100%;
}

main {
  flex: 1;
  padding: 1rem;
}
</style>
