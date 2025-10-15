<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterView } from "vue-router";

import NavBar, { NavItem } from "./components/NavBar.vue";
import StatusBanner, { StatusIndicator } from "./components/StatusBanner.vue";
import { agents, cameraFeeds, printers, orders } from "./data/mockData";

const navItems: NavItem[] = [
  { label: "Operations", to: "/", icon: "gauge" },
  { label: "Cameras", to: "/cameras", icon: "camera-video" },
  { label: "Printers", to: "/printers", icon: "printer" },
  { label: "Calls", to: "/calls", icon: "phone" },
  { label: "Orders", to: "/orders", icon: "file-text" },
  { label: "Logistics", to: "/logistics", icon: "truck" },
  { label: "Staff", to: "/staff", icon: "users" },
  { label: "Customers", to: "/customers", icon: "user" },
  { label: "Compliance", to: "/compliance", icon: "shield-check" },
  { label: "Admin", to: "/admin", icon: "sliders" },
];

const statusIndicators = computed<StatusIndicator[]>(() => {
  const onlineAgents = agents.filter((agent) => agent.status.tone !== "negative").length;
  const agentTone: StatusIndicator["tone"] = onlineAgents === agents.length
    ? "positive"
    : onlineAgents === 0
      ? "negative"
      : "warning";
  const agentStatus = onlineAgents === agents.length
    ? "Online"
    : onlineAgents === 0
      ? "Offline"
      : `${onlineAgents}/${agents.length} online`;

  const readyCameras = cameraFeeds.filter((feed) => feed.health === "online").length;
  const cameraTone: StatusIndicator["tone"] = readyCameras === cameraFeeds.length
    ? "informational"
    : readyCameras === 0
      ? "negative"
      : "warning";
  const cameraStatus = readyCameras === cameraFeeds.length
    ? "Ready"
    : readyCameras === 0
      ? "Offline"
      : `${readyCameras}/${cameraFeeds.length} live`;

  const printerErrors = printers.filter((printer) => printer.state === "error" || printer.state === "offline").length;
  const printerPrinting = printers.filter((printer) => printer.state === "printing").length;
  const printerTone: StatusIndicator["tone"] = printerErrors > 0
    ? "warning"
    : "informational";
  const printerStatus = printerErrors > 0
    ? `${printerErrors} needs attention`
    : printerPrinting > 0
      ? `${printerPrinting} printing`
      : "Ready";

  const pendingOrders = orders.filter((order) => order.status !== "completed").length;
  const ordersTone: StatusIndicator["tone"] = pendingOrders === 0 ? "positive" : "informational";
  const ordersStatus = pendingOrders === 0 ? "Synced" : `${pendingOrders} pending`;

  return [
    { label: "Agents", status: agentStatus, tone: agentTone, icon: "gauge" },
    { label: "Cameras", status: cameraStatus, tone: cameraTone, icon: "camera-video" },
    { label: "Printers", status: printerStatus, tone: printerTone, icon: "printer" },
    { label: "Orders", status: ordersStatus, tone: ordersTone, icon: "bolt" },
  ];
});

const isMobileNavOpen = ref(false);
const toggleMobileNav = () => {
  isMobileNavOpen.value = !isMobileNavOpen.value;
};
const closeMobileNav = () => {
  isMobileNavOpen.value = false;
};
</script>

<template>
  <div class="app-layout">
    <NavBar
      :items="navItems"
      :mobile-open="isMobileNavOpen"
      @close="closeMobileNav"
    />
    <button
      v-if="isMobileNavOpen"
      class="nav-overlay"
      type="button"
      aria-label="Close navigation overlay"
      @click="closeMobileNav"
    />

    <div class="app-surface">
      <header class="app-topbar">
        <button
          class="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          @click="toggleMobileNav"
        >
          <span />
        </button>
        <div class="topbar-brand">
          <img
            class="topbar-logo"
            src="https://heysalad.app/HeySalad%20Logo%20Black.png"
            alt="HeySalad®"
          />
        </div>
      </header>

      <main class="app-main">
        <section class="page-shell">
          <StatusBanner :statuses="statusIndicators" />
          <RouterView />
        </section>
      </main>
    </div>
  </div>
</template>
