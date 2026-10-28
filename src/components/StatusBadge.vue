<script setup lang="ts">
import { computed } from 'vue'
import type { ServerStatus } from '@/types/server'

const props = defineProps<{
  status: ServerStatus
}>()

const label = computed(() => {
  switch (props.status) {
    case 'online':
      return 'Online'
    case 'warning':
      return 'Warning'
    case 'offline':
      return 'Offline'
    case 'rebooting':
      return 'Rebooting...'
    default:
      return props.status
  }
})
</script>

<template>
  <span :class="['status-badge', status]">
    <span class="indicator-dot"></span>
    {{ label }}
  </span>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.online {
  background-color: rgba(34, 197, 94, 0.15);
  color: #4ade80;
}
.online .indicator-dot {
  background-color: #22c55e;
  box-shadow: 0 0 8px #22c55e;
}

.warning {
  background-color: rgba(234, 179, 8, 0.15);
  color: #facc15;
}
.warning .indicator-dot {
  background-color: #eab308;
  box-shadow: 0 0 8px #eab308;
}

.offline {
  background-color: rgba(239, 68, 68, 0.15);
  color: #f87171;
}
.offline .indicator-dot {
  background-color: #ef4444;
}

.rebooting {
  background-color: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
}
.rebooting .indicator-dot {
  background-color: #38bdf8;
  animation: pulse 1s infinite alternate;
}

@keyframes pulse {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}
</style>