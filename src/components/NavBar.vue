<script setup lang="ts">
import { computed, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import IconGlyph from "./IconGlyph.vue";

export interface NavItem {
  label: string;
  to: string;
  icon: string;
}

const props = defineProps<{
  items: NavItem[];
  mobileOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const route = useRoute();

const activePath = computed(() => route.path);

const isActive = (target: string) => {
  if (target === "/") {
    return activePath.value === "/";
  }
  return activePath.value === target || activePath.value.startsWith(`${target}/`);
};

watch(
  () => route.fullPath,
  () => {
    if (props.mobileOpen) {
      emit("close");
    }
  }
);

const handleLinkClick = () => {
  emit("close");
};
</script>

<template>
  <aside
    class="nav-shell"
    :class="{ 'nav-shell--open': mobileOpen }"
  >
    <div class="nav-inner">
      <div class="nav-header">
        <img
          class="nav-logo"
          src="https://heysalad.app/HeySalad%20Logo%20Black.png"
          alt="HeySalad®"
        />
        <button
          class="nav-close"
          type="button"
          aria-label="Close navigation"
          @click="emit('close')"
        >
          ✕
        </button>
      </div>

      <nav aria-label="Primary navigation">
        <ul class="nav-list">
          <li v-for="item in items" :key="item.to">
            <RouterLink
              :to="item.to"
              class="nav-link"
              :class="{ 'nav-link--active': isActive(item.to) }"
              @click="handleLinkClick"
            >
              <span class="nav-icon">
                <IconGlyph :name="item.icon" />
              </span>
              <span class="nav-link-label">{{ item.label }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <footer class="nav-footer">
        <p class="nav-footer-text">
          Managed by HeySalad® Ops Team
        </p>
        <a
          class="nav-footer-link"
          href="https://heysalad.app"
          target="_blank"
          rel="noreferrer"
        >
          Visit heysalad.app ->
        </a>
      </footer>
    </div>
  </aside>
</template>
