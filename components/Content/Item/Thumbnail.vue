<template>
    <div class="thumbnail-container">
        <img :src="props.src" :alt="''" class="thumbnail" />
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    src: string;
}>();

</script>
<style scoped>
.thumbnail-container {
    width: 5rem;
    height: 5rem;
    border-color: #0f172a;
    border-spacing: 2.5rem;
    border-radius: 0.75rem;
}

.thumbnail {
    border-radius: 0.75rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s ease;
}

.content-item:hover .thumbnail {
    transform: scale(1.2);
}
</style>