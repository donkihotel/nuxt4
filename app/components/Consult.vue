<template>
	<v-card border flat class="my-5">
		<h3 class="bg-surface-light pa-2"><v-icon class="mr-2">mdi-chat-outline</v-icon>상담</h3>
		<v-card-text>
			<div v-for="item in props.consult" :key="item.no" class="pt-1 pb-1">
				<v-icon icon="mdi-circle-small" size="small" class="me-2" />

				<span>{{ item.title }}</span>

				<v-spacer />
			</div>
		</v-card-text>

		<v-card-actions class="pa-4">
			<v-spacer></v-spacer>
			<v-btn size="large" variant="tonal" :href="props.kmongLink" target="_blank" width="130">
				<img src="/assets/btn/kmong.png" alt="kmong" height="24" class="mr-1 mt-1" />
				크몽
			</v-btn>
			<v-btn size="large" color="yellow darken-3" variant="flat" width="130" :href="props.kakaoLink"
				target="_blank">
				<img src="/assets/btn/kakao.png" alt="kakao" height="24" class="mr-1 mt-1" />
				카카오톡
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
interface ConsultItem {
	no: number
	title: string
}

const props = defineProps<{
	consult: ConsultItem[]
	kmongLink: string
	kakaoLink: string
}>()
</script>