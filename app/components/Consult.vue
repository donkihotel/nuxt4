<template>
	<v-card border flat class="my-5">
	<h3 class="bg-surface-light pa-2"><v-icon class="mr-2">mdi-chat-outline</v-icon>상담</h3>
		<v-card-text>
			<div class="pt-2 pb-1">
				<v-icon
					icon="mdi-phone-outline"
					size="small"
					class="me-2">
				</v-icon
				><span>상담 무료</span>
				<v-spacer></v-spacer>
			</div>
			<div class="pt-1 pb-1">
				<v-icon
					icon="mdi-clock-outline"
					size="small"
					class="me-2">
				</v-icon>
			<span>연락 가능 시간: 09시 ~ 21시</span>
			<v-spacer></v-spacer>
			</div>
			<div class="pt-1 pb-2">
				<v-icon
					icon="mdi-comment-outline"
					size="small"
					class="me-2">
				</v-icon>
				<span>평균 응답 시간: 10분 이내</span>
				<v-spacer></v-spacer>
			</div>
		</v-card-text>

		<v-card-actions class="pa-4">
			<v-spacer></v-spacer>
			<v-btn
				size="large"
				variant="tonal"
				:href="props.kmongLink"
				target="_blank"
				width="130"
			>
				<img
					src="/assets/btn/kmong.png"
					alt="kmong"
					height="24"
					class="mr-1 mt-1"
				/>
				크몽
			</v-btn>
			<!-- <v-btn
				size="large"
				variant="tonal"
				href="https://kmong.com/gig/220715"
				target="_blank"
				width="130"
			>
				<img
					src="/assets/btn/instagram.png"
					alt="instagram"
					height="24"
					class="mr-1 mt-1"
				/>
				인스타그램
			</v-btn> -->
			<v-btn
				size="large"
				color="yellow darken-3"
				variant="flat"
				width="130"
				:href="props.kakaoLink"
				target="_blank"
			>
				<img
					src="/assets/btn/kakao.png"
					alt="kakao"
					height="24"
					class="mr-1 mt-1"
				/>
				카카오톡
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  kmongLink: string
  kakaoLink: string
}>()
</script>