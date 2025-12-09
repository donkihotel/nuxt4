<template>
  <v-row class="bg-grey-lighten-3">
    <v-col cols="7">
      <v-table density="compact" >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              작업 설명
            </v-toolbar-title>
            <v-btn variant="text" size="small" to="/works">더 보기 ></v-btn>
          </v-toolbar>
        </template>
        <thead>
          <tr>
            <th class="text-left">
              작업
            </th>
            <th class="text-left">
              난이도
            </th>
            <th class="text-left">
              작업 시간
            </th>
            <th class="text-right">
              작업 가격
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in works"
            :key="item.id"
          >
            <td>{{ item.title }}</td>
            <td>{{ item.difficulty }}</td>
            <td>{{ item.duration }}</td>
            <td class="text-right"><span class="text-caption">₩</span> {{ formatPrice(item.price) }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
    <v-col cols="5">
      <v-toolbar flat>
        <v-toolbar-title>
          배너
        </v-toolbar-title>
      </v-toolbar>
      <v-carousel
        height="328"
        show-arrows="hover"
        cycle
        hide-delimiter-background
        class="rounded"
      >
        <v-carousel-item src="/assets/banner/banner1.jpg" cover></v-carousel-item>
        <v-carousel-item src="/assets/banner/banner2.jpg" cover></v-carousel-item>
        <v-carousel-item src="/assets/banner/banner3.jpg" cover></v-carousel-item>
        <v-carousel-item src="/assets/banner/banner4.jpg" cover></v-carousel-item>
        <v-carousel-item src="/assets/banner/banner5.jpg" cover></v-carousel-item>
        <v-carousel-item src="/assets/banner/banner6.jpg" cover></v-carousel-item>
        <v-carousel-item src="/assets/banner/banner7.jpg" cover></v-carousel-item>
      </v-carousel>
    </v-col>
    <v-col cols="12">
      <v-data-table
        :headers="headers1"
        :items="servers"
        hover
        class="text-no-wrap"
        @click:row="handleClickRow"
        hide-default-footer
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
          <span class="text-caption">₩</span> {{ formatPrice(item.server_cost) }}
        </template>

        <template #item.build_cost="{ item }">
          <span class="text-caption">₩</span> {{ formatPrice(item.build_cost) }}
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="12">
      <v-data-table
        :headers="headers2"
        :items="domains"
        hover
        class="text-no-wrap"
        disable-sort
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              도메인 연결
            </v-toolbar-title>
            <v-btn variant="text" size="small" to="/domains">더 보기 ></v-btn>
          </v-toolbar>
        </template>

        <template #item.ssl_cost="{ item }">
          <span class="text-caption">₩</span> {{ formatPrice(item.ssl_cost) }}
        </template>

        <template #item.email="{ item }">
          <v-img :src="`assets/email/${formatEmailIcon(item.email)}`"  width="120" />
        </template>

        <template #item.email_cost="{ item }">
          <span class="text-caption">₩</span> {{ formatPrice(item.email_cost) }}
        </template>

        <template #item.cost="{ item }">
          <span class="text-caption">₩</span> {{ formatPrice(item.cost) }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>

</template>

<script setup>
  const items0 = await import(`~/data/works/main.json`)
  const works = items0.default.works
  .sort(() => 0.5 - Math.random())
  .slice(0, 8)

  const headers1 = [
    { title: 'No', value: 'id' },
    { title: '프로젝트', value: 'project' },
    { title: '프론트엔드', value: 'frontend' },
    { title: '백엔드', value: 'backend' },
    { title: '데이터베이스', value: 'database' },
    { title: '개발 복잡도', value: 'dev_complexity', align: 'center' },
    { title: '서버 호스팅', value: 'hosting' },
    { title: '서버 확장', value: 'scale' },
    { title: '서버 배포', value: 'dev_deployment', align: 'center' },
    { title: '서버 요금', value: 'server_cost', align: 'end' },
    { title: '구축 비용', value: 'build_cost', align: 'end' }
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
    { title: 'SSL 인증서', key: 'ssl' },
    { title: '인증서 가격', key: 'ssl_cost', align: 'end' },
    { title: '메일 서비스', key: 'email' },
    { title: '메일 요금', key: 'email_cost', align: 'end'  },
    { title: '연결 비용', key: 'cost', align: 'end' },
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