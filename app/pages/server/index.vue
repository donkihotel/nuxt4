<template>
  <v-sheet border="md" class="pa-6 text-white mx-auto " color="#141518">
    <h4 class="text-h5 font-weight-bold mb-4">서버 구축</h4>
    <p>
      개발한 홈페이지, 애플리케이션을 AWS 설계·구축하여 배포를 해드립니다.<br />
      잘 구축하기 위해서 5가지 사항을 검토 합니다.
    </p>
  </v-sheet>

  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon class="mr-2">mdi-numeric-1-box</v-icon>개발 분석
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        · 개발 애플리케이션의 프론트, 벡엔드, 데이타베이스의 환경을 분석 합니다.<br />
        · 어플리케이션의 필요한 컴퓨팅 자원 분석하여 최적화된 서버를 설계를 합니다.<br />
        · 필요에 따라 CI/CD 환경을 구성합니다.
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon class="mr-2">mdi-numeric-2-box</v-icon>요구사항 분석
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <b>서버에 대한 요구사항을 분석합니다</b><br />
        · 희망 서버 요금을 확인합니다.<br />
        · 운영 환경 개발, 테스트, 프로덕션을 선택합니다.<br />
        · 애플리케이션 배포를 수동 파일 복사 또는 자동 배포(CI/CD)로 할지 확인합니다.<br />
        · 서버 보안 SSL, 방화벽을 포함하여 어느 정도의 수준으로 할지 확인합니다.<br />
        · 로드밸런서 또는 CDN 사용하여 부하분산된 서버를 구축할지 확인합니다.<br />
        · 소프트웨어를 서버에 설치할 부분이 있는지 확인합니다.
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon class="mr-2">mdi-numeric-3-box</v-icon>아키텍처 설계
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        · 요구사항을 바탕으로 아키텍처 기본 설계를 합니다.<br />
        · 애플리케이션을 어떤 방법으로 배포할지 설계 합니다.<br />
        · SSL, 방화벽 등 보안 설계를 합니다.<br />
        · 부하분산을 위한 로드밸런서 또는 CDN 설계를 합니다.<br />
        · 설치해야될 소프트웨어를 설계 합니다.
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon class="mr-2">mdi-numeric-4-box</v-icon>일정
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        · 애플리케이션의 환경과 요구사항 및 아키텍처를 기반으로 구축 일정을 수립 합니다.<br />
        · 프로젝트의 크기에 따라 차이가 있지만, 일반적으로 서버 구축은 3~7일 정도 소요됩니다.
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon class="mr-2">mdi-numeric-5-box</v-icon>견적서
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        · 견적서를 만들어 드립니다. 아키텍처 설계를 바탕으로 구축 비용을 산출 합니다.
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <v-data-table :headers="headers" :items="items" :items-per-page="10" v-model:page="page" hover class="text-no-wrap"
    @click:row="handleClickRow" disable-sort>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          서버 구축
        </v-toolbar-title>
      </v-toolbar>
    </template>

    <template v-slot:item.frontend="{ item }">
      <v-chip variant="text" class="pl-0">
        <v-img v-if="item.frontend" :src="`assets/dev/${formatDevIcon(item.frontend)}`" height="24" width="24"
          class="mr-2" />
        <span>{{ item.frontend || '-' }}</span>
      </v-chip>
    </template>

    <template v-slot:item.backend="{ item }">
      <v-chip variant="text" class="pl-0">
        <v-img v-if="item.backend" :src="`assets/dev/${formatDevIcon(item.backend)}`" height="24" width="24"
          class="mr-2" />
        <span>{{ item.backend || '-' }}</span>
      </v-chip>
    </template>

    <template v-slot:item.database="{ item }">
      <v-chip variant="text" class="pl-0">
        <v-img v-if="item.database" :src="`assets/db/${formatDevIcon(item.database)}`" height="24" width="24"
          class="mr-2" />
        <span>{{ item.database || '-' }}</span>
      </v-chip>
    </template>

    <template #item.security="{ item }">
      <v-chip :text="`Level ${item.security}`" :color="formatSecurityColor(item.security)" size="small" variant="flat"
        label></v-chip>
    </template>

    <template #item.build_day="{ item }">
      {{ item.build_day }} 일
    </template>

    <template #item.performance="{ item }">
      <v-chip :color="formatScaleColor(item.performance)" :text="item.performance" size="small"
        class="w-100 justify-center" variant="flat" label></v-chip>
    </template>

    <template #item.app_deploy="{ item }">
      <v-chip :color="formatDeployColor(item.app_deploy)" :text="item.app_deploy" size="small" variant="flat"></v-chip>
    </template>

    <template #item.budget="{ item }">
      {{ formatPrice(item.budget) }}
    </template>

    <template #item.build_cost="{ item }">
      {{ formatPrice(item.build_cost) }}
    </template>

    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount" @update:model-value="handlePage"></v-pagination>
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
  frontend: string | null
  backend: string | null
  database: string | null
  instance: string
  performance: string
  app_deploy: string
  security: number
  budget: number
  build_day: number
  build_cost: number
}

const route = useRoute()
const router = useRouter()

const headers: DataTableHeader[] = [
  { title: 'No', key: 'id', align: 'end' },
  { title: '개발 프론트', key: 'frontend' },
  { title: '개발 백엔드', key: 'backend' },
  { title: '데이터베이스', key: 'database' },
  { title: '서버 인스턴스', key: 'instance' },
  { title: '서버 확장', key: 'performance', align: 'center' },
  { title: '애플리케이션 배포', key: 'app_deploy', align: 'center' },
  { title: '서버 보안', key: 'security', align: 'center' },
  { title: '구축 기간', key: 'build_day', align: 'end' },
  { title: '구축 비용', key: 'build_cost', align: 'end' },
]

// 상태
const items = ref<Server[]>([])
const page = ref(Number(route.query.page) || 1)
const perPage = 10

// 데이터 로드
onMounted(async () => {
  const data = await import('~/data/server/main.json')
  items.value = (data.default.items || []).slice().sort((a, b) => b.id - a.id)
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

const { formatDevIcon } = useFormatDevIcon()
const { formatScaleColor } = useFormatScaleColor()
const { formatDeployColor } = useFormatDeployColor()
const { formatSecurityColor } = useFormatSecurityColor()
const { formatPrice } = useFormatPrice()

const handleClickRow = (item: any, row: any) => {
  router.push(`/server/${row.item.id}`)
}
</script>