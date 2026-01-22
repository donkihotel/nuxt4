<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'AWS 서버 구축, 도메인 연결, 작업 비용 확인은 2CPU2RAM',
  description: '스타트업 · 소규모 서비스 · 개발팀을 위한 실전 AWS 인프라 구축 서비스',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://2cpu2ram.com'
    }
  ]
})
</script>