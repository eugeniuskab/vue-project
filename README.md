# Homelab Sentinel

A single-page server infrastructure monitoring dashboard built with **Vue 3**, **TypeScript**, **Pinia**, and **Vue Router**. The application simulates real-time server metrics (CPU, RAM, Disk utilization), tracks system alerts, and allows provisioning and managing server nodes with persistent browser storage.

**Live Demo:** [https://eugeniuskab.github.io/vue-project/](https://eugeniuskab.github.io/vue-project/)

---

## Features

- **Infrastructure Dashboard (`/`):** Overview of cluster KPIs (total nodes, online count, warnings, average CPU load) and live-updating server cards with power and reboot controls.
- **Server Inventory (`/servers`):** Searchable and filterable table of server nodes with a modal form to provision new instances and delete existing ones.
- **System Incident Log (`/alerts`):** Filterable list of automated threshold warnings and manual events with incident acknowledgment.
- **State Persistence:** All server configurations and states are automatically persisted to `localStorage` via Pinia.

---

## Tech Stack

- **Framework:** Vue 3 (Composition API, `<script setup>`)
- **Language:** TypeScript
- **State Management:** Pinia
- **Routing:** Vue Router (Hash History mode for static hosting)
- **Build Tool:** Vite

---

## Project Architecture

```text
src/
├── components/          # Reusable UI components (props & emits)
│   ├── AlertItem.vue    # Individual incident card with severity styling
│   ├── AppModal.vue     # Reusable modal wrapper using <slot>
│   ├── MetricBar.vue    # Color-coded resource utilization progress bar
│   ├── ServerCard.vue   # Server node overview card with action controls
│   └── StatusBadge.vue  # Dynamic status indicator pill
├── router/
│   └── index.ts         # Application routes configuration
├── stores/
│   └── servers.ts       # Pinia store, getters, metrics simulation & localStorage sync
├── types/
│   └── server.ts        # TypeScript interfaces and union types
├── views/               # Route-level page components
│   ├── AlertsView.vue
│   ├── DashboardView.vue
│   └── ServersView.vue
├── App.vue              # Root layout and navigation bar
└── main.ts              # Application entry point
```

---

## Local Setup
- **Install dependencies:** `npm install`
- **Start the development server:** `npm run dev`
- **Type-check and build for production:** `npm run build`

