<template>
  <div class="details">
    <h2>USER DETAILS</h2>
    <div v-if="IndividualUser" class="details_user">
      <p><strong>ID:</strong> {{ IndividualUser.id }}</p>
      <p><strong>Name:</strong> {{ IndividualUser.name }}</p>
      <p><strong>Username:</strong> {{ IndividualUser.username }}</p>
      <p><strong>Email:</strong> {{ IndividualUser.email }}</p>
      <p><strong>Phone:</strong> {{ IndividualUser.phone }}</p>
      <p><strong>Website:</strong> {{ IndividualUser.website }}</p>
      <p>
        <strong>Address:</strong> {{ IndividualUser.address.street }},
        {{ IndividualUser.address.suite }}, {{ IndividualUser.address.city }},
        {{ IndividualUser.address.zipcode }}
      </p>
      <p><strong>Company:</strong> {{ IndividualUser.company.name }}</p>
    </div>
    <div v-else>
      <p>User not found.</p>
    </div>
  </div>
</template>

<script>
import userData from '../constants/user.json';

export default {
  name: 'UserDetails',
  data() {
    return {
      IndividualUser: null,
    };
  },
  created() {
    console.log('routes', this.$route);
    const userId = parseInt(this.$route.params.id);
    this.IndividualUser = userData.find(user => user.id === userId);
  },
};
</script>

<style lang="scss" scoped>
.details {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  .details_user {
    padding: 20px;

    border-radius: 20px;
    -webkit-box-shadow: -8px -3px 28px -17px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -8px -3px 28px -17px rgba(0, 0, 0, 0.75);
    box-shadow: -8px -3px 28px -17px rgba(0, 0, 0, 0.75);
  }
}
</style>
