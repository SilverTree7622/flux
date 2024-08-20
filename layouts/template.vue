<template>
    <div v-if="props.isExist" class="bg-gray-100 font-black rounded-b-md">
        <div class="text-center px-auto w-full">
            {{ `<Templates>` }}
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    tabIdx: number;
    isExist: boolean;
}>();
</script>

<style scoped>

</style>