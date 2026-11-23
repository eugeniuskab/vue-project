<script setup lang="ts">
import { ref, computed } from 'vue'
import { useServerStore } from '@/stores/servers'
import AlertItem from '@/components/AlertItem.vue'

const serverStore = useServerStore()
const selectedLevel = ref<'all' | 'info' | 'warning' | 'critical'>('all')

const filteredAlerts = computed(() => {
  if (selectedLevel.value === 'all') {
    return serverStore.alerts
  }
  return serverStore.alerts.filter((a) => a.level === selectedLevel.value)
})
</script>

<template>
  <div class="alerts-page">
    <div class="page-top">
      <div>
        <h2>System Incident Log</h2>
        <p class="subtitle">Monitor automated threshold warnings and critical node events</p>
      </div>

      <div class="filter-pills">
        <button
          v-for="lvl in (['all', 'critical', 'warning', 'info'] as const)"
          :key="lvl"
          :class="['pill-btn', { active: selectedLevel === lvl }]"
          @click="selectedLevel = lvl"
        >
          {{ lvl }}
        </button>
      </div>
    </div>

    <div v-if="filteredAlerts.length > 0" class="alerts-list">
      <AlertItem
        v-for="alert in filteredAlerts"
        :key="alert.id"
        :alert="alert"
        @dismiss="serverStore.dismissAlert"
      />
    </div>

    <div v-else class="empty-state">
      All clear — no active alerts in this category.
    </div>
  </div>
</template>

<style scoped>
.alerts-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.page-top h2 {
  font-size: 24px;
  font-weight: 700;
}

.subtitle {
  color: #94a3b8;
  font-size: 14px;
  margin-top: 4px;
}

.filter-pills {
  display: flex;
  gap: 8px;
  background-color: #1e293b;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid #334155;
}

.pill-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  text-transform: capitalize;
  cursor: pointer;
}

.pill-btn.active {
  background-color: #38bdf8;
  color: #0f172a;
  font-weight: 600;
}

.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  background-color: #1e293b;
  border: 1px dashed #334155;
  border-radius: 12px;
  padding: 48px;
  text-align: center;
  color: #94a3b8;
}
</style>