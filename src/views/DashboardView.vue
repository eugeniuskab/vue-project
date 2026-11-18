<script setup lang="ts">
import { useServerStore } from '@/stores/servers'
import ServerCard from '@/components/ServerCard.vue'

const serverStore = useServerStore()
</script>

<template>
  <div class="dashboard">
    <div class="page-header">
      <h2>Infrastructure Overview</h2>
      <p class="subtitle">Real-time status and resource utilization across all nodes</p>
    </div>

    <!-- Сводная статистика (KPI карточки) -->
    <div class="stats-grid">
      <div class="stat-box">
        <span class="stat-label">Total Nodes</span>
        <span class="stat-value">{{ serverStore.totalServers }}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Online</span>
        <span class="stat-value text-green">{{ serverStore.onlineCount }}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Warnings</span>
        <span class="stat-value text-yellow">{{ serverStore.warningCount }}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Avg Cluster CPU</span>
        <span class="stat-value text-blue">{{ serverStore.averageCpu }}%</span>
      </div>
    </div>

    <!-- Сетка серверов -->
    <h3 class="section-title">Active Nodes</h3>
    <div class="servers-grid">
      <ServerCard
        v-for="server in serverStore.servers"
        :key="server.id"
        :server="server"
        @reboot="serverStore.rebootServer"
        @toggle-power="serverStore.toggleServerPower"
      />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #f8fafc;
}

.subtitle {
  color: #94a3b8;
  font-size: 14px;
  margin-top: 4px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-box {
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-label {
  font-size: 13px;
  color: #94a3b8;
  font-weight: 500;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #f8fafc;
}

.text-green { color: #4ade80; }
.text-yellow { color: #facc15; }
.text-blue { color: #38bdf8; }

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #e2e8f0;
  margin-top: 8px;
}

.servers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}
</style>