<template>
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

    <!-- <template v-slot:headers>
      <tr class="bg-primary">
        <th v-for="header in headers" :key="header.value">
          {{ header.title }}
        </th>
      </tr>
    </template> -->

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

  const headers = [
    { title: '작업명', key: 'title' },
    { title: '난이도', key: 'difficulty' },
    { title: '작업시간', key: 'duration' },
    { title: '작업가격 (₩)', key: 'price', align: 'end' },
  ]

  const items = await import(`~/data/works/main.json`)

  const handleClickRow = (item, row) => {
    console.log('Row clicked:', row);
    router.push(`/works/${row.item.id}`)
  }

  const formatPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
</script>

<style scoped>
.v-data-table thead th {
  background-color: #1976d2;
  color: white;
}
</style>