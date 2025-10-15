<script setup lang="ts">
import { complianceReports } from "../data/mockData";
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h1>Compliance Vault</h1>
        <p>Drop audits here; Storage holds the file while Firestore tracks the meta.</p>
      </div>
      <button class="primary-button" type="button">Upload report</button>
    </header>

    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th scope="col">Report</th>
            <th scope="col">Link</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in complianceReports" :key="report.id">
            <td data-title="Report">{{ report.reportType }}</td>
            <td data-title="Link">
              <a :href="report.fileUrl" target="_blank" rel="noreferrer">View file</a>
            </td>
            <td data-title="Created">
              {{ new Date(report.createdAt).toLocaleDateString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
