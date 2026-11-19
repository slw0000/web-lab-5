<script setup lang="ts">
import StudentForm from '~/components/StudentForm/StudentForm.vue';
import ErrorMessage from '~/components/ErrorMessage/ErrorMessage.vue';

definePageMeta({
    middleware: ['auth'],
    adminOnly: true,

    validate: (route) => {
        const id = route.params.id;
        const intTemplate = /^[1-9]\d*$/;
        return typeof id === 'string' && intTemplate.test(id) && Number.isSafeInteger(Number(id));
    },
});

const route = useRoute();
const { getStudentById } = useStudentApi();

const studentKey = computed(() => `student-edit-${route.params.id}`);

const { data: student, error } = await useAsyncData(studentKey, () =>
    getStudentById(Number(route.params.id)),
);

if (error.value) {
    throw createError(error.value);
}
</script>

<template>
    <section>
        <ErrorMessage v-if="error" :error-message="error.message" />

        <StudentForm v-else-if="student" :key="student.id" :student="student" />

        <p v-else role="status">Загрузка данных студента…</p>
    </section>
</template>
