<script setup lang="ts">
import { staffMembers } from "../data/mockData";
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h1>Staff</h1>
        <p>Toggle teammates straight from the Firestore-backed roster.</p>
      </div>
      <button class="primary-button" type="button">Invite team member</button>
    </header>

    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in staffMembers" :key="member.id">
            <td data-title="Name">{{ member.name }}</td>
            <td data-title="Role">{{ member.role }}</td>
            <td data-title="Status">
              <span
                class="status-pill"
                :class="`status-pill--${member.active ? 'positive' : 'warning'}`"
              >
                {{ member.active ? "Active" : "Suspended" }}
              </span>
            </td>
            <td data-title="Actions">
              <button class="ghost-button ghost-button--inline" type="button">
                View profile
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
