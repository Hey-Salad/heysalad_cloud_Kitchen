<script setup lang="ts">
import { printers } from "../data/mockData";

const stateTone = (state: (typeof printers)[number]["state"]) => {
  if (state === "error") return "negative";
  if (state === "printing") return "informational";
  if (state === "offline") return "warning";
  return "positive";
};
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h1>Thermal Printers</h1>
        <p>Stripe orders drop in and the bridge keeps the tickets rolling.</p>
      </div>
      <div class="page-actions">
        <button class="ghost-button" type="button">Send test ticket</button>
        <button class="primary-button" type="button">Reconnect all bridges</button>
      </div>
    </header>

    <div class="page-grid">
      <article
        v-for="printer in printers"
        :key="printer.id"
        class="card printer-card"
      >
        <header class="card-header">
          <h2>{{ printer.name }}</h2>
          <span class="status-pill" :class="`status-pill--${stateTone(printer.state)}`">
            {{ printer.state }}
          </span>
        </header>
        <p class="card-subtitle">
          {{ printer.model }} · {{ printer.paper }}
        </p>
        <dl class="card-grid">
          <div>
            <dt>Agent</dt>
            <dd>{{ printer.agent }}</dd>
          </div>
          <div>
            <dt>Queue</dt>
            <dd>{{ printer.queue }}</dd>
          </div>
        </dl>
        <p v-if="printer.notes" class="card-notes">{{ printer.notes }}</p>
      </article>
    </div>
  </section>
</template>
