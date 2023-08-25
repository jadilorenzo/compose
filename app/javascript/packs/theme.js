const csrfTokenElement = document.querySelector('meta[name="csrf-token"]')
const csrfToken = csrfTokenElement.getAttribute('content')

fetch('/user_settings/json')
  .then(response => response.json())
  .then(response => document.documentElement.style.setProperty("--theme-hue", response.color.toString()))
