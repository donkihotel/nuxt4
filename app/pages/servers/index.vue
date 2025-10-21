<template>
  <v-data-table
    :headers="headers"
    :items="items.servers"
    hover
    class="text-no-wrap"
    @click:row="handleClickRow"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          서버 구축
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

   <template v-slot:item.frontend="{ item }">
      <v-chip variant="text" class="pl-0">
        <v-img :src="`/dev/${formatDevIcon(item.frontend)}`" height="24" width="24" class="mr-2" />
        <span>{{ item.frontend }}</span>
      </v-chip>
    </template>

    <template v-slot:item.backend="{ item }">
      <v-chip variant="text" class="pl-0">
        <v-img :src="`/dev/${formatDevIcon(item.backend)}`" height="24" width="24" class="mr-2" />
        <span>{{ item.backend }}</span>
      </v-chip>
    </template>

    <template v-slot:item.database="{ item }">
      <v-chip variant="text" class="pl-0">
        <v-img :src="`/db/${formatDevIcon(item.database)}`" height="24" width="24" class="mr-2" />
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
      <v-img :src="`/hosting/${getHostingIcon(item.hosting)}`" />
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
        ></v-pagination>
      </div>
    </template>

  </v-data-table>
</template>

<script setup>
  const headers = [
    { title: '프로젝트', value: 'project' },
    // { title: '도메인', value: 'domain' },
    { title: '개발 (Frontend)', value: 'frontend' },
    { title: '개발 (Backend)', value: 'backend' },
    { title: '데이터베이스', value: 'database' },
    { title: '개발 복잡도', value: 'dev_complexity', align: 'center' },
    { title: '호스팅', value: 'hosting' },
    { title: '서버 확장', value: 'scale'},
    { title: '개발 배포', value: 'dev_deployment', align: 'center' },
    // { title: '서버 (수)', value: 'server_count', align: 'center' },
    { title: '서버 요금 (₩)', value: 'server_cost', align: 'end' },
    { title: '구축 비용 (₩)', value: 'build_cost', align: 'end' }
  ]

  const items = await import(`~/data/server/main.json`)

  const getHostingIcon = (value) => {
    if (value === 'AWS') return 'aws.png'
    else if (value === 'CAFE24') return 'cafe24.png'
    else return 'mdi-cloud-outline'
  }
  const getScaleColor = (value) => {
    if (value === 'UP') return 'grey-lighten-2'
    else if (value === 'OUT') return 'black'
    else return 'grey'
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
      this.$router.push(`/servers/${row.item.link}`);
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

    getDeploymentColor (value) {
      if (value === '자동') return 'black'
      else return 'grey-lighten-2'
    }
  },
};
</script>

<style scoped>
.v-data-table thead th {
  background-color: #1976d2;
  color: white;
}
</style>