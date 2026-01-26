<template>
  <v-app>
    <v-app-bar color="grey-lighten-4" flat height="150">
      <v-container>
        <v-chip-group selected-class="text-primary" column mobile>
          <v-chip to="/" variant="text">
            <div class="text-h4 font-weight-bold me-3">
              <span class="text-primary">2</span><span class="text-grey-darken-3">CPU</span>
              <span class="text-primary">2</span><span class="text-grey-darken-3">RAM</span>
              <span class="text-h6">.com</span>
            </div>
          </v-chip>
          <v-chip to="/server" variant="text" size="large" density="compact">서버 구축 사례 & 견적</v-chip>
          <v-chip to="/domain" variant="text" size="large" density="compact">도메인 연결 서비스</v-chip>
          <v-chip to="/task" variant="text" size="large" density="compact">작업별 단가표</v-chip>
        </v-chip-group>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet min-height="50vh" rounded="lg">
              <!--  -->
              <slot />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer class="text-center d-flex flex-column" absolute>
      <div>
        ⓒ {{ new Date().getFullYear() }}.
        <span class="font-weight-bold">
          <span class="text-primary">2</span>CPU<span class="text-primary">2</span>RAM
        </span>
        Co. All rights reserved.
      </div>
    </v-footer>
  </v-app>
</template>