<template>
  <v-sheet border="md"
    class="pa-6 text-white mx-auto "
    color="#141518">
    <h4 class="text-h5 font-weight-bold mb-4">작업 설명</h4>
    <h3>서버를 구축하는데 다양한 작업이 있습니다.</h3>
    <p>
      · 아임웹, 윅스, 카페24 쇼핑몰, 구글사이트도구, 캔바 및 기타 홈페이지 연결
      <br>
      · 네이버웍스, 구글워크스페이스, 마이크로소프트365 및 기타 메일서비스 연결
    </p>
  </v-sheet>

  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="10"
    v-model:page="page"
    hover
    class="text-no-wrap"
    @click:row="handleClickRow"
    disable-sort
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          작업 설명
        </v-toolbar-title>
      </v-toolbar>
    </template>

    <template #item.price="{ item }">
      <span class="text-caption">₩</span> {{ formatPrice(item.price) }}
    </template>

    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination
          v-model="page"
          :length="pageCount"
          @update:model-value="handlePage"
        ></v-pagination>
      </div>
    </template>

  </v-data-table>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import type { DataTableHeader } from 'vuetify'

  const route = useRoute()
  const router = useRouter()

  // 테이블 헤더
  const headers: DataTableHeader[] = [
    { title: 'No', key: 'id' },
    { title: '작업명', key: 'title' },
    { title: '난이도', key: 'difficulty' },
    { title: '작업시간', key: 'duration' },
    { title: '작업가격', key: 'price', align: 'end' },
  ]

   // 데이터 구조
  interface Worker {
    id: number
    title: string,
    price: number,
    difficulty: string,
    duration: string
  }

  // 상태
  const items = ref<Worker[]>([])
  const page = ref(Number(route.query.page) || 1)
  const perPage = 10

  // 데이터 로드
  onMounted(async () => {
    const data = await import('~/data/works/main.json')
    items.value = (data.default.works || []).slice().sort((a, b) => b.id - a.id)
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
    router.push(`/works/${row.item.id}`)
  }

  const formatPrice = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
</script>