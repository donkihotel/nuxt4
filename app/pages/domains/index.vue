<template>
  <v-data-table
    :headers="headers"
    :items="items.domains"
    hover
    class="text-no-wrap"
    disable-sort
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          도메인 연결
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

    <template #item.email="{ item }">
        <!-- <v-img :src="`/dev/${formatDevIcon(item.email)}`" height="24" width="24" class="mr-2" /> -->
      <v-img :src="`/email/${formatEmailIcon(item.email)}`"  width="120" />
    </template>

    <template #item.cost="{ item }">
      {{ formatPrice(item.cost) }}
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
  const headers = [
    { title: '도메인', key: 'domain' },
    { title: '구매', key: 'purchaser' },
    { title: '네임서버', key: 'nameserver' },
    { title: '홈페이지', key: 'homepage' },
    { title: '인증서 (SSL)', key: 'ssl' },
    { title: '메일', key: 'email' },
    { title: '연결 비용 (₩)', key: 'cost', align: 'end' },
  ]

  const items = await import(`~/data/domain/main.json`)

  const formatEmailIcon = (email) => {
    switch (email) {
      case 'google_workspace':
        return 'google_workspace.png'
      case 'naver_works':
        return 'naver_works.png'
      case 'microsoft_365':
        return 'microsoft_365.png'
      default:
        return 'default_email.png'
    }
  }

  const formatPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
</script>

<script>
export default {
  data() {
    return {
      page: 1,
      pageCount: 5,
    };
  },
};
</script>


<style scoped>
.v-data-table thead th {
  background-color: #1976d2;
  color: white;
}
</style>