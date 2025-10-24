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
    :items="items.works"
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
      {{ formatPrice(item.price) }}
    </template>

    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination
          v-model="page"
          :length="pageCount"
        ></v-pagination>
      </div>
    </template>

  </v-data-table>
</template>

<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const page = 1
  const pageCount = 5

  const headers = [
    { title: '작업명', key: 'title' },
    { title: '난이도', key: 'difficulty' },
    { title: '작업시간', key: 'duration' },
    { title: '작업가격 (₩)', key: 'price', align: 'end' },
  ]

  const items = await import(`~/data/works/main.json`)

  const handleClickRow = (item, row) => {
    router.push(`/works/${row.item.id}`)
  }

  const formatPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
</script>