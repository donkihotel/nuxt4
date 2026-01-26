<template>
  <v-container fluid>
    <!-- 데이터 없음 시 안내 -->
    <v-alert v-if="error" :text="error" :title="`No. ${id}`" type="info" class="mb-5"></v-alert>
    <v-row>
      <v-col cols="12">
        <v-list-item>
          <template v-slot:title>
            <h2>{{ domain?.domain ?? '-' }}</h2>
          </template>

          <template v-slot:subtitle>
            No. {{ domain?.id }}
          </template>

          <template v-slot:append>
            <span class="text-subtitle-2">{{ domain?.date }}</span>
          </template>
        </v-list-item>
      </v-col>
      <v-col xs="12" sm="12" md="6" lg="6">
        <v-card border flat>
          <h3 class="bg-surface-light pa-2"><v-icon class="mr-2">mdi-numeric-1-box</v-icon>도메인</h3>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">구매</div>
                  <div>{{ domain?.purchaser ?? '-' }}</div>
                </div>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">네임서버</div>
                  <div>{{ domain?.nameserver ?? '-' }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="my-5" border flat>
          <h3 class="bg-surface-light pa-2"><v-icon class="mr-2">mdi-numeric-2-box</v-icon>홈페이지</h3>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">서버</div>
                  <div>{{ domain?.homepage ?? '-' }}</div>
                </div>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">개발</div>
                  <div>-</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="my-5" border flat>
          <h3 class="bg-surface-light pa-2"><v-icon class="mr-2">mdi-numeric-3-box</v-icon>메일</h3>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">메일 서비스</div>
                  <div>
                    <v-img :src="`/assets/email/${formatEmailIcon(domain?.email ?? '-')}`" width="110" class="mt-1" />
                  </div>
                </div>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">메일 요금제</div>
                  <div>{{ domain?.pricing_plan ?? '-' }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="my-5" border flat>
          <h3 class="bg-surface-light pa-2"><v-icon class="mr-2">mdi-numeric-4-box</v-icon>보안</h3>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">SSL 인증서</div>
                  <div>{{ domain?.ssl ?? '-' }}</div>
                </div>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="6">
                <div>
                  <div class="font-weight-bold">인증서 가격</div>
                  <div><span class="text-caption">₩</span> {{ formatPrice(domain?.ssl_cost as number) }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" sm="12" md="6" lg="6">
        <v-card border flat>
          <h3 class="bg-surface-light pa-2"><v-icon class="mr-2">mdi-clipboard-list-outline</v-icon>견적</h3>
          <v-card-text>
            <v-data-table :headers="headers" :items="domain?.estimates" density="compact" item-key="name"
              hide-default-footer class="text-no-wrap">
              <template v-slot:no-data>
                <div class="mt-4">
                  📌 견적 데이터가 없습니다.
                </div>
              </template>
            </v-data-table>

            <!-- 총 합계 -->
            <div v-if="estimates.length">
              <v-divider class="bg-grey-lighten-2"></v-divider>
              <v-divider class="mt-1 bg-grey-lighten-2"></v-divider>

              <v-sheet class="d-flex justify-end">
                <v-sheet class="pa-2">합계</v-sheet>
                <v-sheet class="pt-2 pb-2 pr-4 d-flex justify-end" width="100">{{ formatPrice(totalSupply) }}</v-sheet>
              </v-sheet>
              <v-divider></v-divider>
              <v-sheet class="d-flex justify-end">
                <v-sheet class="pa-2">VAT 10%</v-sheet>
                <v-sheet class="pt-2 pb-2 pr-4 d-flex justify-end" width="100">{{ formatPrice(vat) }}</v-sheet>
              </v-sheet>
              <v-divider class="bg-grey-lighten-2"></v-divider>
              <v-divider class="mt-1 bg-grey-lighten-2"></v-divider>
              <v-sheet class="d-flex justify-end">
                <v-sheet class="pa-2 font-weight-bold">총 합계</v-sheet>
                <v-sheet class="pt-2 pb-2 pr-4 d-flex justify-end font-weight-bold text-red" width="100">{{
                  formatPrice(totalAmount) }}</v-sheet>
              </v-sheet>
            </div>
          </v-card-text>
        </v-card>

        <!-- 상담 -->
        <Consult kmong-link="https://kmong.com/gig/424545" kakao-link="https://open.kakao.com/o/gbRh8g7h" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import type { DataTableHeader } from 'vuetify'
import { VAutocomplete } from 'vuetify/components'

const route = useRoute()
const id = String(route.params.id)
// const domain = await import(`~/data/domain/${id}.json`)

interface EstimateItem {
  no: number
  work: string
  supplyPrice: number
  quantity: number
  sumPrice: number
}

interface Domain {
  id: number,
  date: string,
  domain: string,
  purchaser: string,
  nameserver: string,
  homepage: string,
  ssl: string,
  ssl_cost: number,
  email: string,
  pricing_plan: string,
  cost: number,
  estimates: EstimateItem[]
}

// --- 모든 JSON 파일 eager import ---
const modules = import.meta.glob('~/data/domain/*.json', { eager: true }) as Record<string, { default: Domain }>

// --- ID 기반 매핑 생성 ---
const domainsById: Record<string, Domain> = {}

for (const path in modules) {
  const proj = modules[path]?.default
  if (!proj) continue
  domainsById[String(proj.id)] = proj
}

// --- id로 프로젝트 가져오기 ---
const domain = domainsById[id] ?? null

// 데이터 없음 처리용 ref
const error = ref<string | null>(null)
if (!domain) {
  error.value = `데이터가 존재하지 않습니다.`
}

// --- estimates 배열 ---
const estimates = ref<EstimateItem[]>(domain?.estimates ?? [])

// 합계 (sumPrice 기준)
const totalSupply = computed(() =>
  estimates.value.reduce((acc, cur) => acc + (cur.sumPrice ?? 0), 0)
)

// VAT 10%
const vat = computed(() => Math.floor(totalSupply.value * 0.1))

// 총합계
const totalAmount = computed(() => totalSupply.value + vat.value)

const headers: DataTableHeader[] = [
  {
    title: 'No', align: 'end', sortable: false, key: 'no'
  },
  {
    title: '작업', align: 'start', sortable: false, key: 'work'
  },
  {
    title: '공급가',
    align: 'end',
    sortable: false,
    key: 'supplyPrice',
    value: item => formatPrice(item.supplyPrice as number)
  },
  {
    title: '수량', align: 'end', sortable: false, key: 'quantity'
  },
  {
    title: '합계(원)',
    align: 'end',
    sortable: false,
    key: 'sumPrice',
    value: item => formatPrice(item.sumPrice as number)
  }
]

// --- 가격 포맷 함수 ---
const formatPrice = (value: number) => {
  if (value === null || value === undefined) {
    return '';
  }

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const formatEmailIcon = (value: string) => {
  switch (value) {
    case 'google':
      return 'google.png'
    case 'naver':
      return 'naver.png'
    case 'microsoft':
      return 'microsoft.png'
    case 'godaddy':
      return 'godaddy.png'
    default:
      return 'default_email.png'
  }
}
</script>