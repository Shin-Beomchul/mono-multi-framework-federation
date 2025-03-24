import { createApp } from 'vue'
import App from './App.vue'

const mount = (container) => {
  if (!container) {
    console.error('No container found to mount the app.')
    return
  }
  createApp(App).mount(container)
}

export { mount }
