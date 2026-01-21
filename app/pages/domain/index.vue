<template>
  <v-sheet class="pa-6 text-white mx-auto " color="#141518">
    <h4 class="text-h5 font-weight-bold mb-4">도메인 연결</h4>
    <p>
      도메인에 홈페이지 · 메일 · SSL 연결 작업을 원격리모트 해서 작업을 해드립니다.<br />
    </p>
  </v-sheet>

  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        <v-icon class="mr-2">mdi-numeric-1-box</v-icon>
        도메인 홈페이지
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        홈페이지 서비스 윅스, 아임웹, 구글사이트, 캔바, 카페24쇼핑몰, 서버 호스팅 등의 서비스를 도메인 연결을 해드립니다.<br />
        <span class="text-subtitle-2 text-medium-emphasis">네임 서버 변경, 레코드 A, CNAME 설정 합니다.</span>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        <v-icon class="mr-2">mdi-numeric-2-box</v-icon>
        도메인 메일
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        구글워크스페이스, 네이버웍스, 마이크로소프트365 등의 다양한 메일 서비스를 도메인 연결을 해드립니다.<br />
        <span class="text-subtitle-2 text-medium-emphasis">메일 신뢰도를 위해서 DKIM, SPF, DMARC 설정 합니다.</span>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        <v-icon class="mr-2">mdi-numeric-3-box</v-icon>
        도메인 SSL
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        SSL 인증서 구매부터 설치까지 해드립니다.<br />
        <span class="text-subtitle-2 text-medium-emphasis">Nginx, Apache 인증서를 설정 합니다.</span>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <v-data-table :headers="headers" :items="items" :items-per-page="10" v-model:page="page" hover class="text-no-wrap"
    @click:row="handleClickRow" disable-sort>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>도메인 연결</v-toolbar-title>
      </v-toolbar>
    </template>

    <template #item.ssl_cost="{ item }">
      {{ formatPrice(item.ssl_cost) }}
    </template>

    <template #item.email="{ item }">
      <v-img v-if="!itemEmailError[item.id]" :src="`assets/email/${formatMailIcon(item.email)}`" width="120"
        @error="itemEmailError[item.id] = true" />

      <span v-else>{{ item.email }}</span>
    </template>

    <template #item.pricing_plan="{ item }">
      {{ item.pricing_plan }}
    </template>

    <template #item.cost="{ item }">
      {{ formatPrice(item.cost) }}
    </template>

    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount" @update:model-value="handlePage"></v-pagination>
      </div>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
useHead({
  title: '도메인 홈페이지 및 메일 연결 | 2CPU2RAM',
  meta: [
    { name: 'description', content: '도메인 홈페이지 및 메일 연결' },
    { name: 'keywords', content: 'AWS,서버,구축,설계,배포,인프라,클라우드,호스팅' }
  ]
})

import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { DataTableHeader } from 'vuetify'

const route = useRoute()
const router = useRouter()

// 테이블 헤더
const headers: DataTableHeader[] = [
  { title: 'No', value: 'id', align: 'end' },
  { title: '도메인', key: 'domain' },
  { title: '구매', key: 'purchaser' },
  { title: '네임서버', key: 'nameserver' },
  { title: '홈페이지', key: 'homepage' },
  { title: 'SSL 인증서', key: 'ssl' },
  { title: '인증서 가격', key: 'ssl_cost', align: 'end' },
  { title: '메일 서비스', key: 'email' },
  { title: '메일 요금제', key: 'pricing_plan' },
  { title: '연결 비용', key: 'cost', align: 'end' },
]

// 데이터 구조
interface Domains {
  id: number
  domain: string,
  purchaser: string,
  nameserver: string,
  homepage: string,
  ssl: string,
  ssl_cost: number,
  email: string,
  pricing_plan: string,
  cost: number,
}

// 상태
const items = ref<Domains[]>([])
const page = ref(Number(route.query.page) || 1)
const perPage = 10

// 데이터 로드
onMounted(async () => {
  const data = await import('~/data/domain/main.json')
  items.value = (data.default.domains || []).slice().sort((a, b) => b.id - a.id)
})

// 전체 페이지 수
const pageCount = computed(() => Math.ceil(items.value.length / perPage) || 1)

// 현재 페이지 데이터 계산
const paginatedItems = computed(() => {
  const start = (page.value - 1) * perPage
  return items.value.slice(start, start + perPage)
})

// 페이지 변경 시 호출 (선택적)
function handlePage(value: number) {
  page.value = value
  router.replace({ path: route.path, query: { ...route.query, page: value } })
}

// 행 클릭 시 상세 페이지로 이동
const handleClickRow = (item: any, row: any) => {
  router.push(`/domain/${row.item.id}`)
}

const { formatPrice } = useFormatPrice()
const { formatMailIcon } = useFormatMailIcon()

const itemEmailError = reactive<{ [key: string]: boolean }>({})
</script>