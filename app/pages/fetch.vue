<script lang="ts" setup>
const route = useRoute();
const greeting = ref(route.query.greeting ?? 'from This Dot Labs!');

const {
  data,
  pending: loading,
  error,
} = await useLazyFetch<string>(
  () =>
    `https://api.starter.dev/.netlify/functions/server/hello?greeting=${greeting.value}`,
  {
    watch: [greeting],
  }
);

watch(
  () => route.query.greeting,
  () => {
    greeting.value = route.query.greeting ?? 'from This Dot Labs!';
  }
);
</script>

<template>
  <div class="fetch-example-box w-50">
      <p v-if="!error">Message:</p>
      <div class="ml-2 font-weight-bold">
        <v-progress-circular v-if="loading" indeterminate></v-progress-circular>

        <v-alert
          v-else-if="error"
          type="error"
          title="Error"
          :text="error.message"
          variant="tonal"
        >
        </v-alert>

        <p v-else data-testid="message-value">
          {{ data }}
        </p>
      </div>
  </div>
</template>