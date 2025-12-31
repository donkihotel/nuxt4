<template>
  <v-row class="bg-grey-lighten-3">
    <v-col cols="7">
      <v-data-table :headers="headers0" :items="task" hover class="text-no-wrap" @click:row="onClickTaskRow"
        hide-default-footer density="compact">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              작업 비용
            </v-toolbar-title>
            <v-btn variant="text" size="small" to="/task">더 보기 ></v-btn>
          </v-toolbar>
        </template>

        <template #item.count="{ item }">
          {{ item.count }} 단계 <span class="text-caption">({{ item.time }})</span>
        </template>

      </v-data-table>
    </v-col>
    <v-col cols="5">
      <v-toolbar flat>
        <v-toolbar-title>

        </v-toolbar-title>
      </v-toolbar>
      <v-carousel height="328" show-arrows="hover" cycle hide-delimiter-background class="rounded"
        v-model="currentIndex" hide-delimiters>
        <v-carousel-item v-for="(item, i) in banners" :key="i" :src="item.src" @click="open(item.url, '_blank')" cover>
        </v-carousel-item>

        <v-overlay :scrim="false"
          content-class="w-100 h-100 d-flex flex-column align-center justify-space-between pointer-pass-through py-3"
          contained model-value no-click-animation persistent>
          <div class="position-absolute" style="bottom: 12px; right: 12px;">
            <v-chip :text="`${currentIndex + 1} / ${banners.length}`" color="#eee" size="small" variant="flat" />
          </div>
        </v-overlay>
      </v-carousel>
    </v-col>
    <v-col cols="12">
      <v-data-table :headers="headers1" :items="server" hover class="text-no-wrap" @click:row="onClickServerRow"
        hide-default-footer>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              서버 구축
            </v-toolbar-title>
            <v-btn variant="text" size="small" to="/server">더 보기 ></v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item.frontend="{ item }">
          <v-chip variant="text" class="pl-0">
            <v-img :src="`assets/dev/${formatDevIcon(item.frontend)}`" height="24" width="24" class="mr-2"
              v-if="item.frontend" />
            <span>{{ item?.frontend ?? '-' }}</span>
          </v-chip>
        </template>

        <template v-slot:item.backend="{ item }">
          <v-chip variant="text" class="pl-0">
            <v-img :src="`assets/dev/${formatDevIcon(item.backend)}`" height="24" width="24" class="mr-2" />
            <span>{{ item.backend }}</span>
          </v-chip>
        </template>

        <template v-slot:item.database="{ item }">
          <v-chip variant="text" class="pl-0">
            <v-img v-if="item.database" :src="`assets/db/${formatDevIcon(item.database)}`" height="24" width="24"
              class="mr-2" />
            <span>{{ item.database }}</span>
          </v-chip>
        </template>

        <template #item.build_day="{ item }">
          {{ item.build_day }} 일
        </template>

        <template #item.performance="{ item }">
          <v-chip :color="formatScaleColor(item.performance)" :text="item.performance" size="small"
            class="w-100 justify-center" variant="flat" label></v-chip>
        </template>

        <template #item.app_deploy="{ item }">
          <v-chip :color="formatDeployColor(item.app_deploy)" :text="item.app_deploy" size="small"
            variant="flat"></v-chip>
        </template>

        <template #item.security="{ item }">
          <v-chip :text="`Level ${item.security}`" :color="formatSecurityColor(item.security)" size="small"
            variant="flat" label></v-chip>
        </template>

        <template #item.budget="{ item }">
          {{ formatPrice(item.budget) }}
        </template>

        <template #item.build_cost="{ item }">
          {{ formatPrice(item.build_cost) }}
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="12">
      <v-data-table :headers="headers2" :items="domains" hover class="text-no-wrap" disable-sort hide-default-footer
        @click:row="onClickDomainRow">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              도메인 연결
            </v-toolbar-title>
            <v-btn variant="text" size="small" to="/domain">더 보기 ></v-btn>
          </v-toolbar>
        </template>

        <template #item.ssl_cost="{ item }">
          {{ formatPrice(item.ssl_cost) }}
        </template>

        <!-- <template #item.email="{ item }">
          <v-img :src="`assets/email/${formatMailIcon(item.email)}`" width="120" />
        </template> -->

        <template #item.email="{ item }">
          <v-img v-if="!itemEmailError[item.id]" :src="`assets/email/${formatMailIcon(item.email)}`" width="120"
            @error="itemEmailError[item.id] = true" />

          <span v-else>{{ item.email }}</span>
        </template>

        <template #item.cost="{ item }">
          {{ formatPrice(item.cost) }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import type { DataTableHeader } from 'vuetify'

const route = useRoute()
const router = useRouter()

const currentIndex = shallowRef(0)
const items0 = await import(`~/data/task/main.json`)
const task = items0.default.task
  .sort((a, b) => b.id - a.id)
  .slice(0, 8)

const headers0: DataTableHeader[] = [
  { title: 'No', value: 'id' },
  { title: '설계 구분', value: 'design' },
  { title: '작업 이름', value: 'title' },
  { title: '작업 과정', value: 'count' },
  // { title: '작업 시간', value: 'time' },
  { title: '작업 비용', value: 'price', align: 'end' }
]

const headers1: DataTableHeader[] = [
  { title: 'No', value: 'id', align: 'end' },
  { title: '프론트엔드', value: 'frontend' },
  { title: '백엔드', value: 'backend' },
  { title: '데이터베이스', value: 'database' },
  { title: '서버', value: 'instance' },
  { title: '서버 예산', value: 'budget', align: 'end' },
  { title: '서버 확장', value: 'performance', align: 'center' },
  { title: '서버 배포', value: 'app_deploy', align: 'center' },
  { title: '서버 보안', value: 'security', align: 'center' },
  { title: '구축 일정', value: 'build_day', align: 'end' },
  { title: '구축 비용', value: 'build_cost', align: 'end' }
]

const items1 = await import(`~/data/server/main.json`)
const server = items1.default.items
  .sort((a, b) => b.id - a.id)   // id 기준 내림차순
  .slice(0, 5)

const banners = [
  { src: 'assets/banner/banner1.jpg', url: 'https://kmong.com/gig/220715' },
  { src: 'assets/banner/banner2.jpg', url: 'https://kmong.com/gig/424545' },
  { src: 'assets/banner/banner3.jpg', url: 'https://kmong.com/gig/586574' },
  { src: 'assets/banner/banner4.jpg', url: 'https://kmong.com/gig/316594' },
  { src: 'assets/banner/banner5.jpg', url: 'https://kmong.com/gig/425162' },
  { src: 'assets/banner/banner6.jpg', url: 'https://kmong.com/gig/554951' },
  { src: 'assets/banner/banner7.jpg', url: 'https://kmong.com/gig/616478' },
]

const headers2: DataTableHeader[] = [
  { title: 'No', value: 'id', align: 'end' },
  { title: '도메인', key: 'domain' },
  { title: '구매', key: 'purchaser' },
  { title: '네임서버', key: 'nameserver' },
  { title: '홈페이지', key: 'homepage' },
  { title: 'SSL 인증서', key: 'ssl' },
  { title: '인증서 가격', key: 'ssl_cost', align: 'end' },
  { title: '메일 서비스', key: 'email' },
  { title: '메일 요금제', key: 'pricing_plan' },
  { title: '연결 비용', key: 'cost', align: 'end' },
]

const items2 = await import(`~/data/domain/main.json`)
const domains = items2.default.domains
  .sort((a, b) => b.id - a.id)   // id 기준 내림차순
  .slice(0, 5)

const { formatDevIcon } = useFormatDevIcon()
const { formatScaleColor } = useFormatScaleColor()
const { formatDeployColor } = useFormatDeployColor()
const { formatSecurityColor } = useFormatSecurityColor()
const { formatPrice } = useFormatPrice()
const { formatMailIcon } = useFormatMailIcon()

const open = (url: string, type: string) => {
  window.open(url, type)
}

const handleClickRow = (basePath: string) => {
  return (_item: any, row: any) => {
    router.push(`/${basePath}/${row.item.id}`)
  }
}

const onClickTaskRow = handleClickRow('task')
const onClickServerRow = handleClickRow('server')
const onClickDomainRow = handleClickRow('domain')

const itemEmailError = reactive<{ [key: string]: boolean }>({})
</script>