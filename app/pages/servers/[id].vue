<template>
  <v-container fluid>
    <v-row>
      <!-- 왼쪽 콘텐츠: 브라우저 전체 스크롤 -->
      <v-col cols="12">
        <v-card border flat color="primary">
          <v-list-item class="px-5">
            <template v-slot:title>No. {{server?.id }}</template>
            <template v-slot:append>{{server?.date }}</template>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="6" class="left-content">
        <v-card border flat>
          <h3 class="bg-surface-light pa-2"><v-icon class="mr-2">mdi-numeric-1-box</v-icon>개발</h3>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">프로젝트</div>
                  <div>{{ server?.title ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">도메인</div>
                  <div>{{server?.domain }}</div>
                </div>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">프론트</div>
                  <div>{{server?.frontend ?? '-' }}</div>
                </div>

                <div class="my-3">
                  <div class="font-weight-bold">백엔드</div>
                  <div>{{server?.backend ?? '-' }}</div>
                </div>

                <div class="my-3">
                  <div class="font-weight-bold">데이터베이스</div>
                  <div>{{server?.database ?? '-' }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="my-5" border flat>
          <h3 class="bg-surface-light pa-2"><v-icon class="mr-2">mdi-numeric-2-box</v-icon>요구사항</h3>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">호스팅</div>
                  <div>{{server?.requirements.hosting ?? '-' }}</div>
                </div>

                <div class="my-3">
                  <div class="font-weight-bold">서버 요금</div>
                  <div v-if="server?.requirements.budget">(월) {{formatPrice(server?.requirements.budget ?? 0 )}} 원</div>
                  <div v-else>-</div>
                </div>

                <div class="my-3">
                  <div class="font-weight-bold">서버 확장</div>
                  <div>{{server?.requirements.scale ?? '-' }}</div>
                </div>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="6">
                 <div>
                  <div class="font-weight-bold">개발 배포</div>
                  <div>{{server?.requirements.deployment ?? '-' }}</div>
                </div>

                <div class="my-3">
                  <div class="font-weight-bold">백업</div>
                  <div>{{server?.requirements.backup ?? '-' }}</div>
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
          <h3 class="bg-surface-light pa-2"><v-icon class="mr-2">mdi-numeric-3-box</v-icon>설계</h3>
          <v-card-text>
            <v-img :src="`${$config.public.baseURL}/${server?.design}`" alt="Server Image" width="100%" />
          </v-card-text>
        </v-card>

        <v-card border flat>
          <h3 class="bg-surface-light pa-2"><v-icon class="mr-2">mdi-numeric-4-box</v-icon>일정</h3>
          <v-card-text>
            <v-timeline dense>
              <v-timeline-item
                color="primary"
                icon="mdi-calendar"
                v-for="item in server?.schedule"
                :key="item.no"
              >
                <v-card flat>
                  <v-card-title class="font-weight-bold">{{ item.day }}</v-card-title>
                  <v-card-text>
                    <div class="font-weight-bold">{{ item.title }}</div>
                    <div>{{ item.description }}</div>
                  </v-card-text>
                </v-card>
              </v-timeline-item>

            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 오른쪽 콘텐츠: 고정 -->
      <v-col cols="6" class="right-content">
        <div class="sticky-box">
          <v-card border flat>
            <h3 class="bg-surface-light pa-2"><v-icon class="mr-2">mdi-clipboard-list-outline</v-icon>견적</h3>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="server?.estimates"
                density="compact"
                item-key="name"
                hide-default-footer
              >
                <template v-slot:no-data>
                  📌 견적 데이터가 없습니다.
                </template>
              </v-data-table>

              <v-divider></v-divider>

              <div v-if="estimates.length">
                <v-sheet class="d-flex justify-end" >
                  <v-sheet class="pa-2 font-weight-bold">작업 합계</v-sheet>
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
                  <v-sheet class="pa-2 font-weight-bold">총 합계</v-sheet>
                  <v-sheet class="pt-2 pb-2 pr-4 d-flex justify-end font-weight-bold text-red" width="100">{{ totalAmount.toLocaleString() }}</v-sheet>
                </v-sheet>
              </div>
            </v-card-text>
          </v-card>

          <v-card border flat class="my-5">
            <h3 class="bg-surface-light pa-2"><v-icon class="mr-2">mdi-chat-outline</v-icon>상담</h3>
            <v-card-text>
              <div class="pt-2 pb-1">
                <v-icon
                  icon="mdi-phone-outline"
                  size="small"
                  class="me-2"
                ></v-icon
                ><span>결제 전, 전화상담 제공</span><v-spacer></v-spacer>
              </div>
              <div class="pt-1 pb-1">
                <v-icon
                  icon="mdi-clock-outline"
                  size="small"
                  class="me-2"
                ></v-icon>
                <span>연락 가능 시간: 09시 ~ 21시</span><v-spacer></v-spacer>
              </div>
              <div class="pt-1 pb-2">
                <v-icon
                  icon="mdi-comment-outline"
                  size="small"
                  class="me-2"
                ></v-icon>
                <span>평균 응답 시간: 10분 이내</span><v-spacer></v-spacer>
              </div>
              <v-sheet color="grey-lighten-5" rounded="lg" class="text-center">
                <v-row no-gutters>
                  <v-col cols="4">
                    <v-sheet class="ma-2 pa-2" color="grey-lighten-5">
                      <span class="font-weight-bold">186건 </span>
                      <v-spacer></v-spacer>
                      <span class="text-medium-emphasis">거래수 </span>
                    </v-sheet>
                  </v-col>
                  <v-col cols="4">
                    <v-sheet class="ma-2 pa-2" color="grey-lighten-5">
                      <span class="font-weight-bold">100% </span>
                      <v-spacer></v-spacer>
                      <span class="text-medium-emphasis">만족도 </span>
                    </v-sheet>
                  </v-col>
                  <v-col cols="4">
                    <v-sheet class="ma-2 pa-2" color="grey-lighten-5">
                      <span class="font-weight-bold">개인회원 </span>
                      <v-spacer></v-spacer>
                      <span class="text-medium-emphasis">회원구분 </span>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-card-text>
            <v-card-actions class="pa-4">
              <v-spacer></v-spacer>
              <v-btn
                size="large"
                variant="outlined"
                width="200"
              >
                 <img
                  src="/assets/btn/kmong.png"
                  alt="kmong"
                  height="24"
                  class="mr-1 mt-1"
                />
                크몽
              </v-btn>
              <v-btn
                size="large"
                color="yellow darken-3"
                variant="flat"
                width="200"
              >
                <img
                  src="/assets/btn/kakao.png"
                  alt="kakao"
                  height="24"
                  class="mr-1 mt-1"
                />
                카카오톡
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12">
        <v-card flat>
          <v-list-item class="px-5">

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
interface ScheduleItem {
  no: number
  day: string
  milestone: string
  title: string
  description: string
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
  scale: string
  deployment: string
  backup: string
  security: string
}

interface Server {
  id: number
  date: string
  title: string
  domain: string
  frontend: string
  backend: string
  database: string
  requirements: Requirements
  design: string
  schedule: ScheduleItem[]
  estimates: EstimateItem[]
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

// --- estimates 배열 ---
const estimates = ref<EstimateItem[]>(server?.estimates ?? [])

// 합계 (sumPrice 기준)
const totalSupply = computed(() =>
  estimates.value.reduce((acc, cur) => acc + (cur.sumPrice ?? 0), 0)
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