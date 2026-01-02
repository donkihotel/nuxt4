<template>
  <v-container fluid>
    <!-- 데이터 없음 시 안내 -->
    <v-alert v-if="error" :text="error" :title="`No. ${id}`" type="info" class="mb-5"></v-alert>
    <v-row>
      <v-col cols="12">
        <v-list-item>
          <template v-slot:title>
            <h2>{{ task?.title ?? '-' }}</h2>
          </template>

          <template v-slot:subtitle>
            No. {{ task?.id }}
          </template>

          <template v-slot:append>
            <span class="text-subtitle-2">{{ task?.date }}</span>
          </template>
        </v-list-item>
      </v-col>
      <v-col cols="6">
        <v-card border flat>
          <h3 class="bg-surface-light pa-2">
            <v-icon class="mr-2">mdi-numeric-1-box</v-icon>개요
          </h3>
          <v-card-text class="py-3">
            <v-row>
              <v-col cols="4">
                <div class="font-weight-bold">작업 과정</div>
                <div>{{ process.length }} 단계</div>
              </v-col>
              <v-col cols="4">
                <div class="font-weight-bold">작업 시간</div>
                <div>{{ task?.time ?? '-' }} 시간</div>
              </v-col>
              <v-col cols="4">
                <div class="font-weight-bold">작업 비용</div>
                <div>{{ task?.price ?? '-' }} 만원</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="my-5" border flat>
          <h3 class="bg-surface-light pa-2">
            <v-icon class="mr-2">mdi-numeric-2-box</v-icon>작업 과정
          </h3>
          <v-card-text class="py-2">
            <v-timeline side="end" density="compact">
              <v-timeline-item v-for="taskItem in process" :key="taskItem.step" size="x-small">
                <div>
                  <div class="text-h6">{{ taskItem.title }}</div>
                  <p>
                    {{ taskItem.content }}
                  </p>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card border flat min-height="110">
          <h3 class="bg-surface-light pa-2">
            <v-icon class="mr-2">mdi-numeric-3-box</v-icon>아키텍처
          </h3>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <div>
                  <div v-if="task?.image"><v-img :src="task?.image" /></div>
                  <div else>N/A</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- 상담 -->
        <Consult kmong-link="https://kmong.com/gig/220715" kakao-link="https://open.kakao.com/o/sfJs7iHe" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed } from "vue";

const route = useRoute()
const id = String(route.params.id)

interface Task {
  id: number
  title: string
  type: string
  level: string
  time: string
  price: number
  date: string
  image: string
  process: ProcessItem[]
}

interface ProcessItem {
  step: number
  title: string
  content: string
}

// --- 모든 JSON 파일 eager import ---
const modules = import.meta.glob('~/data/task/*.json', { eager: true }) as Record<string, { default: Task }>

// --- ID 기반 매핑 생성 ---
const tasksById: Record<string, Task> = {}

for (const path in modules) {
  const proj = modules[path]?.default
  if (!proj) continue
  tasksById[String(proj.id)] = proj
}

// --- id로 프로젝트 가져오기 ---
const task = tasksById[id] ?? null

// 데이터 없음 처리용 ref
const error = ref<string | null>(null)
if (!task) {
  error.value = `데이터가 존재하지 않습니다.`
}

// --- process 배열 ---
const process = ref<ProcessItem[]>(task?.process ?? [])

const { formatPrice } = useFormatPrice()
</script>