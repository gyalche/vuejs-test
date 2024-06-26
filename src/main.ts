import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Menubar from 'primevue/menubar';
import router from './router';
import InputText from 'primevue/inputtext';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.component('Menubar', Menubar);
app.component('InputText', InputText);
app.use(router);
app.use(ToastService);
app.component('Toast', Toast);
app.mount('#app');
