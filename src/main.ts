import './main.scss';
import 'vue-toast-notification/dist/theme-default.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification';

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(pinia).use(ToastPlugin)

app.mount('#app')
