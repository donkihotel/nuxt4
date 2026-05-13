<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-list-item>
          <v-list-item-title class="text-wrap">
            <span class="text-h5 mr-2 font-weight-bold text-orange-darken-3">{{ server?.type }}</span>
            <span class="text-h5 font-weight-bold">{{ server?.title }}</span>
          </v-list-item-title>
          <template v-slot:append>
            <v-list-item-action class="flex-column align-end">
              <small class="text-high-emphasis">No. {{ server?.id }}</small>
              <small class="text-high-emphasis opacity-60">{{ server?.date }}</small>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-col>
      <v-col xs="12" sm="12" md="6" lg="6" class="left-content">
        <v-card border flat>
          <h3 class="bg-surface-light pa-2">
            <v-icon class="mr-2">mdi-numeric-1-box</v-icon>개발
          </h3>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">프론트</div>
                  <div>{{ server?.development?.frontend ?? '-' }}</div>
                </div>

                <div class="my-3">
                  <div class="font-weight-bold">백엔드</div>
                  <div>{{ server?.development?.backend ?? '-' }}</div>
                </div>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">데이터베이스</div>
                  <div>{{ server?.development?.database ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">외부 연동 및 기타</div>
                  <div>{{ server?.development?.linkage ?? '-' }}</div>
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
                  <div>{{ server?.requirements.hosting ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div>
                    <span class="font-weight-bold">서버 요금</span>
                  </div>
                  <div v-if="server?.requirements.budget">
                    (월) {{ formatPrice(server?.requirements.budget ?? 0) }} 원
                  </div>
                  <div v-else>-</div>
                </div>
                <div>
                  <div class="font-weight-bold">운영 환경</div>
                  <div>{{ server?.requirements.environment ?? '-' }}</div>
                </div>
              </v-col>

              <v-divider vertical></v-divider>

              <v-col cols="6">
                <div>
                  <div>
                    <span class="font-weight-bold">애플리케이션 배포</span>
                  </div>
                  <div>{{ server?.requirements.app_deploy ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">서버 보안</div>
                  <div>{{ server?.requirements.security ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">서버 확장</div>
                  <div>{{ server?.requirements.performance ?? '-' }}</div>
                </div>
                <div>
                  <div class="font-weight-bold">기타</div>
                  <div>{{ server?.requirements.etc ?? '-' }}</div>
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
            <p class="text-h6 font-weight-black">기본</p>
            <v-divider class="my-1"></v-divider>
            <v-img v-if="server?.design.src_network" :src="`/assets/design/${server?.design.src_network}`"></v-img>
            <v-row>
              <v-col cols="6">
                <div class="my-3">
                  <div class="font-weight-bold">컴퓨팅</div>
                  <div>{{ server?.design.instance ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">네트워크</div>
                  <div>{{ server?.design.network ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">OS 및 운영환경</div>
                  <div>{{ server?.design.os ?? '-' }}</div>
                </div>
                <div>
                  <div class="font-weight-bold">스토리지</div>
                  <div>{{ server?.design.storage ?? '-' }}</div>
                </div>
              </v-col>

              <v-divider vertical inset></v-divider>

              <v-col cols="6">
                <div class="my-3">
                  <div class="font-weight-bold">도메인 및 DNS</div>
                  <div>{{ server?.design.dns ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">웹 서버</div>
                  <div>{{ server?.design.webserver ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">데이터베이스</div>
                  <div>{{ server?.design.database ?? '-' }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text>
            <p class="text-h6 font-weight-black">배포</p>
            <v-divider class="my-1"></v-divider>
            <v-img v-if="server?.design.src_deploy" :src="`/assets/design/${server?.design.src_deploy}`"></v-img>
            <v-row>
              <v-col cols="6">
                <div class="my-3">
                  <div class="font-weight-bold">프론트</div>
                  <div>{{ server?.design?.deploy?.frontend ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">백엔드</div>
                  <div>{{ server?.design?.deploy?.backend ?? '-' }}</div>
                </div>
              </v-col>

              <v-divider vertical inset></v-divider>

              <v-col cols="6">
                <div class="my-3">
                  <div class="font-weight-bold">소스</div>
                  <div>{{ server?.design?.deploy?.source ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">빌드</div>
                  <div>{{ server?.design?.deploy?.build ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">배포</div>
                  <div>{{ server?.design?.deploy?.deploy ?? '-' }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text>
            <p class="text-h6 font-weight-black">보안 <span class="text-body-2">(Level {{
              getSecurityCount(server?.design?.security?.tools) ?? '-' }})</span></p>
            <v-divider class="my-1"></v-divider>
            <v-img v-if="server?.design.src_security" :src="`/assets/design/${server?.design.src_security}`"></v-img>
            <v-row>
              <v-col cols="12">
                <div class="my-3">
                  <div class="font-weight-bold">보안 도구</div>
                  <div>{{ server?.design?.security?.tools ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">보안 기타</div>
                  <div>{{ server?.design?.security?.etc ?? '-' }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text>
            <p class="text-h6 font-weight-black">부하분산</p>
            <v-divider class="my-1"></v-divider>
            <v-img v-if="server?.design.src_loadbalancer"
              :src="`/assets/design/${server?.design.src_loadbalancer}`"></v-img>
            <v-row>
              <v-col cols="6">
                <div class="my-3">
                  <div class="font-weight-bold">로드밸런서</div>
                  <div>{{ server?.design?.extension?.loadbalancer ?? '-' }}</div>
                </div>
                <div class="my-3">
                  <div class="font-weight-bold">오토스케일링</div>
                  <div>{{ server?.design?.extension?.autoscaling ?? '-' }}</div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="my-3">
                  <div class="font-weight-bold">CDN</div>
                  <div>{{ server?.design?.extension?.cdn ?? '-' }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text>
            <p class="text-h6 font-weight-black">소프트웨어</p>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="12">
                <div class="my-3">
                  <div class="font-weight-bold">설치</div>
                  <div>{{ server?.design?.software ?? '-' }}</div>
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
            <v-data-table :headers="scheduleHeaders" :items="server?.schedule" density="compact" item-key="name"
              hide-default-footer class="text-no-wrap">
              <template #item.working_day="{ item }">
                <span>{{ item.working_day }}</span>
              </template>

              <template v-slot:no-data>
                📌 일정 데이터가 없습니다.
              </template>
            </v-data-table>

            <v-divider class="bg-grey-lighten-2"></v-divider>
            <v-divider class="mt-1 bg-grey-lighten-2"></v-divider>
            <v-sheet class="d-flex justify-end">
              <v-sheet class="pa-2 font-weight-bold">합계</v-sheet>
              <v-sheet class="pt-2 pb-2 pr-4 d-flex justify-end font-weight-bold" width="100">{{ totalWorkingDay
              }}</v-sheet>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 오른쪽 콘텐츠: 고정 -->
      <v-col xs="12" sm="12" md="6" lg="6" class="right-content">
        <div class="sticky-box">
          <v-card border flat>
            <h3 class="bg-surface-light pa-2">
              <v-icon class="mr-2">mdi-numeric-5-box</v-icon>견적
            </h3>
            <v-card-text>
              <v-data-table :headers="headers" :items="server?.estimate" density="compact" item-key="name"
                hide-default-footer class="text-no-wrap">
                <template v-slot:no-data>
                  📌 견적 데이터가 없습니다.
                </template>
              </v-data-table>

              <v-divider></v-divider>

              <div v-if="estimate.length">
                <v-sheet class="d-flex justify-end">
                  <v-sheet class="pa-2">합계</v-sheet>
                  <v-sheet class="pt-2 pb-2 pr-4 d-flex justify-end" width="100">{{ totalSupply.toLocaleString()
                  }}</v-sheet>
                </v-sheet>
                <v-divider></v-divider>
                <v-sheet class="d-flex justify-end">
                  <v-sheet class="pa-2">VAT 10%</v-sheet>
                  <v-sheet class="pt-2 pb-2 pr-4 d-flex justify-end" width="100">{{ vat.toLocaleString() }}</v-sheet>
                </v-sheet>
                <v-divider class="bg-grey-lighten-2"></v-divider>
                <v-divider class="mt-1 bg-grey-lighten-2"></v-divider>
                <v-sheet class="d-flex justify-end">
                  <v-sheet class="pa-2 font-weight-bold">합계</v-sheet>
                  <v-sheet class="pt-2 pb-2 pr-4 d-flex justify-end font-weight-bold" width="100">{{
                    totalAmount.toLocaleString() }}</v-sheet>
                </v-sheet>
              </div>
            </v-card-text>
          </v-card>

          <!-- 상담 -->
          <Consult kmong-link="https://kmong.com/gig/220715" kakao-link="https://open.kakao.com/o/sfJs7iHe" />
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

// 개발
interface Development {
  frontend: string
  backend: string
  database: string
  linkage: string
}

// 아키텍처 > 배포
interface Deploy {
  frontend: string
  backend: string
  source: string
  build: string
  deploy: string
}

// 아키텍처 > 보안
interface Security {
  tools: string
  etc: string
}

// 아키텍처 > 확장
interface Extension {
  loadbalancer: string
  autoscaling: string
  cdn: string
}

// 아키텍처
interface Design {
  src_network: string
  src_deploy: string
  src_security: string
  src_loadbalancer: string
  instance: string
  network: string
  os: string
  storage: string
  webserver: string
  database: string
  dns: string
  deploy: Deploy,       // 배포
  security: Security    // 보안
  extension: Extension  // 확장
  software: string
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
  etc: string
}

interface Server {
  id: number
  date: string
  type: string
  title: string
  subtitle: string
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
  { title: 'No', key: 'no', align: 'end', sortable: false },
  { title: '구분', key: 'category', align: 'start', sortable: false },
  { title: '작업', key: 'title', align: 'start', sortable: false },
  { title: '작업일', key: 'working_day', align: 'end', sortable: false }
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
  overflow-y: auto;
  /* 세로 스크롤 허용 */
  max-height: 100%;
  /* 화면 높이까지만 */
}

.right-content .sticky-box {
  position: sticky;
  top: 0;
  /* 상단에 고정 */
}
</style>