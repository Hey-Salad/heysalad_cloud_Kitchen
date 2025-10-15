<script setup lang="ts">
import { customers } from "../data/mockData";
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h1>Customers</h1>
        <p>Snapshot of loyalty points powered by the <code>customers</code> collection.</p>
      </div>
      <button class="ghost-button" type="button">Export CSV</button>
    </header>

    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Reward points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id">
            <td data-title="Name">{{ customer.name }}</td>
            <td data-title="Email">{{ customer.email }}</td>
            <td data-title="Reward points">{{ customer.rewardPoints }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
