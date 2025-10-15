import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: { title: "Dashboard" },
  },
  {
    path: "/cameras",
    name: "cameras",
    component: () => import("../views/Cameras.vue"),
    meta: { title: "Cameras" },
  },
  {
    path: "/printers",
    name: "printers",
    component: () => import("../views/Printers.vue"),
    meta: { title: "Printers" },
  },
  {
    path: "/calls",
    name: "calls",
    component: () => import("../views/Calls.vue"),
    meta: { title: "Calls" },
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("../views/Orders.vue"),
    meta: { title: "Orders" },
  },
  {
    path: "/logistics",
    name: "logistics",
    component: () => import("../views/Logistics.vue"),
    meta: { title: "Logistics" },
  },
  {
    path: "/staff",
    name: "staff",
    component: () => import("../views/Staff.vue"),
    meta: { title: "Staff" },
  },
  {
    path: "/customers",
    name: "customers",
    component: () => import("../views/Customers.vue"),
    meta: { title: "Customers" },
  },
  {
    path: "/compliance",
    name: "compliance",
    component: () => import("../views/Compliance.vue"),
    meta: { title: "Compliance" },
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/Admin.vue"),
    meta: { title: "Admin" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = `HeySalad® Cloud Kitchen — ${to.meta.title}`;
  }
});

export default router;
