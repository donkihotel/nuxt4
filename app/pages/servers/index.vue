<template>
  <v-sheet border="md"
    class="pa-6 text-white mx-auto "
    color="#141518">
    <h4 class="text-h5 font-weight-bold mb-4">서버 구축</h4>
    <p>
      <h3>서버를 구축하고 소스를 배포하여, 서비스가 운영되도록 합니다.</h3>
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
    :items="servers"
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

   <template v-slot:item.frontend="{ item }">
      <v-chip variant="text" class="pl-0">
        <v-img :src="`${$config.public.baseURL}/dev/${formatDevIcon(item.frontend)}`" height="24" width="24" class="mr-2" />
        <span>{{ item.frontend }}</span>
      </v-chip>
    </template>

    <template v-slot:item.backend="{ item }">
      <v-chip variant="text" class="pl-0">
        <v-img :src="`${$config.public.baseURL}/dev/${formatDevIcon(item.backend)}`" height="24" width="24" class="mr-2" />
        <span>{{ item.backend }}</span>
      </v-chip>
    </template>

    <template v-slot:item.database="{ item }">
      <v-chip variant="text" class="pl-0">
        <v-img :src="`${$config.public.baseURL}/db/${formatDevIcon(item.database)}`" height="24" width="24" class="mr-2" />
        <span>{{ item.database }}</span>
      </v-chip>
    </template>

    <template #item.dev_complexity="{ item }">
      <v-chip
        :text="`Level ${item.dev_complexity}`"
        size="small"
        label
      ></v-chip>
    </template>

    <template #item.scale="{ item }">
      <v-chip
        :border="`${getScaleColor(item.scale)}`"
        :color="getScaleColor(item.scale)"
        :text="item.scale"
        size="small"
        class="w-100"
        variant="flat"
        label
      ></v-chip>
    </template>

    <template #item.dev_deployment="{ item }">
      <v-chip
        :border="`${getDeploymentColor(item.dev_deployment)}`"
        :color="getDeploymentColor(item.dev_deployment)"
        :text="item.dev_deployment"
        size="small"
        variant="flat"
        label
      ></v-chip>
    </template>

    <template #item.hosting="{ item }">
      <v-img :src="`${$config.public.baseURL}/hosting/${getHostingIcon(item.hosting)}`" />
    </template>

    <template #item.server_cost="{ item }">
      <span class="text-caption">(월)</span> {{ formatPrice(item.server_cost) }}
    </template>

    <template #item.build_cost="{ item }">
      {{ formatPrice(item.build_cost) }}
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

  interface Server {
    id: number
    project: string
    domain: string
    frontend: string
    backend: string
    database: string
    hosting: string
    server_type: string
    server_count: number
    server_cost: number
    dev_complexity: number
    scale: string
    dev_deployment: string
    build_cost: number
  }

  const route = useRoute()
  const router = useRouter()

  const headers: DataTableHeader[] = [
    { title: 'No', key: 'id' },
    { title: '프로젝트', key: 'project' },
    { title: '개발 (Frontend)', key: 'frontend' },
    { title: '개발 (Backend)', key: 'backend' },
    { title: '개발 (DB)', key: 'database' },
    { title: '개발 복잡도', key: 'dev_complexity', align: 'center' },
    { title: '호스팅', key: 'hosting' },
    { title: '서버 확장', key: 'scale' },
    { title: '개발 배포', key: 'dev_deployment', align: 'center' },
    { title: '서버 요금 (₩)', key: 'server_cost', align: 'end' },
    { title: '구축 비용 (₩)', key: 'build_cost', align: 'end' },
  ]

  // 상태
  const servers = ref<Server[]>([])
  const page = ref(Number(route.query.page) || 1)
  const perPage = 10

  // 데이터 로드
  onMounted(async () => {
    const data = await import('~/data/server/main.json')
    servers.value = (data.default.servers || []).slice().reverse()
  })

  // 전체 페이지 수
  const pageCount = computed(() => Math.ceil(servers.value.length / perPage) || 1)

  // 현재 페이지 데이터 계산
  const paginatedItems = computed(() => {
    const start = (page.value - 1) * perPage
    return servers.value.slice(start, start + perPage)
  })

  // 페이지 변경 시 호출 (선택적)
  function handlePage(value: number) {
    page.value = value
    router.replace({ path: route.path, query: { ...route.query, page: value } })
  }

  const formatDevIcon = (value: string) => {
    if (value === 'React') {
      return 'react.png';
    } else if (value === 'Next') {
      return 'next.png';
    } else if (value === 'Vue') {
      return 'vue.png';
    } else if (value === 'Nuxt') {
      return 'nuxt.png';
    } else if (value === 'Node' || value === 'Express') {
      return 'node.png';
    } else if (value === 'Nest') {
      return 'nest.png';
    } else if (value === 'Springboot') {
      return 'springboot.png';
    } else if (value === 'Django') {
      return 'django.png';
    } else if (value === 'Flask') {
      return 'flask.png';
    } else if (value === 'Django') {
      return 'django.png';
    } else if (value === 'MySQL') {
      return 'mysql.png';
    } else if (value === 'MongoDB') {
      return 'mongodb.png';
    } else if (value === 'MariaDB') {
      return 'mariadb.png';
    } else {
      return 'mdi-check-circle-outline';
    }
  }

  const handleClickRow = (item: any, row: any) => {
    router.push(`/servers/${row.item.id}`)
  }

  const getHostingIcon = (value: string) => {
    if (value === 'AWS') return 'aws.png'
    else if (value === 'CAFE24') return 'cafe24.png'
    else return 'mdi-cloud-outline'
  }

  const getScaleColor = (value: string) => {
    if (value === 'UP') return 'grey-lighten-2'
    else if (value === 'OUT') return 'black'
    else return 'grey'
  }

  const formatPrice = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const getDeploymentColor = (value: string) => {
    if (value === '자동') return 'black'
    else return 'grey-lighten-2'
  }
</script>