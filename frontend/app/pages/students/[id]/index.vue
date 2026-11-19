<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import ErrorMessage from '~/components/ErrorMessage/ErrorMessage.vue';

definePageMeta({
    middleware: ['auth'],

    validate: (route) => {
        const id = route.params.id;
        const intTemplate = /^[1-9]\d*$/;
        return typeof id === 'string' && intTemplate.test(id) && Number.isSafeInteger(Number(id));
    },
});

const route = useRoute();
const userStore = useUserStore();
const { getStudentById } = useStudentApi();

const studentId = computed(() => Number(route.params.id));
const studentKey = computed(() => `student-view-${studentId.value}`);

const {
    data: student,
    status,
    error,
} = await useAsyncData(studentKey, () => getStudentById(studentId.value));

if (error.value?.statusCode === 404) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Студент не найден',
    });
}

const isLoading = computed(() => status.value === 'idle' || status.value === 'pending');

const errorMessage = computed(() => {
    if (!error.value || error.value.statusCode === 404) {
        return '';
    }
    return error.value.message || 'Не удалось загрузить студента';
});

function displayValue(value: string | number | null | undefined): string {
    if (value === null || value === undefined || String(value).trim() === '') {
        return '—';
    }

    return String(value);
}
</script>

<template>
    <section>
        <h1>Досье студента</h1>

        <nav class="buttons-container" aria-label="Навигация карточки">
            <NuxtLink to="/students" class="buttons"> К списку студентов </NuxtLink>
            <NuxtLink
                v-if="userStore.isAdmin && student"
                :to="`/students/${student.id}/edit`"
                class="buttons"
            >
                Изменить данные
            </NuxtLink>
        </nav>

        <ErrorMessage v-if="errorMessage" :error-message="errorMessage" />

        <p v-if="isLoading" role="status" class="loading-text">Загружаем студента…</p>

        <div v-else-if="student" class="student-card">
            <h2 id="student-full-name">
                {{ student.surname }}
                {{ student.name }}
                {{ student.patronymic ?? '' }}
            </h2>

            <dl class="student-info">
                <div class="info-row">
                    <dt>Группа:</dt>
                    <dd>{{ displayValue(student.group) }}</dd>
                </div>

                <div class="info-row">
                    <dt>ИСУ ID:</dt>
                    <dd>{{ displayValue(student.isuId) }}</dd>
                </div>

                <div class="info-row">
                    <dt>Номер общежития:</dt>
                    <dd>{{ displayValue(student.dormitoryNumber) }}</dd>
                </div>

                <div class="info-row">
                    <dt>Комната:</dt>
                    <dd>{{ displayValue(student.room) }}</dd>
                </div>

                <div class="info-row">
                    <dt>Дата заселения:</dt>
                    <dd>{{ displayValue(student.moveInDate) }}</dd>
                </div>

                <div class="info-row">
                    <dt>Иностранец:</dt>
                    <dd>{{ student.foreigner ? 'Да' : 'Нет' }}</dd>
                </div>

                <div class="info-row">
                    <dt>Заметки:</dt>
                    <dd id="notes">{{ displayValue(student.notes) }}</dd>
                </div>
            </dl>
        </div>
    </section>
</template>

<style scoped>
#student-full-name {
    text-align: center;
    margin-bottom: 1.25rem;
    margin-top: 0;
}

#notes {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
}

dd {
    margin-bottom: 1.25rem;
}

.loading-text {
    text-align: center;
}
</style>
