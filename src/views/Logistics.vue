<script setup lang="ts">
import { routes } from "../data/mockData";

const statusTone = (status: (typeof routes)[number]["status"]) => {
  if (status === "arrived") return "positive";
  if (status === "en-route") return "informational";
  return "warning";
};
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h1>Logistics</h1>
        <p>Check driver ETAs and the last-mile queue at a glance.</p>
      </div>
      <button class="ghost-button" type="button">Connect fleet provider</button>
    </header>

    <div class="page-grid">
      <article
        v-for="route in routes"
        :key="route.id"
        class="card"
      >
        <header class="card-header">
          <h2>Route {{ route.id }}</h2>
          <span class="status-pill" :class="`status-pill--${statusTone(route.status)}`">
            {{ route.status }}
          </span>
        </header>
        <dl class="card-grid">
          <div>
            <dt>Driver</dt>
            <dd>{{ route.driver }}</dd>
          </div>
          <div>
            <dt>ETA</dt>
            <dd>{{ route.eta }}</dd>
          </div>
          <div>
            <dt>Stops remaining</dt>
            <dd>{{ route.stopsRemaining }}</dd>
          </div>
        </dl>
      </article>
    </div>
  </section>
</template>
