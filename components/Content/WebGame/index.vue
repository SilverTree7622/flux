<template>
    <div v-for="(item, idx) in props.list">
        <ContentItem :item="item" />
    </div>
</template>
<script setup lang="ts">
import type { TContentItem } from '~/types/content';

const props = defineProps<{
    list: TContentItem[];
}>();
</script>
<style scoped>
    
</style>