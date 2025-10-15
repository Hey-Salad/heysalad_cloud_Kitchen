<script setup lang="ts">
import { orders } from "../data/mockData";

const statusTone = (status: (typeof orders)[number]["status"]) => {
  if (status === "completed") return "positive";
  if (status === "processing") return "informational";
  return "warning";
};
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h1>Orders & Payments</h1>
        <p>Stripe and Firestore stay in lockstep so the line keeps moving.</p>
      </div>
      <button class="primary-button" type="button">View Stripe Dashboard</button>
    </header>

    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Customer</th>
            <th scope="col">Items</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td data-title="Order ID">{{ order.id }}</td>
            <td data-title="Customer">{{ order.customerId }}</td>
            <td data-title="Items">{{ order.items.join(", ") }}</td>
            <td data-title="Total">${{ order.total.toFixed(2) }}</td>
            <td data-title="Status">
              <span class="status-pill" :class="`status-pill--${statusTone(order.status)}`">
                {{ order.status }}
              </span>
            </td>
            <td data-title="Created">{{ new Date(order.createdAt).toLocaleTimeString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
