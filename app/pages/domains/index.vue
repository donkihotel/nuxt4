<template>
  <v-sheet border="md"
    class="pa-6 text-white mx-auto "
    color="#141518">
    <h4 class="text-h5 font-weight-bold mb-4">도메인 연결</h4>
    <h3>도메인에 홈페이지 및 메일을 연결 해드립니다.</h3>
    <p>
      · 아임웹, 윅스, 카페24 쇼핑몰, 구글사이트도구, 캔바 및 기타 홈페이지 연결
      <br>
      · 네이버웍스, 구글워크스페이스, 마이크로소프트365 및 기타 메일서비스 연결
    </p>
  </v-sheet>

  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        개요
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>도메인 구매를 하면, 도메인 관리를 구매한 곳에서 도메인 설정 관리를 해야 합니다. <br/>
          도메인은 공통된 관리 규칙(A, CNAME, MX, NS, TXT)을 통해서, 도메인 설정 관리를 해야 합니다. 하지만 도메인을 구매한 곳마다 관리 화면이 설정 차이가 있어서 설정하려고 해도 쉽지 않습니다.<br/>
          또한 도메인의 홈페이지 연결을 하기 위해서 네임 서버를 변경하여 다른 곳에서 도메인 설정 관리를 해야 하는 경우도 있는데, 이 또한 관리 화면 설정 차이로 인하여 쉽지 않습니다.</p>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        계약
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        내용
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        준비물
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>도메인 구매를 한 곳의 아이디와 비밀번호가 필요합니다. <br/>
          도메인 구매를 한 곳에서 도메인 설정 관리가 가능해야 합니다. <br/>
          도메인 연결을 원하는 홈페이지 및 메일 서비스 정보가 필요합니다.</p>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

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
          작업 사례
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
        <!-- <v-img :src="`${$config.public.baseURL}/dev/${formatDevIcon(item.email)}`" height="24" width="24" class="mr-2" /> -->
      <v-img :src="`assets/email/${formatEmailIcon(item.email)}`"  width="120" />
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
    { title: 'No', key: 'id' },
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