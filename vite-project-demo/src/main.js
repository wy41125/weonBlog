import { createApp } from 'vue'
import './style.css'
import { Button, Drawer } from 'ant-design-vue';
import App from './App.vue'

const app = createApp(App)

app.use(Button).use(Drawer).mount('#app')
