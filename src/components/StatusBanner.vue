<script setup lang="ts">
import IconGlyph from "./IconGlyph.vue";

export interface StatusIndicator {
  label: string;
  status: string;
  icon?: string;
  tone?: "positive" | "warning" | "negative" | "informational";
}

const props = defineProps<{
  statuses: StatusIndicator[];
}>();
</script>

<template>
  <section
    v-if="props.statuses.length > 0"
    class="status-banner"
    aria-live="polite"
  >
    <ul class="status-list">
      <li
        v-for="item in props.statuses"
        :key="item.label"
        class="status-card"
        :class="`status-card--${item.tone ?? 'informational'}`"
      >
        <i
          v-if="item.icon"
          :class="['status-card__icon', item.icon]"
          aria-hidden="true"
        />
        <span v-if="item.icon" class="status-card__icon">
          <IconGlyph :name="item.icon" />
        </span>
        <div class="status-card__text">
          <span class="status-card__label">{{ item.label }}</span>
          <span class="status-card__value">{{ item.status }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>
