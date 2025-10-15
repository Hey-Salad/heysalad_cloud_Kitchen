<script setup lang="ts">
import { computed } from "vue";

type SvgElement = "path" | "rect" | "circle" | "line";

interface Shape {
  type: SvgElement;
  props: Record<string, string>;
}

const props = withDefaults(
  defineProps<{
    name: string;
    size?: number;
  }>(),
  {
    size: 24,
  }
);

const icons: Record<string, Shape[]> = {
  gauge: [
    {
      type: "path",
      props: {
        d: "M12 4.25a7.75 7.75 0 1 0 0 15.5 7.75 7.75 0 0 0 0-15.5Z",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
      },
    },
    {
      type: "line",
      props: {
        x1: "12",
        y1: "12",
        x2: "15",
        y2: "15",
        stroke: "currentColor",
        "stroke-width": "1.6",
        "stroke-linecap": "round",
      },
    },
    {
      type: "circle",
      props: {
        cx: "12",
        cy: "12",
        r: "1.4",
        fill: "currentColor",
      },
    },
  ],
  "camera-video": [
    {
      type: "rect",
      props: {
        x: "4",
        y: "7",
        width: "16",
        height: "10",
        rx: "2.2",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
      },
    },
    {
      type: "circle",
      props: {
        cx: "12",
        cy: "12",
        r: "3",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
      },
    },
    {
      type: "circle",
      props: {
        cx: "12",
        cy: "12",
        r: "1.5",
        fill: "currentColor",
      },
    },
  ],
  printer: [
    {
      type: "rect",
      props: {
        x: "5",
        y: "7",
        width: "14",
        height: "6",
        rx: "2",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
      },
    },
    {
      type: "rect",
      props: {
        x: "6.5",
        y: "14",
        width: "11",
        height: "4",
        rx: "1.4",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
      },
    },
    {
      type: "line",
      props: {
        x1: "8",
        y1: "10.5",
        x2: "16",
        y2: "10.5",
        stroke: "currentColor",
        "stroke-width": "1.4",
        "stroke-linecap": "round",
      },
    },
  ],
  phone: [
    {
      type: "path",
      props: {
        d: "M8.6 6.4c.4-1.1 1.7-1.4 2.5-.6l1.3 1.3c.5.5.5 1.3.1 1.9l-.9 1.1a10.7 10.7 0 0 0 3.7 3.7l1.1-.9c.6-.4 1.4-.4 1.9.1l1.3 1.3c.8.8.5 2.1-.6 2.5-1.8.8-4.8 1-8.7-2.8C5.5 10.1 5.3 7.1 6 5.3Z",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      },
    },
  ],
  "file-text": [
    {
      type: "rect",
      props: {
        x: "6",
        y: "7",
        width: "12",
        height: "13",
        rx: "2",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
      },
    },
    {
      type: "path",
      props: {
        d: "M9 7V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V7",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
        "stroke-linecap": "round",
      },
    },
    {
      type: "line",
      props: {
        x1: "9.5",
        y1: "11",
        x2: "14.5",
        y2: "11",
        stroke: "currentColor",
        "stroke-width": "1.4",
        "stroke-linecap": "round",
      },
    },
    {
      type: "line",
      props: {
        x1: "9.5",
        y1: "14",
        x2: "14.5",
        y2: "14",
        stroke: "currentColor",
        "stroke-width": "1.4",
        "stroke-linecap": "round",
      },
    },
  ],
  truck: [
    {
      type: "rect",
      props: {
        x: "3.5",
        y: "8.5",
        width: "10",
        height: "6.5",
        rx: "1.5",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
      },
    },
    {
      type: "path",
      props: {
        d: "M13.5 10h3.2a1.5 1.5 0 0 1 1.4.96l.8 2.18A1.5 1.5 0 0 1 17.6 15H13.5",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      },
    },
    {
      type: "circle",
      props: {
        cx: "7.5",
        cy: "16.5",
        r: "1.6",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
      },
    },
    {
      type: "circle",
      props: {
        cx: "15.5",
        cy: "16.5",
        r: "1.6",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
      },
    },
  ],
  users: [
    {
      type: "circle",
      props: {
        cx: "12",
        cy: "9",
        r: "3",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
      },
    },
    {
      type: "path",
      props: {
        d: "M7.5 18c.6-2.3 2.4-3.9 4.5-3.9s3.9 1.6 4.5 3.9",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
        "stroke-linecap": "round",
      },
    },
    {
      type: "circle",
      props: {
        cx: "6.5",
        cy: "11",
        r: "1.8",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.2",
      },
    },
    {
      type: "circle",
      props: {
        cx: "17.5",
        cy: "11",
        r: "1.8",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.2",
      },
    },
  ],
  user: [
    {
      type: "circle",
      props: {
        cx: "12",
        cy: "9",
        r: "3.2",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
      },
    },
    {
      type: "path",
      props: {
        d: "M7.5 18.5a4.5 4.5 0 0 1 9 0",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
        "stroke-linecap": "round",
      },
    },
  ],
  "shield-check": [
    {
      type: "path",
      props: {
        d: "M12 4.5 6.5 6.5v5.4a6.7 6.7 0 0 0 5.5 6.56 6.7 6.7 0 0 0 5.5-6.56V6.5L12 4.5Z",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
        "stroke-linejoin": "round",
      },
    },
    {
      type: "path",
      props: {
        d: "M9.3 11.3l2 2 3.4-3.4",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.4",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      },
    },
  ],
  sliders: [
    {
      type: "line",
      props: {
        x1: "6",
        y1: "7",
        x2: "18",
        y2: "7",
        stroke: "currentColor",
        "stroke-width": "1.4",
        "stroke-linecap": "round",
      },
    },
    {
      type: "line",
      props: {
        x1: "6",
        y1: "12",
        x2: "18",
        y2: "12",
        stroke: "currentColor",
        "stroke-width": "1.4",
        "stroke-linecap": "round",
      },
    },
    {
      type: "line",
      props: {
        x1: "6",
        y1: "17",
        x2: "18",
        y2: "17",
        stroke: "currentColor",
        "stroke-width": "1.4",
        "stroke-linecap": "round",
      },
    },
    {
      type: "circle",
      props: {
        cx: "10",
        cy: "7",
        r: "1.6",
        fill: "currentColor",
      },
    },
    {
      type: "circle",
      props: {
        cx: "14.5",
        cy: "12",
        r: "1.6",
        fill: "currentColor",
      },
    },
    {
      type: "circle",
      props: {
        cx: "9",
        cy: "17",
        r: "1.6",
        fill: "currentColor",
      },
    },
  ],
  bolt: [
    {
      type: "path",
      props: {
        d: "M12.5 3.5 7 13h4l-1.5 7.5 6-9h-4l1-8Z",
        fill: "currentColor",
      },
    },
  ],
  circle: [
    {
      type: "circle",
      props: {
        cx: "12",
        cy: "12",
        r: "4",
        fill: "currentColor",
      },
    },
  ],
};

const shapes = computed<Shape[]>(() => icons[props.name] ?? icons.gauge);
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-hidden="true"
  >
    <component
      v-for="(shape, index) in shapes"
      :key="index"
      :is="shape.type"
      v-bind="shape.props"
    />
  </svg>
</template>

