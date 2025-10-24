<template>
  <v-row class="bg-grey-lighten-3">
    <v-col cols="12">
      <v-carousel
        height="300"
        show-arrows="hover"
        cycle
        hide-delimiter-background
        class="rounded"
      >
        <v-carousel-item src="/assets/banner/banner01.png" cover></v-carousel-item>
        <v-carousel-item src="/assets/banner/banner02.jpg" cover></v-carousel-item>
        <v-carousel-item src="/assets/banner/banner03.png" cover></v-carousel-item>
      </v-carousel>
    </v-col>
    <v-col cols="6">
      <v-data-table
        :headers="headers1"
        :items="servers"
        hover
        class="text-no-wrap"
        @click:row="handleClickRow"
        hide-default-footer
        density="compact"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              서버 구축
            </v-toolbar-title>
            <v-btn variant="text" size="small" to="/servers">더 보기 ></v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item.frontend="{ item }">
          <v-chip variant="text" class="pl-0">
            <v-img :src="`assets/dev/${formatDevIcon(item.frontend)}`" height="24" width="24" class="mr-2" />
            <span>{{ item.frontend }}</span>
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
            <v-img :src="`assets/db/${formatDevIcon(item.database)}`" height="24" width="24" class="mr-2" />
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
          ></v-chip>
        </template>

        <!-- <template #item.hosting="{ item }">
          <v-img :src="`${$config.public.baseURL}/hosting/${getHostingIcon(item.hosting)}`" />
        </template> -->

        <template #item.server_cost="{ item }">
          {{ formatPrice(item.server_cost) }}
        </template>

        <template #item.build_cost="{ item }">
          {{ formatPrice(item.build_cost) }}
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="6">
      <v-data-table
        :headers="headers2"
        :items="domains"
        hover
        class="text-no-wrap"
        disable-sort
        hide-default-footer
        density="compact"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              도메인 연결
            </v-toolbar-title>
            <v-btn variant="text" size="small" to="/domains">더 보기 ></v-btn>
          </v-toolbar>
        </template>

        <template #item.email="{ item }">
          <v-img :src="`assets/email/${formatEmailIcon(item.email)}`"  width="120" />
        </template>

        <template #item.cost="{ item }">
          {{ formatPrice(item.cost) }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>

</template>

<script setup>
  const headers1 = [
    { title: 'No', value: 'id' },
    { title: '프로젝트', value: 'project' },
    { title: '개발 (Frontend)', value: 'frontend' },
    { title: '개발 (Backend)', value: 'backend' },
    { title: '개발 (DB)', value: 'database' },
    { title: '개발 복잡도', value: 'dev_complexity', align: 'center' },
    { title: '호스팅', value: 'hosting' },
    { title: '서버 확장', value: 'scale' },
    { title: '개발 배포', value: 'dev_deployment', align: 'center' },
    { title: '서버 요금 (₩)', value: 'server_cost', align: 'end' },
    { title: '구축 비용 (₩)', value: 'build_cost', align: 'end' }
  ]

  const items1 = await import(`~/data/server/main.json`)
  const servers = items1.default.servers
  .sort(() => 0.5 - Math.random())
  .slice(0, 5)

  const headers2 = [
    { title: 'No', value: 'id' },
    { title: '도메인', key: 'domain' },
    { title: '구매', key: 'purchaser' },
    { title: '네임서버', key: 'nameserver' },
    { title: '홈페이지', key: 'homepage' },
    { title: '인증서 (SSL)', key: 'ssl' },
    { title: '메일', key: 'email' },
    { title: '연결 비용 (₩)', key: 'cost', align: 'end' },
  ]

  const items2 = await import(`~/data/domain/main.json`)
  const domains = items2.default.domains
  .sort(() => 0.5 - Math.random())
  .slice(0, 5)

  const getScaleColor = (value) => {
    if (value === 'UP') return 'grey-lighten-2'
    else if (value === 'OUT') return 'black'
    else return 'grey'
  }

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
</script>

<script>

export default {
  data() {
    return {
      page: 1,
      pageCount: 5,
    };
  },
  methods: {
    handleClickRow(item, row) {
      // item contains the data of the clicked row
      // row contains other related data, including the native event
      // console.log('Row clicked:', row.item.link);
      this.$router.push(`/servers/${row.item.id}`); // Example: navigate using Vue Router
    },

    formatPrice (value) {
      if (value === null || value === undefined) {
          return '';
        }
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    formatDevIcon(value) {
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
    },

    getComplexityColor (value) {
      if (value === '상') return 'red'
      else if (value === '중') return 'orange'
      else return 'green'
    },

    getDeploymentColor (value) {
      if (value === '자동') return 'black'
      else return 'grey'
    },

    getHostingIcon(value) {
      if (value === 'aws') {
        return 'aws.png';
      } else if (value === 'gcp') {
        return 'gcp.png';
      } else if (value === 'azure') {
        return 'azure.png';
      } else if (value === 'cafe24') {
        return 'cafe24.png';
      } else if (value === 'godaddy') {
        return 'godaddy.png';
      } else if (value === 'bluehost') {
        return 'bluehost.png';
      } else {
        return 'hosting.png';
      }
    }
  },
};
</script>