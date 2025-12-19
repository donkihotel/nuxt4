<template>
  <v-sheet border="md"
    class="pa-6 text-white mx-auto "
    color="#141518">
    <h4 class="text-h5 font-weight-bold mb-4">작업 가격</h4>
    <p>
      작업은 난이도와 작업 시간에 따라서, 작업 비용 차이가 있습니다.
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
          작업
        </v-toolbar-title>
      </v-toolbar>
    </template>

    <template #item.price="{ item }">
      {{ formatPrice(item.price) }}
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
    { title: 'No', key: 'id', align: 'end' },
    { title: '구분', key: 'category' },
    { title: '작업명', key: 'title' },
    { title: '난이도', key: 'level' },
    { title: '작업 시간', key: 'time' },
    { title: '작업 비용', key: 'price', align: 'end' },
  ]

   // 데이터 구조
  interface Task {
    id: number
    title: string,
    price: number,
    level: string,
    time: string
  }

  // 상태
  const items = ref<Task[]>([])
  const page = ref(Number(route.query.page) || 1)
  const perPage = 10

  // 데이터 로드
  onMounted(async () => {
    const data = await import('~/data/task/main.json')
    items.value = (data.default.task || []).slice().sort((a, b) => b.id - a.id)
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
    router.push(`/task/${row.item.id}`)
  }

  const { formatPrice } = useFormatPrice()
</script>