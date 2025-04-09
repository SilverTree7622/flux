<template>
    <div class="empty-content">
        <svg class="empty-icon" viewBox="0 0 24 24" width="48" height="48">
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1s-1 .45-1 1v8c0 .55.45 1 1 1zm-3-1c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .55.45 1 1 1zm6 0c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .55.45 1 1 1z" />
        </svg>
        <p>Content {{ props.context }} {{ props.type }} is empty</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    context: string;
    type: string;
}>();
</script>

<style scoped>
.empty-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 200px;
    /* background-color: #f8f9fa; */
    border-radius: 8px;
}

.empty-icon {
    fill: #6c757d;
    margin-bottom: 16px;
}

.empty-content p {
    font-size: 1.2rem;
    color: #6c757d;
    font-weight: 700;
    font-family: 'Noto Sans KR', sans-serif;
}
</style>
