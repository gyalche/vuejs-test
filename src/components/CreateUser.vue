<template>
  <Toast />
  <div class="form">
    <h2>CREATE USERS</h2>
    <form @submit.prevent="submitForm" class="my_form">
      <FloatLabel class="input-form">
        <div class="label-input">
          <label for="name">Name</label>
          <InputText class="input" id="name" v-model="form.name" />
        </div>
        <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
      </FloatLabel>
      <FloatLabel class="input-form">
        <div class="label-input">
          <label for="email">Email</label>
          <InputText class="input" id="email" v-model="form.email" />
        </div>
        <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
      </FloatLabel>
      <FloatLabel class="input-form">
        <div class="label-input">
          <label for="phone">Phone</label>
          <InputText type="tel" class="input" id="phone" v-model="form.phone" />
        </div>
        <div v-if="errors.phone" class="error-message">{{ errors.phone }}</div>
      </FloatLabel>
      <FloatLabel class="input-form">
        <div class="label-input">
          <label for="website">Website</label>
          <InputText class="input" id="website" v-model="form.website" />
        </div>
        <div v-if="errors.website" class="error-message">
          {{ errors.website }}
        </div>
      </FloatLabel>
      <div class="btn">
        <button type="submit" class="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import UserService from '../services/UserService.ts';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

export default {
  setup() {
    const toast = useToast();
    const router = useRouter();
    const form = ref({
      name: '',
      email: '',
      phone: '',
      website: ''
    });
    const errors = ref({});

    const validateForm = () => {
      errors.value = {};
      if (!form.value.name) {
        errors.value.name = 'Name is required';
      }
      if (!form.value.email) {
        errors.value.email = 'Email is required';
      } else if (!isValidEmail(form.value.email)) {
        errors.value.email = 'Invalid email format';
      }
      if (!form.value.phone) {
        errors.value.phone = 'Phone is required';
      }
      if (!form.value.website) {
        errors.value.website = 'Website is required';
      }
      return Object.keys(errors.value).length === 0;
    };

    const isValidEmail = email => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    const submitForm = () => {
      if (validateForm()) {
        const newUser = {
          name: form.value.name,
          email: form.value.email,
          phone: form.value.phone,
          website: form.value.website
        };

        UserService.createUser(newUser)
          .then(() => {
            toast.add({
              severity: 'success',
              detail: 'User created successfully',
              life: 3000,
            });
            setTimeout(() => {
            router.replace({ path: '/users' });
            resetForm();
            }, 1000);
          })
          .catch(error => {
            toast.add({
              severity: 'error',
              summary: 'Error',
              detail: error.message,
              life: 3000,
            });
          });
      } else {
        console.log('Form validation failed');
      }
    };

    const resetForm = () => {
      form.value = {
        name: '',
        email: '',
        phone: '',
        website: ''
      };
      errors.value = {};
    };

    return {
      form,
      errors,
      submitForm,
      validateForm,
      isValidEmail,
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .my_form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .btn {
    width: 100px;
  }

  .submit {
    padding: 4px 8px;
    cursor: pointer;
  }
}

.input-form {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2px;

  .label-input {
    gap: 1px;
    display: flex;
    align-items: center;
  }

  label {
    font-weight: bold;
    min-width: 100px;
  }
}

.error-message {
  color: red;
  margin-top: 5px;
}

.input {
  background-color: white;
  color: black;
}
</style>
