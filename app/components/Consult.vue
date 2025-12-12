<template>
<v-card border flat class="my-5">
<h3 class="bg-surface-light pa-2"><v-icon class="mr-2">mdi-chat-outline</v-icon>상담</h3>
<v-card-text>
  <div class="pt-2 pb-1">
	<v-icon
	  icon="mdi-phone-outline"
	  size="small"
	  class="me-2"
	></v-icon
	><span>결제 전, 전화상담 제공</span><v-spacer></v-spacer>
  </div>
  <div class="pt-1 pb-1">
	<v-icon
	  icon="mdi-clock-outline"
	  size="small"
	  class="me-2"
	></v-icon>
	<span>연락 가능 시간: 09시 ~ 21시</span><v-spacer></v-spacer>
  </div>
  <div class="pt-1 pb-2">
	<v-icon
	  icon="mdi-comment-outline"
	  size="small"
	  class="me-2"
	></v-icon>
	<span>평균 응답 시간: 10분 이내</span><v-spacer></v-spacer>
  </div>
  <v-sheet color="grey-lighten-5" rounded="lg" class="text-center">
	<v-row no-gutters>
	  <v-col cols="4">
		<v-sheet class="ma-2 pa-2" color="grey-lighten-5">
		  <span class="font-weight-bold">186건 </span>
		  <v-spacer></v-spacer>
		  <span class="text-medium-emphasis">거래수 </span>
		</v-sheet>
	  </v-col>
	  <v-col cols="4">
		<v-sheet class="ma-2 pa-2" color="grey-lighten-5">
		  <span class="font-weight-bold">100% </span>
		  <v-spacer></v-spacer>
		  <span class="text-medium-emphasis">만족도 </span>
		</v-sheet>
	  </v-col>
	  <v-col cols="4">
		<v-sheet class="ma-2 pa-2" color="grey-lighten-5">
		  <span class="font-weight-bold">개인회원 </span>
		  <v-spacer></v-spacer>
		  <span class="text-medium-emphasis">회원구분 </span>
		</v-sheet>
	  </v-col>
	</v-row>
  </v-sheet>
</v-card-text>
<v-card-actions class="pa-4">
  <v-spacer></v-spacer>
  <v-btn
	size="large"
	variant="outlined"
	width="200"
  >
	 <img
	  src="/assets/btn/kmong.png"
	  alt="kmong"
	  height="24"
	  class="mr-1 mt-1"
	/>
	크몽
  </v-btn>
  <v-btn
	size="large"
	color="yellow darken-3"
	variant="flat"
	width="200"
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