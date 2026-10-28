<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value: number
}>()

const barColorClass = computed(() => {
  if (props.value >= 90) return 'danger'
  if (props.value >= 75) return 'warning'
  return 'normal'
})
</script>

<template>
  <div class="metric-container">
    <div class="metric-header">
      <span class="metric-label">{{ label }}</span>
      <span class="metric-value">{{ value }}%</span>
    </div>
    <div class="metric-track">
      <div 
        :class="['metric-fill', barColorClass]" 
        :style="{ width: value + '%' }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.metric-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.metric-header {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #94a3b8;
}

.metric-value {
  font-weight: 600;
  color: #f1f5f9;
}

.metric-track {
  width: 100%;
  height: 6px;
  background-color: #334155;
  border-radius: 9999px;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  transition: width 0.4s ease, background-color 0.4s ease;
  border-radius: 9999px;
}

.normal {
  background-color: #38bdf8;
}

.warning {
  background-color: #facc15;
}

.danger {
  background-color: #ef4444;
}
</style>