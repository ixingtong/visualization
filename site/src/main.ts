import '@unocss/reset/tailwind.css'
import 'uno.css'
import App from './App.svelte'

const target = document.querySelector('#app')!

const app = new App({ target })

export default app
