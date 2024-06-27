<template>
  <Toast />
  <div class="form">
    <h2>UPDATE USER</h2>
    <form @submit.prevent="submitForm" class="my_form">
      <div v-for="field in fields" :key="field.id">
        <FloatLabel class="input-form">
          <div class="label-input">
            <label :for="field.id">{{ field.label }}</label>
            <InputText
              v-if="field.type !== 'tel'"
              :type="field.type"
              class="input"
              :id="field.id"
              v-model="form[field.model]"
            />
            <InputText
              v-else
              type="tel"
              class="input"
              :id="field.id"
              v-model="form[field.model]"
            />
          </div>
          <div v-if="errors[field.model]" class="error-message">{{ errors[field.model] }}</div>
        </FloatLabel>
      </div>
      <div class="btn">
        <button type="submit" class="submit">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import UserService from '../services/UserService.ts';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const toast = useToast();
    const router = useRouter();
    const route = useRoute();
    const userId = parseInt(route.params.id);

    const form = ref({
      name: '',
      email: '',
      phone: '',
      website: ''
    });

    const errors = ref({});

    const fields = [
      { id: 'name', label: 'Name', model: 'name', type: 'text' },
      { id: 'email', label: 'Email', model: 'email', type: 'text' },
      { id: 'phone', label: 'Phone', model: 'phone', type: 'tel' },
      { id: 'website', label: 'Website', model: 'website', type: 'text' }
    ];

    const validateForm = () => {
      errors.value = {};
      fields.forEach(field => {
        if (!form.value[field.model]) {
          errors.value[field.model] = `${field.label} is required`;
        } else if (field.model === 'email' && !isValidEmail(form.value.email)) {
          errors.value.email = 'Invalid email format';
        }
      });
      return Object.keys(errors.value).length === 0;
    };

    const isValidEmail = email => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    const submitForm = () => {
      if (validateForm()) {
        const updatedUser = {
          id: userId,
          name: form.value.name,
          email: form.value.email,
          phone: form.value.phone,
          website: form.value.website
        };

        UserService.updateUser(updatedUser)
          .then(() => {
            toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User updated successfully',
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

    onMounted(() => {
      if (userId) {
        UserService.getUserById(userId).then(user => {
          form.value = { ...user };
        });
      }
    });

    return {
      form,
      errors,
      fields,
      submitForm,
      validateForm,
      isValidEmail,
      userId,
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
