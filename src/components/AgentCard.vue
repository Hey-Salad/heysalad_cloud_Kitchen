<script setup lang="ts">
import type { KitchenAgent, AgentStatusTone } from "../types/kitchen";

const props = defineProps<KitchenAgent>();

const toneClass = (tone: AgentStatusTone) => `status-pill--${tone}`;
</script>

<template>
  <article class="agent-card">
    <header class="agent-card__header">
      <div>
        <h2 class="agent-card__title">{{ props.name }}</h2>
        <p class="agent-card__meta">
          <span class="agent-card__location">Location: {{ props.location }}</span>
          <span class="agent-card__heartbeat">Last heartbeat {{ props.lastHeartbeat }}</span>
        </p>
      </div>
      <span class="status-pill" :class="toneClass(props.status.tone)">
        {{ props.status.label }}
      </span>
    </header>

    <dl class="agent-card__grid">
      <div class="agent-card__cell">
        <dt>Camera</dt>
        <dd>
          <span class="status-pill" :class="toneClass(props.camera.tone)">
            {{ props.camera.label }}
          </span>
        </dd>
      </div>
      <div class="agent-card__cell">
        <dt>Printer</dt>
        <dd>
          <span class="status-pill" :class="toneClass(props.printer.tone)">
            {{ props.printer.label }}
          </span>
        </dd>
      </div>
      <div class="agent-card__cell">
        <dt>Orders synced</dt>
        <dd class="agent-card__value">{{ props.ordersSynced }}</dd>
      </div>
    </dl>

    <p v-if="props.notes" class="agent-card__notes">
      {{ props.notes }}
    </p>
  </article>
</template>
