import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.css'
import './styles/global.css'
import router from "./router";


const app = createApp(App)

app.use(router)
app.mount('#app')
