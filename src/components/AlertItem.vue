<script setup lang="ts">
import type { SystemAlert } from '@/types/server'

defineProps<{
  alert: SystemAlert
}>()

const emit = defineEmits<{
  (e: 'dismiss', id: string): void
}>()
</script>

<template>
  <div :class="['alert-item', alert.level]">
    <div class="alert-main">
      <div class="alert-header">
        <span :class="['level-badge', alert.level]">{{ alert.level }}</span>
        <span class="server-name">{{ alert.serverName }}</span>
        <span class="timestamp">• {{ alert.timestamp }}</span>
      </div>
      <p class="alert-message">{{ alert.message }}</p>
    </div>

    <button class="dismiss-btn" @click="emit('dismiss', alert.id)">
      Acknowledge
    </button>
  </div>
</template>

<style scoped>
.alert-item {
  background-color: #1e293b;
  border: 1px solid #334155;
  border-left-width: 4px;
  border-radius: 10px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.alert-item.info { border-left-color: #38bdf8; }
.alert-item.warning { border-left-color: #facc15; }
.alert-item.critical { border-left-color: #ef4444; }

.alert-main {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.alert-header {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.level-badge {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 4px;
}

.level-badge.info {
  background-color: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
}

.level-badge.warning {
  background-color: rgba(234, 179, 8, 0.15);
  color: #facc15;
}

.level-badge.critical {
  background-color: rgba(239, 68, 68, 0.15);
  color: #f87171;
}

.server-name {
  font-weight: 600;
  font-size: 14px;
  color: #f8fafc;
}

.timestamp {
  font-size: 12px;
  color: #64748b;
}

.alert-message {
  font-size: 14px;
  color: #cbd5e1;
}

.dismiss-btn {
  background-color: #334155;
  color: #e2e8f0;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s;
}

.dismiss-btn:hover {
  background-color: #475569;
}
</style>