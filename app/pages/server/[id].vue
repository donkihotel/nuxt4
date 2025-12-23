<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-list-item>
          <template v-slot:title>
            <h2>{{ server?.title ?? '-' }}</h2>
          </template>

          <template v-slot:subtitle>
            No. {{server?.id }}
          </template>

          <template v-slot:append>
            <span class="text-subtitle-2">{{server?.date }}</span>
          </template>
        </v-list-item>
      </v-col>
      <v-col cols="6" class="left-content">
        <v-card border flat>
          <h3 class="bg-surface-light pa-2">
            <v-icon class="mr-2">mdi-numeric-1-box</v-icon>개발
          </h3>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">프론트</div>
                  <div>{{server?.development?.frontend ?? '-' }}</div>
                </div>

                <div class="my-3">
                  <div class="font-weight-bold">백엔드</div>
                  <div>{{server?.development?.backend ?? '-' }}</div>
                </div>

                <div class="my-3">
                  <div class="font-weight-bold">데이터베이스</div>
                  <div>{{server?.development?.database ?? '-' }}</div>
                </div>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">외부 연동</div>
                  <div>{{server?.development?.linkage ?? '-' }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="my-5" border flat>
          <h3 class="bg-surface-light pa-2">
            <v-icon class="mr-2">mdi-numeric-2-box</v-icon>요구사항
          </h3>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">호스팅</div>
                  <div>{{server?.requirements.hosting ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div>
                    <span class="font-weight-bold">예산</span>
                    <span class="font-italic"> - 서버 요금(월)</span>
                  </div>
                  <div v-if="server?.requirements.budget">
                    {{formatPrice(server?.requirements.budget ?? 0 )}} 원
                  </div>
                  <div v-else>-</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">환경</div>
                  <div>{{server?.requirements.environment ?? '-' }}</div>
                </div>
              </v-col>

              <v-divider vertical></v-divider>

              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">성능</div>
                  <div>{{ server?.requirements.performance ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">애플리케이션 배포</div>
                  <div>{{ server?.requirements.app_deploy ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">보안</div>
                  <div>{{server?.requirements.security ?? '-' }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="my-5" border flat>
          <h3 class="bg-surface-light pa-2">
            <v-icon class="mr-2">mdi-numeric-3-box</v-icon>아키텍처
          </h3>
            <v-card-text>
            <v-row>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">인스턴스</div>
                  <div>{{ server?.design.instance ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">VPC 네트워크</div>
                  <div>{{ server?.design.vpc ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">OS 운영체제</div>
                  <div>{{ server?.design.os ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">웹 서버</div>
                  <div>{{ server?.design.web_server ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">데이터베이스</div>
                  <div>{{server?.design.database ?? '-' }}</div>
                </div>
              </v-col>

              <v-divider vertical></v-divider>

              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">파일</div>
                  <div>{{ server?.design.storage ?? '-' }}</div>
                </div>

                <div class="my-3">
                  <div class="font-weight-bold">성능</div>
                  <div>{{ server?.design.performance ?? '-' }}</div>
                </div>

                <div class="my-3">
                  <div class="font-weight-bold">보안</div>
                  <div>{{ server?.design.security ?? '-' }}</div>
                </div>

                 <div class="my-3">
                  <div class="font-weight-bold">CDN</div>
                  <div>{{ server?.design.cdn ?? '-' }}</div>
                </div>

                <div class="my-3">
                  <div class="font-weight-bold">어플리케이션 배포</div>
                  <div>{{ server?.design.app_deploy ?? '-' }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card border flat>
          <h3 class="bg-surface-light pa-2">
            <v-icon class="mr-2">mdi-numeric-4-box</v-icon>일정
          </h3>
          <v-card-text>
            <v-data-table
              :headers="scheduleHeaders"
              :items="server?.schedule"
              density="compact"
              item-key="name"
              hide-default-footer
              class="text-no-wrap"
            >
              <template #item.working_day="{ item }">
                <span>{{ item.working_day }}</span>
              </template>

              <template v-slot:no-data>
                📌 일정 데이터가 없습니다.
              </template>
            </v-data-table>

            <v-divider class="bg-grey-lighten-2"></v-divider>
            <v-divider class="mt-1 bg-grey-lighten-2"></v-divider>
              <v-sheet class="d-flex justify-end" >
              <v-sheet class="pa-2 font-weight-bold">합계</v-sheet>
              <v-sheet class="pt-2 pb-2 pr-4 d-flex justify-end font-weight-bold" width="100">{{ totalWorkingDay }} 일</v-sheet>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 오른쪽 콘텐츠: 고정 -->
      <v-col cols="6" class="right-content">
        <div class="sticky-box">
          <v-card border flat>
            <h3 class="bg-surface-light pa-2">
              <v-icon class="mr-2">mdi-clipboard-list-outline</v-icon>견적
            </h3>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="server?.estimate"
                density="compact"
                item-key="name"
                hide-default-footer
                class="text-no-wrap"
              >
                <template v-slot:no-data>
                  📌 견적 데이터가 없습니다.
                </template>
              </v-data-table>

              <v-divider></v-divider>

              <div v-if="estimate.length">
                <v-sheet class="d-flex justify-end" >
                  <v-sheet class="pa-2">합계</v-sheet>
                  <v-sheet class="pt-2 pb-2 pr-4 d-flex justify-end" width="100">{{ totalSupply.toLocaleString() }}</v-sheet>
                </v-sheet>
                <v-divider></v-divider>
                <v-sheet class="d-flex justify-end" >
                  <v-sheet class="pa-2">VAT 10%</v-sheet>
                  <v-sheet class="pt-2 pb-2 pr-4 d-flex justify-end" width="100">{{ vat.toLocaleString() }}</v-sheet>
                </v-sheet>
                <v-divider class="bg-grey-lighten-2"></v-divider>
                <v-divider class="mt-1 bg-grey-lighten-2"></v-divider>
                  <v-sheet class="d-flex justify-end" >
                  <v-sheet class="pa-2 font-weight-bold">합계</v-sheet>
                  <v-sheet class="pt-2 pb-2 pr-4 d-flex justify-end font-weight-bold text-red" width="100">{{ totalAmount.toLocaleString() }} 원</v-sheet>
                </v-sheet>
              </div>
            </v-card-text>
          </v-card>

          <!-- 상담 -->
          <Consult
            kmong-link="https://kmong.com/gig/220715"
            kakao-link="https://open.kakao.com/o/sfJs7iHe"
          />
        </div>
      </v-col>
      <v-col cols="12">
        <v-card flat>
          <v-list-item class="px-1">

          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import type { DataTableHeader } from 'vuetify'

const route = useRoute()
const id = String(route.params.id) // string으로 통일

// --- JSON 파일 타입 정의 ---
interface Development {
  frontend: string
  backend: string
  database: string
  linkage: string
}

interface Design {
  instance: string
  vpc: string
  os: string
  web_server: string
  app_deploy: string
  database: string
  storage: string
  performance: string
  security: string,
  cdn: string
}

interface ScheduleItem {
  no: number
  category: string
  title: string
  quantity: number
  working_day: number
}

interface EstimateItem {
  no: number
  work: string
  supplyPrice: number
  quantity: number
  sumPrice: number
}

interface Requirements {
  hosting: string
  budget: number
  environment: string
  performance: string
  app_deploy: string
  server_backup: string
  security: number
}

interface Server {
  id: number
  date: string
  title: string
  domain: string
  development: Development
  requirements: Requirements
  design: Design
  schedule: ScheduleItem[]
  estimate: EstimateItem[]
}

// --- 모든 JSON 파일 eager import ---
const modules = import.meta.glob('~/data/server/*.json', { eager: true }) as Record<string, { default: Server }>

// --- ID 기반 매핑 생성 ---
const serversById: Record<string, Server> = {}

for (const path in modules) {
  const proj = modules[path]?.default
  if (!proj) continue
  serversById[String(proj.id)] = proj
}

// --- id로 프로젝트 가져오기 ---
const server = serversById[id] ?? null

// 데이터 없음 처리용 ref
const error = ref<string | null>(null)
if (!server) {
  error.value = `서버 데이터가 존재하지 않습니다. ID: ${id}`
}

// --- estimate 배열 ---
const estimate = ref<EstimateItem[]>(server?.estimate ?? [])

// 합계 (sumPrice 기준)
const totalSupply = computed(() =>
  estimate.value.reduce((acc, cur) => acc + (cur.sumPrice ?? 0), 0)
)

// VAT 10%
const vat = computed(() => Math.floor(totalSupply.value * 0.1))

// 총합계
const totalAmount = computed(() => totalSupply.value + vat.value)

// --- Vuetify 테이블 헤더 ---
const headers: DataTableHeader[] = [
  { title: 'No', align: 'end', sortable: false, key: 'no' },
  { title: '작업', align: 'start', sortable: false, key: 'work' },
  {
    title: '공급가 (원)',
    align: 'end',
    sortable: false,
    key: 'supplyPrice',
    value: item => formatPrice(item.supplyPrice as number)
  },
  { title: '수량', align: 'end', sortable: false, key: 'quantity' },
  {
    title: '합계 (원)',
    align: 'end',
    sortable: false,
    key: 'sumPrice',
    value: item => formatPrice(item.sumPrice as number)
  },
]

const scheduleHeaders: DataTableHeader[] = [
  { title: 'No', align: 'end', sortable: false, key: 'no' },
  { title: '구분', align: 'start', sortable: false, key: 'category' },
  { title: '작업', align: 'start', sortable: false, key: 'title' },
  { title: '수량', align: 'end', sortable: false, key: 'quantity' },
  { title: '작업일', align: 'end', sortable: false, key: 'working_day' },
]

// --- schedule 배열 ---
const schedule = ref<ScheduleItem[]>(server?.schedule ?? [])

// 합계 (sumPrice 기준)
const totalWorkingDay = computed(() => {
  return schedule.value.reduce((sum, item) => {
    return sum + (item.working_day ?? 0)
  }, 0)
})


const { formatDevIcon } = useFormatDevIcon();

const getSecurityCount = (value: string | number | null | undefined): number => {
  if (!value) return 0;

  const normalized = String(value);

  return normalized
    .split(',')
    .map(v => v.trim())
    .filter(v => v.length > 0)
    .length;
};

// --- 가격 포맷 함수 ---
function formatPrice(value: number) {
  if (value == null) return '0'
  return value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')
}
</script>



<style scoped>
.left-content {
  overflow-y: auto; /* 세로 스크롤 허용 */
  max-height: 100%; /* 화면 높이까지만 */
}

.right-content .sticky-box {
  position: sticky;
  top: 0; /* 상단에 고정 */
}
</style>