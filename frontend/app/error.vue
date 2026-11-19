<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
    error: NuxtError;
}>();

const statusCode = computed(() => props.error?.statusCode || 500);

const errorTitle = computed(() => {
    switch (statusCode.value) {
        case 404:
            return '404 – страница не найдена';
        case 403:
            return '403 – доступ запрещён';
        case 401:
            return '401 – требуется авторизация';
        default:
            return `${statusCode.value} – произошла ошибка`;
    }
});

const errorDescription = computed(() => {
    if (statusCode.value === 404) {
        return 'Запрашиваемая страница или карточка студента не существует.';
    }
    if (statusCode.value === 403) {
        return 'У вас недостаточно прав для просмотра этой страницы.';
    }
    if (statusCode.value === 401) {
        return 'Пожалуйста, войдите в систему для продолжения.';
    }
    return props.error?.statusMessage || 'Что-то пошло не так при обработке запроса.';
});

function handleBack(): void {
    clearError({ redirect: '/students' });
}
</script>

<template>
    <main class="error-page">
        <section>
            <h1>{{ errorTitle }}</h1>
            <p class="error-description">{{ errorDescription }}</p>

            <div class="buttons-container">
                <button type="button" class="buttons" @click="handleBack">
                    К списку студентов
                </button>
            </div>
        </section>
    </main>
</template>

<style scoped>
.error-page {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
}

.error-description {
    text-align: center;
    margin: 0 auto 1.5rem;
    max-width: 40rem;
    padding: 0 1rem;
}
</style>
