import { defineStore } from 'pinia'
import type { ServerNode, SystemAlert, ServerStatus } from '@/types/server'

const STORAGE_KEY = 'homelab_servers_data'

const DEFAULT_SERVERS: ServerNode[] = [
  {
    id: 'srv-01',
    name: 'Production Web App',
    ip: '192.168.1.10',
    location: 'Bratislava DC',
    status: 'online',
    cpuUsage: 28,
    ramUsage: 45,
    diskUsage: 62,
    uptime: '14d 6h'
  },
  {
    id: 'srv-02',
    name: 'PostgreSQL Primary DB',
    ip: '192.168.1.20',
    location: 'Bratislava DC',
    status: 'online',
    cpuUsage: 64,
    ramUsage: 78,
    diskUsage: 81,
    uptime: '42d 12h'
  },
  {
    id: 'srv-03',
    name: 'Docker Swarm Node',
    ip: '192.168.1.35',
    location: 'Prague Edge',
    status: 'warning',
    cpuUsage: 89,
    ramUsage: 82,
    diskUsage: 45,
    uptime: '3d 18h'
  },
  {
    id: 'srv-04',
    name: 'Backup Storage (TrueNAS)',
    ip: '192.168.1.50',
    location: 'Homelab Rack',
    status: 'offline',
    cpuUsage: 0,
    ramUsage: 0,
    diskUsage: 94,
    uptime: '0h'
  }
]

export const useServerStore = defineStore('servers', {
  state: () => ({
    servers: [] as ServerNode[],
    alerts: [
      {
        id: 'alt-1',
        serverId: 'srv-03',
        serverName: 'Docker Swarm Node',
        message: 'CPU usage exceeded 85% threshold',
        level: 'warning',
        timestamp: 'Pred 5 minútami'
      },
      {
        id: 'alt-2',
        serverId: 'srv-04',
        serverName: 'Backup Storage (TrueNAS)',
        message: 'Host unreachable via ICMP ping',
        level: 'critical',
        timestamp: 'Pred 20 minútami'
      }
    ] as SystemAlert[],
    simulationInterval: null as number | null
  }),

  getters: {
    totalServers: (state) => state.servers.length,
    onlineCount: (state) => state.servers.filter((s) => s.status === 'online').length,
    warningCount: (state) => state.servers.filter((s) => s.status === 'warning').length,
    offlineCount: (state) => state.servers.filter((s) => s.status === 'offline').length,
    
    // Средняя нагрузка по активным нодам
    averageCpu: (state) => {
      const active = state.servers.filter((s) => s.status !== 'offline')
      if (active.length === 0) return 0
      const total = active.reduce((acc, s) => acc + s.cpuUsage, 0)
      return Math.round(total / active.length)
    },
    
    getServerById: (state) => {
      return (id: string) => state.servers.find((s) => s.id === id)
    }
  },

  actions: {
    // Инициализация данных из localStorage или значения по умолчанию
    initStore() {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          this.servers = JSON.parse(saved)
        } catch {
          this.servers = [...DEFAULT_SERVERS]
        }
      } else {
        this.servers = [...DEFAULT_SERVERS]
        this.saveToStorage()
      }
      this.startMetricsSimulation()
    },

    saveToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.servers))
    },

    // Добавление нового сервера
    addServer(newServer: Omit<ServerNode, 'id' | 'uptime'>) {
      const server: ServerNode = {
        ...newServer,
        id: 'srv-' + Date.now().toString().slice(-4),
        uptime: '0h'
      }
      this.servers.push(server)
      this.saveToStorage()
    },

    // Удаление сервера
    deleteServer(id: string) {
      this.servers = this.servers.filter((s) => s.id !== id)
      this.saveToStorage()
    },

    // Перезагрузка ноды (симуляция временного отключения)
    rebootServer(id: string) {
      const target = this.servers.find((s) => s.id === id)
      if (!target) return

      const prevStatus = target.status
      target.status = 'rebooting'

      setTimeout(() => {
        target.status = prevStatus === 'offline' ? 'offline' : 'online'
        this.saveToStorage()
      }, 3000)
    },

    // Переключение статуса Offline/Online
    toggleServerPower(id: string) {
      const target = this.servers.find((s) => s.id === id)
      if (!target) return

      if (target.status === 'offline') {
        target.status = 'online'
        target.cpuUsage = 15
        target.ramUsage = 30
      } else {
        target.status = 'offline'
        target.cpuUsage = 0
        target.ramUsage = 0
      }
      this.saveToStorage()
    },

    // Симуляция динамических метрик для живого дашборда
    startMetricsSimulation() {
      if (this.simulationInterval) return

      this.simulationInterval = window.setInterval(() => {
        this.servers.forEach((s) => {
          if (s.status === 'online' || s.status === 'warning') {
            const delta = (Math.random() - 0.5) * 6
            s.cpuUsage = Math.min(99, Math.max(5, Math.round(s.cpuUsage + delta)))
            
            // Если нагрузка зашкаливает — ставим предупреждение
            if (s.cpuUsage > 85) {
              s.status = 'warning'
            } else if (s.status === 'warning' && s.cpuUsage < 75) {
              s.status = 'online'
            }
          }
        })
      }, 4000)
    },
    
    dismissAlert(id: string) {
      this.alerts = this.alerts.filter((a) => a.id !== id)
    },

    addAlert(serverId: string, serverName: string, message: string, level: 'info' | 'warning' | 'critical') {
      this.alerts.unshift({
        id: 'alt-' + Date.now().toString().slice(-4),
        serverId,
        serverName,
        message,
        level,
        timestamp: 'Just now'
      })
    },
  }
})