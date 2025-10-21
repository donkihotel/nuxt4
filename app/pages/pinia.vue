<template>
  <div>
    <v-btn @click="handleLogin">로그인</v-btn>
    <div>{{ getEmail }}</div>
    <div>{{ getName }}</div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

// 스토어 생성
const authStore = useAuthStore()
// 반응형 객체로 변환
const { getEmail, getName } = storeToRefs(authStore)

const handleLogin = () => {
  const user = {
    email: 'test@naver.com',
    name: '임꺽정'
  }
  authStore.setUser(user)
}
</script>
<style scoped></style>