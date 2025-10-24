<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card border flat color="black">
          <v-list-item class="px-5">
            <template v-slot:title>No. {{project.id }}</template>
            <template v-slot:append>{{project.date }}</template>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card border flat>
          <v-card-title class="bg-surface-light">
            {{ project.title }}
          </v-card-title>

          <v-card-text class="py-3">
            <v-row class="text-center">
              <v-col cols="4">
                <div class="font-weight-bold">난이도</div>
                <div>{{ project.difficulty }}</div>
              </v-col>
              <v-col cols="4">
                <div class="font-weight-bold">작업시간</div>
                <div>{{ project.time }}</div>
              </v-col>
              <v-col cols="4">
                <div class="font-weight-bold">작업가격</div>
                <div>{{ project.price }}</div>
              </v-col>
            </v-row>
            <v-divider class="my-4"></v-divider>
            <v-row>
              <v-col>
                <v-img :src="project.image " />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card border flat>
          <v-card-title class="bg-surface-light">
            작업 과정
          </v-card-title>
          <v-card-text class="py-2">
            <v-timeline side="end" density="compact">
              <v-timeline-item
                v-for="item in project.process"
                :key="item.step"
                size="x-small"
              >
                <div>
                  <div class="text-h6">{{ item.title }}</div>
                  <p>
                    {{ item.content }}
                  </p>
                </div>
              </v-timeline-item>
            </v-timeline>
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