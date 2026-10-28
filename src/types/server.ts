export type ServerStatus = 'online' | 'warning' | 'offline' | 'rebooting'

export interface ServerNode {
  id: string
  name: string
  ip: string
  location: string
  status: ServerStatus
  cpuUsage: number // 0 - 100%
  ramUsage: number // 0 - 100%
  diskUsage: number // 0 - 100%
  uptime: string
}

export interface SystemAlert {
  id: string
  serverId: string
  serverName: string
  message: string
  level: 'info' | 'warning' | 'critical'
  timestamp: string
}