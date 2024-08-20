<template>
    <div class="bg-gray-100 font-black rounded-b-md">
        <span>
            Template
        </span>
        <slot />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    tabIdx: number;
}>();

</script>

<style scoped>

</style>