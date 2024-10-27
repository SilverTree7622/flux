<template>
    <div class="pending-container">
        <div ref="spinnerRef" class="spinner"></div>
    </div>
</template>

<script setup lang="ts">
import { useMotion } from '@vueuse/motion'

const spinnerRef = ref(null)

onMounted(async () => {
    await nextTick();
    useMotion(spinnerRef, {
        initial: { rotate: 0 },
        enter: {
            rotate: 360,
            transition: {
                repeat: Infinity,
                duration: 1000,
                ease: 'linear'
            }
        }
    })
})
</script>

<style scoped>
.pending-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    margin-bottom: 16px;
}

.pending-text {
    font-size: 18px;
    color: #333;
}
</style>
