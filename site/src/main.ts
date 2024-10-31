import '@unocss/reset/tailwind.css'
import 'uno.css'
import { mount } from 'svelte'
import App from './App.svelte'

const target = document.querySelector('#app')!

const app = mount(App, { target })

export default app
