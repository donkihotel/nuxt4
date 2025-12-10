<template>
  <v-app>
    <v-system-bar color="grey-lighten-4">
      <v-spacer></v-spacer>
      <v-icon>mdi-square</v-icon>
      <v-icon>mdi-circle</v-icon>
      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar
      color="grey-lighten-4"
      flat
    >
      <v-container class="mx-auto d-flex">
        <NuxtLink to="/" style="text-decoration: none;">
        <div class="text-h4 font-weight-bold me-3">
          <span class="text-primary">2</span><span class="text-grey-darken-3">CPU</span>
          <span class="text-primary">2</span><span class="text-grey-darken-3">RAM</span>
          <span class="text-h6">.com</span>
          <!-- LOGO -->
        </div>
        </NuxtLink>

        <v-btn
          to="/server"
          variant="text"
        >서버 구축</v-btn>

        <v-divider vertical class="mx-2"></v-divider>

        <v-btn
          to="/domain"
          variant="text"
        >도메인 연결</v-btn>

        <v-divider vertical class="mx-2"></v-divider>

        <v-btn
          to="/task"
          variant="text"
        >작업 설명</v-btn>

        <!-- <v-divider vertical class="mx-2"></v-divider>

        <v-btn
          to="/pinia"
          variant="text"
        >pinia</v-btn> -->

      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet
              min-height="50vh"
              rounded="lg"
            >
              <!--  -->
              <slot />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer class="text-center d-flex flex-column" absolute >
    <div>
      ⓒ {{ new Date().getFullYear() }}. MySite Inc. All rights reserved.
    </div>
  </v-footer>
  </v-app>
</template>

<script>

</script>