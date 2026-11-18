<script setup lang="ts">
import type { ServerNode } from '@/types/server'
import StatusBadge from './StatusBadge.vue'
import MetricBar from './MetricBar.vue'

// Получаем объект сервера от родителя (props)
defineProps<{
  server: ServerNode
}>()

// Объявляем события, которые карточка может отправить родителю (emit)
const emit = defineEmits<{
  (e: 'reboot', id: string): void
  (e: 'toggle-power', id: string): void
}>()
</script>

<template>
  <div class="server-card">
    <div class="card-header">
      <div>
        <h3 class="server-name">{{ server.name }}</h3>
        <span class="server-meta">{{ server.ip }} • {{ server.location }}</span>
      </div>
      <StatusBadge :status="server.status" />
    </div>

    <div class="card-metrics">
      <MetricBar label="CPU" :value="server.cpuUsage" />
      <MetricBar label="RAM" :value="server.ramUsage" />
      <MetricBar label="Disk" :value="server.diskUsage" />
    </div>

    <div class="card-footer">
      <span class="uptime">Uptime: {{ server.uptime }}</span>
      <div class="actions">
        <button
          class="btn btn-secondary"
          :disabled="server.status === 'offline' || server.status === 'rebooting'"
          @click="emit('reboot', server.id)"
        >
          Reboot
        </button>
        <button
          :class="['btn', server.status === 'offline' ? 'btn-success' : 'btn-danger']"
          :disabled="server.status === 'rebooting'"
          @click="emit('toggle-power', server.id)"
        >
          {{ server.status === 'offline' ? 'Start' : 'Stop' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.server-card {
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.server-card:hover {
  border-color: #475569;
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.server-name {
  font-size: 16px;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 4px;
}

.server-meta {
  font-size: 13px;
  color: #94a3b8;
  font-family: monospace;
}

.card-metrics {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #334155;
  margin-top: auto;
}

.uptime {
  font-size: 12px;
  color: #64748b;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #334155;
  color: #f8fafc;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #475569;
}

.btn-danger {
  background-color: rgba(239, 68, 68, 0.2);
  color: #f87171;
}

.btn-danger:hover:not(:disabled) {
  background-color: rgba(239, 68, 68, 0.3);
}

.btn-success {
  background-color: rgba(34, 197, 94, 0.2);
  color: #4ade80;
}

.btn-success:hover:not(:disabled) {
  background-color: rgba(34, 197, 94, 0.3);
}
</style>