import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import {routers} from './router';


const app = createApp(App)

app.use(createPinia())
app.use(routers)

app.mount('#app')
