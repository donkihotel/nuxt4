<template>
  <v-sheet border="md"
    class="pa-6 text-white mx-auto "
    color="#141518">
    <h4 class="text-h5 font-weight-bold mb-4">서버 구축</h4>
    <p>
      개발한 홈페이지, 애플리케이션을 AWS 설계·구축하여 배포를 해드립니다.<br/>
      잘 구축하기 위해서 6가지 사항을 검토 합니다.
    </p>
  </v-sheet>

  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon class="mr-2">mdi-numeric-1-box</v-icon>
        서버 선택
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        국내에서 많이 사용하는 클라우드 서버는 AWS, Azure, GCP, NCloud 등의 있습니다. 그중에서 AWS 가장 많이 사용하는 이유는 인지도 면에서 사용한다고 볼 수 있습니다. 또는 AWS 컴퓨팅 서비스 외에 네트워크, 데이터베이스, 스토리지, 개발자도구, 보안/자격 증명, 애플리케이션 등을 연결하여 사용하기 위해서입니다.<br/><br/>
        AWS 사용하는 이유를 통해서 목적에 맞는 서버를 설계합니다.
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon class="mr-2">mdi-numeric-2-box</v-icon>
        개발 환경
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        개발 프론트엔드, 벡엔드, 데이타베이스를 분석 합니다.<br/>
        어플리케이션의 기능과 컴퓨팅 자원 사용률을 분석하여 최적화된 서버를 설계를 합니다. 그리고 지속적인 통합을 위해서 CI/CD 환경을 구성합니다.
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon class="mr-2">mdi-numeric-3-box</v-icon>
        서버 예산
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <b>비용 예측 가능성 확보</b><br/>
        AWS는 사용량 기반 과금이라, 예산을 정하지 않으면 월말에 예상보다 높은 비용이 청구될 수 있습니다. 미리 예산을 정하면 매달 예상 비용 범위 안에서 운영할 수 있어, 재무 계획 수립에 유리합니다.<br/><br/>

        <b>리소스 과다 사용 방지</b><br/>
        필요 이상으로 고사양 인스턴스나 과도한 스토리지를 할당하면 낭비가 발생합니다. 예산을 기준으로 인스턴스 크기, 스토리지 용량, 트래픽 대역폭 등을 합리적으로 선택할 수 있습니다.<br/><br/>

        <b>서비스 안정성 & 지속 가능성</b><br/>
        예산을 초과하면 갑작스러운 비용 부담으로 인해 서비스를 줄이거나 중단해야 할 위험이 생깁니다. 예산 내에서 장기적으로 유지 가능한 아키텍처를 설계하면, 안정적으로 서비스 운영이 가능합니다.
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon class="mr-2">mdi-numeric-4-box</v-icon>
        확장 설계
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        기본적으로 프로젝트 소스와 서버 예산을 분석하여 최소한의 서버를 운영하는데 구축을 해드릴 수 있습니다. 하지만, 동시 사용자가 있는 서버면 확장된 설계를 생각해야 합니다. 확장은 성능, 보안, 배포, 백업, 운영을 포함합니다. 어떻게 하면 최소한의 비용으로 서버를 구성해서 사용할 수 있을지 다음과 같은 구성을 생각하여 설계를 해드립니다.<br/><br/>

        <b>서버 성능</b><br/>
        서버 몇대를 사용할지 정해서 서버의 사양을 높여가는 스케일 업 방식으로 구축을 하거나 서버를 가변적으로 구성하여 스케일 아웃하여 부하분산을 할 수 있도록 해드립니다.<br/><br/>

        <b>보안 관리</b><br/>
        서버를 프라이빗 하게 네트워크를 구성하고, 방화벽을 통해서 외부로부터 침입, 침해를 방지하도록 해드립니다.<br/><br/>

        <b>배포 관리</b><br/>
        개발된 프로그램 배포를 할때 수동으로 소스를 복사를 하는 방식 또는 자동으로 소스가 깃 리파지토리에 푸시되었을때 서버에 배포 되도록 해드립니다.<br/><br/>

        <b>백업 관리</b><br/>
        사용자 파일, 프로그램 소스, 데이터베이스를 포함하여 별도의 디스크에 자동으로 부분 백업을 해드립니다.<br/><br/>

        <b>운영 관리</b><br/>
        CPU, 디스크, 메모리, 어플리케이션 상태를 모니터링 되도록 하여, 사용자에게 알림을 받도록 하여 장애에 대비 할 수 있도록 해드립니다.
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon class="mr-2">mdi-numeric-5-box</v-icon>
        견적서
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          견적서는 비용만 보여주는 문서가 아니라, 고객님의 서버 환경을 어떻게 설계할지에 대한 설계도이자, 비용 투명성을 보장하고 향후 불필요한 문제를 예방하는 중요한 자료 입니다. 견적서의 내용은 개요, 아키텍처, 작업일정, 준비물, 작업결과물, 작업비용으로 구성되어 있습니다.<br/><br/>

          <b>비용 투명성 확보</b><br/>
          서버 구축에는 여러 구성 요소(인스턴스, 스토리지, 네트워크, 보안 등)가 포함됩니다. 견적서를 통해 예상되는 비용을 명확히 안내드려야, 고객님도 불필요한 비용이 발생하지 않고 안심하실 수 있습니다.<br/><br/>

          <b>구성 요소 명확화</b><br/>
          견적서는 단순히 금액만이 아니라, 어떤 서비스가 어떻게 구성되는지에 대한 설계도 역할을 합니다. 이를 통해 고객님이 투자하시는 비용이 어디에 사용되는지 한눈에 확인할 수 있습니다.<br/><br/>

          <b>향후 분쟁 예방</b><br/>
          사전에 합의된 내용이 문서로 남기 때문에, 구축 이후에 추가 비용이나 변경 사항이 발생했을 때 근거 자료로 활용할 수 있어 불필요한 오해를 막을 수 있습니다.<br/><br/>

          <b>비교와 선택 가능</b><br/>
          견적서를 보시면, 필요에 따라 사양을 올리거나 줄여서 최적의 비용-성능 비율을 선택할 수 있습니다. 즉, 고객님이 의사결정을 하는 데 도움을 드리는 도구입니다.<br/><br/>

          <b>신뢰성 있는 파트너 이미지</b><br/>
          견적서를 드리는 이유는 단순히 계약을 위한 절차가 아니라, 저희가 고객님의 상황을 충분히 고려해 맞춤 설계를 했다는 증거이기도 합니다.
        </p>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-icon class="mr-2">mdi-numeric-6-box</v-icon>
        문서화
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        서버 관리 문서는 단순한 보고서가 아니라, 고객님의 시스템을 투명하게 관리하고, 향후 장애 대응·운영·확장 시 꼭 필요한 자산입니다. 즉, 구축 결과를 문서로 만들어 드림으로써 고객님이 안심하고 장기적으로 운영할 수 있도록 하는 보증서 같은 역할을 합니다. 문서로 견적서를 포함하여, 완료 보고서, 전체 아키텍처, VPC 설계, 사용자 계정, 서버 관리를 문서화 해드리고 다음과 같은 장점이 있습니다.<br/><br/>

        <b>현황 파악 및 자산 관리</b><br/>
        AWS에 어떤 서버, 네트워크, 보안 구성이 되어 있는지 문서로 정리되어 있어야 고객님이 현재 자산 현황을 명확히 알 수 있습니다. 문서가 없으면 시간이 지나면 어떤 서비스가 어디에 쓰이고 있는지 알기 어려워집니다.<br/><br/>

        <b>유지보수 및 장애 대응</b><br/>
        향후 서버에 문제가 발생했을 때, 관리 문서가 기준점이 되어 빠르게 원인을 파악하고 대응할 수 있습니다. 즉, 장애 복구 속도를 단축하고 안정적인 운영을 보장합니다.<br/><br/>

        <b>인수인계 및 내부 공유</b><br/>
        고객사 내부에서 담당자가 바뀌거나 외부 업체에 맡기게 되더라도, 관리 문서가 있으면 새 담당자가 빠르게 시스템을 이해하고 업무를 이어갈 수 있습니다.<br/><br/>

        <b>보안 및 규정 준수</b><br/>
        아키텍처와 사용 서비스 내역이 문서로 남아 있어야 보안 점검이나 규정 준수(컴플라이언스) 시 근거 자료로 활용할 수 있습니다.<br/><br/>

        <b>확장 및 비용 최적화</b><br/>
        향후 서버 확장이나 구조 변경을 할 때, 기존 아키텍처와 서비스 사용 현황을 참고해야 불필요한 중복 비용이나 잘못된 설계를 피할 수 있습니다.<br/><br/>

        <b>고객의 자산화</b><br/>
        문서는 저희 작업의 산출물이자, 고객님 회사의 IT 자산으로 남습니다. 단순 구축이 아니라 고객님의 장기적인 운영을 위해 꼭 필요한 자료입니다.
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <v-data-table
    :headers="headers"
    :items="server_list"
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

   <template v-slot:item.dev_frontend="{ item }">
      <v-chip variant="text" class="pl-0">
        <v-img :src="`assets/dev/${formatDevIcon(item.dev_frontend)}`" height="24" width="24" class="mr-2" />
        <span>{{ item.dev_frontend }}</span>
      </v-chip>
    </template>

    <template v-slot:item.dev_backend="{ item }">
      <v-chip variant="text" class="pl-0">
        <v-img :src="`assets/dev/${formatDevIcon(item.dev_backend)}`" height="24" width="24" class="mr-2" />
        <span>{{ item.dev_backend }}</span>
      </v-chip>
    </template>

    <template v-slot:item.dev_database="{ item }">
      <v-chip variant="text" class="pl-0">
        <v-img :src="`assets/db/${formatDevIcon(item.dev_database)}`" height="24" width="24" class="mr-2" />
        <span>{{ item.dev_database }}</span>
      </v-chip>
    </template>

    <template #item.server_security="{ item }">
      <v-chip
        :text="`Level ${item.server_security}`"
        :color="formatSecurityColor(item.server_security)"
        size="small"
        variant="flat"
        label
      ></v-chip>
    </template>

    <template #item.build_day="{ item }">
      {{ item.build_day }} 일
    </template>

    <template #item.server_scale="{ item }">
      <v-chip
        :color="formatScaleColor(item.server_scale)"
        :text="item.server_scale"
        size="small"
        class="w-100 justify-center"
        variant="flat"
        label
      ></v-chip>
    </template>

    <template #item.server_deployment="{ item }">
      <v-chip
        :color="formatDeployColor(item.server_deployment)"
        :text="item.server_deployment"
        size="small"
        variant="flat"
      ></v-chip>
    </template>

    <template #item.server_budget="{ item }">
      {{ formatPrice(item.server_budget) }}
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
    dev_frontend: string
    dev_backend: string
    dev_database: string
    server_hosting: string
    server_scale: string
    server_deployment: string
    server_security: number
    server_budget: number
    build_day: number
    build_cost: number
  }

  const route = useRoute()
  const router = useRouter()

  const headers: DataTableHeader[] = [
    { title: 'No', key: 'id', align: 'end' },
    { title: '프론트엔드', key: 'dev_frontend' },
    { title: '백엔드', key: 'dev_backend' },
    { title: '데이터베이스', key: 'dev_database' },
    { title: '서버 호스팅', key: 'server_hosting' },
    { title: '서버 예산', key: 'server_budget', align: 'end' },
    { title: '서버 확장', key: 'server_scale', align: 'center' },
    { title: '서버 배포', key: 'server_deployment', align: 'center' },
    { title: '서버 보안', key: 'server_security', align: 'center' },
    { title: '구축 일정', key: 'build_day', align: 'end' },
    { title: '구축 비용', key: 'build_cost', align: 'end' },
  ]

  // 상태
  const server_list = ref<Server[]>([])
  const page = ref(Number(route.query.page) || 1)
  const perPage = 10

  // 데이터 로드
  onMounted(async () => {
    const data = await import('~/data/server/main.json')
    server_list.value = (data.default.items || []).slice().sort((a, b) => b.id - a.id)
  })

  // 전체 페이지 수
  const pageCount = computed(() => Math.ceil(server_list.value.length / perPage) || 1)

  // 현재 페이지 데이터 계산
  const paginatedItems = computed(() => {
    const start = (page.value - 1) * perPage
    return server_list.value.slice(start, start + perPage)
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