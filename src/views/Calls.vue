<script setup lang="ts">
import { callQueues } from "../data/mockData";
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h1>Call Desk</h1>
        <p>Hook Twilio here for a lightweight wait-time pulse.</p>
      </div>
      <button class="ghost-button" type="button">Open Twilio Console</button>
    </header>

    <div class="page-grid">
      <article
        v-for="queue in callQueues"
        :key="queue.id"
        class="card"
      >
        <header class="card-header">
          <h2>{{ queue.name }}</h2>
          <span class="card-tag">Number {{ queue.twilioNumber }}</span>
        </header>
        <dl class="card-grid">
          <div>
            <dt>Waiting calls</dt>
            <dd>{{ queue.waiting }}</dd>
          </div>
          <div>
            <dt>Agents online</dt>
            <dd>{{ queue.agentsOnline }}</dd>
          </div>
          <div>
            <dt>Avg. handle</dt>
            <dd>{{ queue.avgHandle }}</dd>
          </div>
        </dl>
      </article>
    </div>
  </section>
</template>
