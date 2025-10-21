<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card border flat color="secondary">
          <v-list-item class="px-5">
            <template v-slot:title>No. {{project.id }}</template>
            <template v-slot:append>{{project.date }}</template>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card border flat>
          <v-card-title class="bg-surface-light">
            {{ project.title }}
          </v-card-title>
          <v-card-text class="text-h6 py-2">
            {{ project.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { useRoute } from 'vue-router'
  import { ref, computed } from "vue";

  const route = useRoute()
  const projectId = route.params.id
  const project = await import(`~/data/works/${projectId}.json`)
</script>

<style scoped>

</style>