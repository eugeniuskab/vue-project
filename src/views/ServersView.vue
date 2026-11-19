<script setup lang="ts">
import { ref, computed } from 'vue'
import { useServerStore } from '@/stores/servers'
import type { ServerStatus } from '@/types/server'
import StatusBadge from '@/components/StatusBadge.vue'
import AppModal from '@/components/AppModal.vue'

const serverStore = useServerStore()

// Состояние фильтров
const searchQuery = ref('')
const statusFilter = ref<'all' | ServerStatus>('all')

// Состояние модального окна и формы нового сервера
const isModalOpen = ref(false)
const newName = ref('')
const newIp = ref('')
const newLocation = ref('Bratislava DC')
const newDiskUsage = ref(20)

// Фильтрация списка через computed
const filteredServers = computed(() => {
  return serverStore.servers.filter((server) => {
    const matchesSearch =
      server.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      server.ip.includes(searchQuery.value)

    const matchesStatus =
      statusFilter.value === 'all' || server.status === statusFilter.value

    return matchesSearch && matchesStatus
  })
})

function handleAddServer() {
  if (!newName.value.trim() || !newIp.value.trim()) return

  serverStore.addServer({
    name: newName.value.trim(),
    ip: newIp.value.trim(),
    location: newLocation.value.trim() || 'Homelab Rack',
    status: 'online',
    cpuUsage: 12,
    ramUsage: 24,
    diskUsage: Number(newDiskUsage.value) || 10
  })

  // Сброс полей формы и закрытие модалки
  newName.value = ''
  newIp.value = ''
  newLocation.value = 'Bratislava DC'
  newDiskUsage.value = 20
  isModalOpen.value = false
}
</script>

<template>
  <div class="servers-page">
    <div class="page-top">
      <div>
        <h2>Server Inventory</h2>
        <p class="subtitle">Manage nodes, filter by status, and provision new instances</p>
      </div>
      <button class="btn-primary" @click="isModalOpen = true">+ Add Server</button>
    </div>

    <!-- Панель поиска и фильтрации -->
    <div class="controls-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by hostname or IP..."
        class="input-field search-input"
      />
      <select v-model="statusFilter" class="input-field select-input">
        <option value="all">All Statuses</option>
        <option value="online">Online</option>
        <option value="warning">Warning</option>
        <option value="offline">Offline</option>
      </select>
    </div>

    <!-- Таблица серверов -->
    <div class="table-wrapper">
      <table v-if="filteredServers.length > 0" class="servers-table">
        <thead>
          <tr>
            <th>Node Name</th>
            <th>IP Address</th>
            <th>Location</th>
            <th>Status</th>
            <th>CPU / RAM</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="server in filteredServers" :key="server.id">
            <td class="font-bold">{{ server.name }}</td>
            <td class="mono">{{ server.ip }}</td>
            <td>{{ server.location }}</td>
            <td>
              <StatusBadge :status="server.status" />
            </td>
            <td class="mono">{{ server.cpuUsage }}% / {{ server.ramUsage }}%</td>
            <td>
              <div class="row-actions">
                <button
                  class="action-btn"
                  :disabled="server.status === 'offline' || server.status === 'rebooting'"
                  @click="serverStore.rebootServer(server.id)"
                >
                  Reboot
                </button>
                <button
                  class="action-btn danger"
                  @click="serverStore.deleteServer(server.id)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty-state">
        No servers match your current filters.
      </div>
    </div>

    <!-- Модальное окно добавления сервера -->
    <AppModal
      :is-open="isModalOpen"
      title="Provision New Server"
      @close="isModalOpen = false"
    >
      <form class="add-form" @submit.prevent="handleAddServer">
        <div class="form-group">
          <label>Hostname</label>
          <input
            v-model="newName"
            type="text"
            required
            placeholder="e.g. Nginx Reverse Proxy"
            class="input-field"
          />
        </div>

        <div class="form-group">
          <label>IPv4 Address</label>
          <input
            v-model="newIp"
            type="text"
            required
            placeholder="e.g. 192.168.1.45"
            class="input-field"
          />
        </div>

        <div class="form-group">
          <label>Datacenter / Location</label>
          <input
            v-model="newLocation"
            type="text"
            placeholder="e.g. Vienna Cloud"
            class="input-field"
          />
        </div>

        <div class="form-group">
          <label>Initial Disk Allocation (%)</label>
          <input
            v-model.number="newDiskUsage"
            type="number"
            min="1"
            max="99"
            class="input-field"
          />
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="isModalOpen = false">
            Cancel
          </button>
          <button type="submit" class="btn-primary">Create Node</button>
        </div>
      </form>
    </AppModal>
  </div>
</template>

<style scoped>
.servers-page {
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

.controls-bar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.input-field {
  background-color: #1e293b;
  border: 1px solid #334155;
  color: #f8fafc;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

.input-field:focus {
  border-color: #38bdf8;
}

.search-input {
  flex: 1;
  min-width: 240px;
}

.select-input {
  min-width: 160px;
}

.table-wrapper {
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  overflow-x: auto;
}

.servers-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.servers-table th {
  padding: 14px 20px;
  font-size: 12px;
  text-transform: uppercase;
  color: #94a3b8;
  border-bottom: 1px solid #334155;
}

.servers-table td {
  padding: 16px 20px;
  border-bottom: 1px solid #334155;
  font-size: 14px;
}

.servers-table tr:last-child td {
  border-bottom: none;
}

.font-bold { font-weight: 600; }
.mono { font-family: monospace; color: #cbd5e1; }

.row-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background-color: #334155;
  color: #f8fafc;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}

.action-btn:hover:not(:disabled) {
  background-color: #475569;
}

.action-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.action-btn.danger {
  background-color: rgba(239, 68, 68, 0.2);
  color: #f87171;
}

.action-btn.danger:hover {
  background-color: rgba(239, 68, 68, 0.35);
}

.empty-state {
  padding: 40px;
  text-align: center;
  color: #94a3b8;
}

/* Стили формы в модалке */
.add-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  color: #cbd5e1;
  font-weight: 500;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}

.btn-primary {
  background-color: #38bdf8;
  color: #0f172a;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #7dd3fc;
}

.btn-cancel {
  background-color: transparent;
  border: 1px solid #475569;
  color: #cbd5e1;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}
</style>