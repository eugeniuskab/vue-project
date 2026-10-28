<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useServerStore } from '@/stores/servers'

const serverStore = useServerStore()

onMounted(() => {
  serverStore.initStore()
})
</script>

<template>
  <div class="app-layout">
    <header class="navbar">
      <div class="navbar-brand">
        <span class="logo-icon">💻</span>
        <h1>Homelab Sentinel</h1>
      </div>
      <nav class="nav-links">
        <RouterLink to="/" class="nav-item">Dashboard</RouterLink>
        <RouterLink to="/servers" class="nav-item">Servers</RouterLink>
        <RouterLink to="/alerts" class="nav-item">Alerts</RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  min-height: 100vh;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background-color: #1e293b;
  border-bottom: 1px solid #334155;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 24px;
}

.navbar-brand h1 {
  font-size: 20px;
  font-weight: 700;
  color: #38bdf8;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-item {
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: #f8fafc;
  background-color: #334155;
}

/* Активная ссылка в Vue Router */
.nav-item.router-link-active {
  color: #38bdf8;
  background-color: rgba(56, 189, 248, 0.1);
}

.main-content {
  flex: 1;
  padding: 32px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
</style>