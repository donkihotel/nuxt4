<template>
  <v-sheet border="md"
    class="pa-6 text-white mx-auto "
    color="#141518">
    <h4 class="text-h5 font-weight-bold mb-4">도메인 연결</h4>
    <p>
      도메인 구매 부터 홈페이지 연결 SSL 보안 연결 그리고 메일 서비스를 연결해 드립니다.<br/>
      이와 같은 작업하기 위해서는 도메인에 대한 이해가 필요합니다.<br/><br/>

      <b>원격 작업</b><br/>
      원격화면공유를 통해서 실시간으로 작업을 해드립니다. <br/>
      중요한 정보인 도메인, 홈페이지, 메일 관리를 위한 로그인 계정을 공유할 필요가 없습니다.
    </p>
  </v-sheet>

  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        1. 도메인 설정 어려움
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          도메인 구매의 목적은 홈페이지나 메일을 연결해서 사용하기 위해서입니다.<br/>
          도메인 구매를 하면, 도메인 관리를 구매한 곳에서 도메인 설정 관리를 해야 합니다.<br/>
          도메인은 공통된 관리 규칙(A, CNAME, MX, NS, TXT)을 통해서, 도메인 설정 관리를 해야 합니다. <br/>
          하지만 도메인을 구매한 곳마다 관리 화면이 설정 차이가 있어서 설정하려고 해도 쉽지 않습니다.<br/>
          또한 도메인의 홈페이지 연결을 하기 위해서 네임 서버를 변경하여 다른 곳에서 도메인 설정 관리를 해야 하는 경우도 있는데, 이 또한 관리 화면 설정 차이로 인하여 쉽지 않습니다.
        </p>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        2. 메일 설정 어려움
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          메일 서비스에 가입하면, 도메인을 어떻게 연결해야 하는지 가이드를 제공합니다. 하지만 도메인 설정을 처음 하게 되면 가이드가 있어도 따라 하기가 쉽지 않은 점이 있습니다.<br/><br/>

          그 이유는 가이드에서 제공하는 정보를 보면 도메인에 다음과 같이 설정을 해주세요. 되어있지만, 도메인 구매한 곳마다 설정 관리 화면 차이로 인하여, 접근하기 쉽지 않은 부분이 있습니다.<br/><br/>

          또한 메일 설정은 가이드에서 제공하는 기본 설정 외에 추가로 등록해야 하는 도메인 설정(DKIM, DMARC, SPF)들이 있습니다. 이 정보는 메일의 신뢰도를 높여주는 정보입니다. 신뢰도는 메일의 발신과 수신에 영향이 있고, 메일의 발신될 때 상대방이 잘 받을 수 있도록 합니다.
        </p>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        3. SSL 인증서 설정 어려움
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        도메인에 연결할 홈페이지나 메일 설정의 어려움을 해결을 해드립니다. 작업은 원격화면공유를 통해서 실시간으로 작업을 해드립니다. 중요한 정보인 도메인, 홈페이지, 메일 관리를 위한 로그인 계정을 공유할 필요가 없습니다.
      </v-expansion-panel-text>
    </v-expansion-panel>

  </v-expansion-panels>

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
          작업 사례
        </v-toolbar-title>
      </v-toolbar>
    </template>

    <template #item.ssl_cost="{ item }">
      ₩ {{ formatPrice(item.ssl_cost) }}
    </template>

    <template #item.email="{ item }">
      <v-img :src="`assets/email/${formatEmailIcon(item.email)}`"  width="120" />
    </template>

    <template #item.pricing_plan="{ item }">
      {{ item.pricing_plan }}
    </template>

    <template #item.cost="{ item }">
      <span class="text-caption">₩</span> {{ formatPrice(item.cost) }}
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
    { title: 'No', value: 'id' },
    { title: '도메인', key: 'domain' },
    { title: '구매', key: 'purchaser' },
    { title: '네임서버', key: 'nameserver' },
    { title: '홈페이지', key: 'homepage' },
    { title: 'SSL 인증서', key: 'ssl' },
    { title: '인증서 가격', key: 'ssl_cost', align: 'end' },
    { title: '메일 서비스', key: 'email' },
    { title: '메일 요금제', key: 'pricing_plan', align: 'end'  },
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
    router.push(`/domains/${row.item.id}`)
  }

  const formatEmailIcon = (value: string) => {
    switch (value) {
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

  const formatPrice = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
</script>

<style scoped>
.v-data-table thead th {
  background-color: #1976d2;
  color: white;
}
</style>