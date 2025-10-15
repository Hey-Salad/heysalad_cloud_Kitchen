<script setup lang="ts">
import { computed } from "vue";
import AgentCard from "../components/AgentCard.vue";
import { agents } from "../data/mockData";

const totalOrders = computed(() =>
  agents.reduce((sum, agent) => sum + agent.ordersSynced, 0)
);

const activeAgents = computed(() =>
  agents.filter((agent) => agent.status.tone !== "negative").length
);
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h1>Kitchen Pulse</h1>
        <p>Live heartbeat of agents, cameras, and printers across the Cloud Kitchen.</p>
      </div>
      <div class="page-metrics">
        <div class="metric-card">
          <span class="metric-label">Active agents</span>
          <span class="metric-value">{{ activeAgents }}</span>
        </div>
        <div class="metric-card">
          <span class="metric-label">Orders synced today</span>
          <span class="metric-value">{{ totalOrders }}</span>
        </div>
      </div>
    </header>

    <div class="page-grid">
      <AgentCard
        v-for="agent in agents"
        :key="agent.id"
        v-bind="agent"
      />
    </div>
  </section>
</template>
