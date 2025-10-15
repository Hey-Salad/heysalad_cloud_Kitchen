<script setup lang="ts">
import { cameraFeeds } from "../data/mockData";

const badgeTone = (health: (typeof cameraFeeds)[number]["health"]) => {
  if (health === "online") return "positive";
  if (health === "buffering") return "warning";
  return "negative";
};
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h1>Camera Control</h1>
        <p>Quick peek at every Pi stream riding through the HeySalad® relay.</p>
      </div>
      <button class="ghost-button" type="button">Configure RTSP ingest</button>
    </header>

    <div class="page-grid">
      <article
        v-for="feed in cameraFeeds"
        :key="feed.id"
        class="card camera-card"
      >
        <header class="card-header">
          <h2>{{ feed.name }}</h2>
          <span class="status-pill" :class="`status-pill--${badgeTone(feed.health)}`">
            {{ feed.health === "online" ? "Live" : feed.health }}
          </span>
        </header>
        <p class="camera-card__meta">
          Location: {{ feed.location }} · {{ feed.resolution }}
        </p>
        <div class="camera-card__preview">
          Preview not available in dev mode. Connect to the agent via Socket.IO to render
          the RTSP stream.
        </div>
        <footer class="card-footer">
          <span>Latency: {{ feed.latency }}</span>
          <span>{{ feed.notes }}</span>
        </footer>
      </article>
    </div>
  </section>
</template>
