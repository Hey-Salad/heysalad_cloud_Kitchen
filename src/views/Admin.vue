<script setup lang="ts">
import { adminModules } from "../data/mockData";
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h1>Admin Control</h1>
        <p>Switches for agents, branding, integrations, and security in one pane.</p>
      </div>
      <button class="ghost-button" type="button">Open Firebase Console</button>
    </header>

    <div class="page-grid">
      <article
        v-for="module in adminModules"
        :key="module.name"
        class="card"
      >
        <header class="card-header">
          <h2>{{ module.name }}</h2>
        </header>
        <p class="card-body">
          {{ module.description }}
        </p>
      </article>
    </div>
  </section>
</template>
